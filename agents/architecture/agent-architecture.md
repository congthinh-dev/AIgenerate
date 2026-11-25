# Kiến trúc AI Agent

## Trạng thái

Đây là kiến trúc tài liệu, chưa phải cấu hình thực thi. Các vai trò dưới đây chỉ hoạt động khi được người dùng hoặc môi trường điều phối cho phép. Không có agent tự chủ nào được tạo trong Phase 4A.

## Mô hình vai trò

- **Main Orchestrator** tiếp nhận yêu cầu, phân rã công việc, chọn chuyên môn phù hợp, tổng hợp kết quả và báo cáo.
- **Backend** xử lý nghiệp vụ phía máy chủ, API và tích hợp dữ liệu.
- **Frontend** xử lý giao diện, tương tác, khả năng truy cập và tích hợp phía client.
- **Security** đánh giá rủi ro và biện pháp bảo vệ theo hướng phòng thủ.
- **Testing** xây dựng chiến lược kiểm thử và xác minh hành vi.
- **Architecture** đánh giá cấu trúc hệ thống và các quyết định kỹ thuật.
- **Code Review** rà soát thay đổi độc lập, mặc định chỉ đọc.

Các vai trò chuyên môn báo cáo kết quả cho Orchestrator; chúng không tự mở rộng phạm vi hoặc quyền hạn. Người dùng quyết định các lựa chọn làm thay đổi yêu cầu, rủi ro đáng kể, dữ liệu hoặc production.

## Ranh giới

- `AGENTS.md` quy định tiêu chuẩn chung, quyền và an toàn.
- `.agents/skills/` chứa quy trình chuyên môn được chọn theo tác vụ.
- Tài liệu trong `agents/specifications/` định nghĩa trách nhiệm dự kiến của từng vai trò.
- Thư mục này không chứa prompt khởi chạy, mã điều phối, quyền công cụ, lịch chạy hay cấu hình agent thực thi.
- Quyền ghi chỉ giới hạn ở tệp thuộc phạm vi được giao; quyền sandbox vẫn là ranh giới thực tế.
- Chỉ điều phối song song khi người dùng hoặc chỉ dẫn có thẩm quyền cho phép. Không cho hai vai trò ghi đồng thời cùng một tệp.

## Luồng dữ liệu

Yêu cầu và ràng buộc của người dùng → Orchestrator lập kế hoạch → chuyên gia phù hợp phân tích/thực hiện → kiểm thử hoặc review độc lập khi cần → Orchestrator đối chiếu bằng chứng, diff và trạng thái → báo cáo cho người dùng.

Mỗi lần bàn giao cần nêu: mục tiêu, phạm vi tệp, ràng buộc, đầu ra mong đợi, kiểm tra cần thiết và việc nào cần xin phép.