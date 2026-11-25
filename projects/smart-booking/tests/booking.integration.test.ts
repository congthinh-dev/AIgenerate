import { randomUUID } from "node:crypto";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../apps/api/src/app.js";
import { db } from "../apps/api/src/db.js";
import { hashPassword } from "../apps/api/src/lib/password.js";

describe("booking API", () => {
  const suffix = randomUUID();
  let userCookie = "";
  let adminCookie = "";
  let roomId = "";
  let equipmentId = "";
  let userId = "";
  let adminId = "";

  beforeAll(async () => {
    const passwordHash = await hashPassword("test-password-123");
    const [user, admin, room, equipment] = await Promise.all([
      db.user.create({ data: { email: `user-${suffix}@test.invalid`, name: "Test User", passwordHash } }),
      db.user.create({ data: { email: `admin-${suffix}@test.invalid`, name: "Test Admin", passwordHash, role: "ADMIN" } }),
      db.resource.create({ data: { name: `Room-${suffix}`, type: "ROOM", capacity: 4 } }),
      db.resource.create({ data: { name: `Projector-${suffix}`, type: "EQUIPMENT", requiresApproval: true } }),
    ]);
    userId = user.id; adminId = admin.id; roomId = room.id; equipmentId = equipment.id;
    const [userLogin, adminLogin] = await Promise.all([
      request(app).post("/api/v1/auth/login").send({ email: user.email, password: "test-password-123" }),
      request(app).post("/api/v1/auth/login").send({ email: admin.email, password: "test-password-123" }),
    ]);
    userCookie = userLogin.headers["set-cookie"][0].split(";")[0];
    adminCookie = adminLogin.headers["set-cookie"][0].split(";")[0];
  });

  beforeEach(async () => { await db.booking.deleteMany({ where: { OR: [{ requesterId: userId }, { requesterId: adminId }] } }); });
  afterAll(async () => {
    await db.session.deleteMany({ where: { userId: { in: [userId, adminId] } } });
    await db.booking.deleteMany({ where: { OR: [{ requesterId: userId }, { requesterId: adminId }] } });
    await db.resource.deleteMany({ where: { id: { in: [roomId, equipmentId] } } });
    await db.user.deleteMany({ where: { id: { in: [userId, adminId] } } });
    await db.$disconnect();
  });

  function interval(offset = 0) {
    const start = Date.now() + 86_400_000 + offset;
    return { startAt: new Date(start).toISOString(), endAt: new Date(start + 3_600_000).toISOString() };
  }

  it("automatically approves rooms and queues flagged equipment", async () => {
    const [room, equipment] = await Promise.all([
      request(app).post("/api/v1/bookings").set("Cookie", userCookie).send({ resourceId: roomId, ...interval(), purpose: "Team sync" }),
      request(app).post("/api/v1/bookings").set("Cookie", userCookie).send({ resourceId: equipmentId, ...interval(), purpose: "Presentation" }),
    ]);
    expect(room.status).toBe(201);
    expect(room.body.item.status).toBe("APPROVED");
    expect(equipment.status).toBe(201);
    expect(equipment.body.item.status).toBe("PENDING");
  });

  it("rejects overlapping concurrent requests for the same resource", async () => {
    const time = interval();
    const results = await Promise.all([
      request(app).post("/api/v1/bookings").set("Cookie", userCookie).send({ resourceId: roomId, ...time, purpose: "First" }),
      request(app).post("/api/v1/bookings").set("Cookie", userCookie).send({ resourceId: roomId, ...time, purpose: "Second" }),
    ]);
    expect(results.map((result) => result.status).sort()).toEqual([201, 409]);
  });

  it("allows adjacent reservations and reuses cancelled slots", async () => {
    const firstTime = interval();
    const start = new Date(firstTime.startAt).getTime();
    const first = await request(app).post("/api/v1/bookings").set("Cookie", userCookie).send({ resourceId: roomId, ...firstTime, purpose: "First" });
    const next = await request(app).post("/api/v1/bookings").set("Cookie", userCookie).send({ resourceId: roomId, startAt: new Date(start + 3_600_000).toISOString(), endAt: new Date(start + 7_200_000).toISOString(), purpose: "Adjacent" });
    expect(first.status).toBe(201);
    expect(next.status).toBe(201);
    await request(app).post(`/api/v1/bookings/${first.body.item.id}/cancel`).set("Cookie", userCookie).send({});
    const reused = await request(app).post("/api/v1/bookings").set("Cookie", userCookie).send({ resourceId: roomId, ...firstTime, purpose: "Rebook" });
    expect(reused.status).toBe(201);
  });

  it("restricts approvals to admins and records the reviewer", async () => {
    const created = await request(app).post("/api/v1/bookings").set("Cookie", userCookie).send({ resourceId: equipmentId, ...interval(), purpose: "Demo" });
    const denied = await request(app).post(`/api/v1/bookings/${created.body.item.id}/approve`).set("Cookie", userCookie).send({});
    const approved = await request(app).post(`/api/v1/bookings/${created.body.item.id}/approve`).set("Cookie", adminCookie).send({});
    expect(denied.status).toBe(403);
    expect(approved.status).toBe(200);
    expect(approved.body.item.status).toBe("APPROVED");
    expect(approved.body.item.reviewedById).toBe(adminId);
    const secondDecision = await request(app).post(`/api/v1/bookings/${created.body.item.id}/approve`).set("Cookie", adminCookie).send({});
    expect(secondDecision.status).toBe(409);
  });

  it("lets admins create User accounts without granting admin privileges", async () => {
    const email = `created-${suffix}@test.invalid`;
    const created = await request(app).post("/api/v1/admin/users").set("Cookie", adminCookie).send({ name: "New Member", email, password: "temporary-password-123" });
    expect(created.status).toBe(201);
    expect(created.body.user.role).toBe("USER");
    expect(created.body.user).not.toHaveProperty("passwordHash");
    await db.user.delete({ where: { email } });
  });

  it("does not allow a user to cancel another user's booking", async () => {
    const created = await request(app).post("/api/v1/bookings").set("Cookie", userCookie).send({ resourceId: roomId, ...interval(), purpose: "Private" });
    const denied = await request(app).post(`/api/v1/bookings/${created.body.item.id}/cancel`).set("Cookie", adminCookie).send({});
    expect(denied.status).toBe(403);
  });
});
