export interface User { id: string; email: string; name: string; role: "USER" | "ADMIN" }
export interface Resource { id: string; name: string; type: "ROOM" | "EQUIPMENT"; description: string; location: string | null; capacity: number | null; requiresApproval: boolean; isActive: boolean }
export interface Booking { id: string; resourceId: string; requesterId: string; startAt: string; endAt: string; purpose: string; status: "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED" | "COMPLETED"; resource: Pick<Resource, "id" | "name" | "type" | "location"> }
export interface Usage { summary: { totalBookings: number; resourcesUsed: number }; items: { resource: Pick<Resource, "id" | "name" | "type">; bookings: number; bookedMinutes: number }[] }

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`/api/v1${path}`, { ...options, credentials: "same-origin", headers: { "Content-Type": "application/json", ...options.headers } });
  if (response.status === 204) return undefined as T;
  const body: unknown = await response.json();
  if (!response.ok) {
    const error = body as { error?: { message?: string } };
    throw new Error(error.error?.message ?? "Request failed");
  }
  return body as T;
}
export const api = {
  me: () => request<{ user: User }>("/auth/me"),
  login: (email: string, password: string) => request<{ user: User }>("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),
  logout: () => request<void>("/auth/logout", { method: "POST" }),
  resources: (includeInactive = false) => request<{ items: Resource[] }>(`/resources${includeInactive ? "?includeInactive=true" : ""}`),
  myBookings: () => request<{ items: Booking[] }>("/bookings/me"),
  calendar: (from: Date, to: Date) => request<{ items: Booking[] }>(`/calendar?from=${encodeURIComponent(from.toISOString())}&to=${encodeURIComponent(to.toISOString())}`),
  createBooking: (payload: { resourceId: string; startAt: string; endAt: string; purpose: string }) => request<{ item: Booking }>("/bookings", { method: "POST", body: JSON.stringify(payload) }),
  cancelBooking: (id: string) => request<{ item: Booking }>(`/bookings/${id}/cancel`, { method: "POST", body: "{}" }),
  pending: () => request<{ items: Booking[] }>("/bookings/pending"),
  decide: (id: string, action: "approve" | "reject") => request<{ item: Booking }>(`/bookings/${id}/${action}`, { method: "POST", body: "{}" }),
  usage: (from: Date, to: Date) => request<Usage>(`/admin/usage?from=${encodeURIComponent(from.toISOString())}&to=${encodeURIComponent(to.toISOString())}`),
  createResource: (payload: Record<string, unknown>) => request<{ item: Resource }>("/resources", { method: "POST", body: JSON.stringify(payload) }),
  updateResource: (id: string, payload: Record<string, unknown>) => request<{ item: Resource }>(`/resources/${id}`, { method: "PATCH", body: JSON.stringify(payload) }),
  createUser: (payload: { name: string; email: string; password: string }) => request<{ user: User }>("/admin/users", { method: "POST", body: JSON.stringify(payload) }),
};
