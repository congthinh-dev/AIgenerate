# Tài liệu kiến trúc AI Agent

Thư mục này mô tả kiến trúc và hợp đồng làm việc dự kiến cho các vai trò AI trong dự án. Đây là tài liệu thiết kế; các vai trò chưa được cấu hình hoặc khởi chạy thành agent tự chủ.

## Tài liệu

- [Kiến trúc agent](architecture/agent-architecture.md): vai trò, ranh giới, luồng điều phối.
- [Cộng tác và xử lý xung đột](architecture/collaboration-workflow.md): quy trình phối hợp, quyền sở hữu thay đổi và cách giải quyết bất đồng.
- [Main Orchestrator](specifications/main-orchestrator.md)
- [Backend](specifications/backend.md)
- [Frontend](specifications/frontend.md)
- [Security](specifications/security.md)
- [Testing](specifications/testing.md)
- [Architecture](specifications/architecture.md)
- [Code Review](specifications/code-review.md)

## Nguyên tắc áp dụng

`AGENTS.md` ở gốc dự án là chỉ dẫn chung có thẩm quyền cao hơn các tài liệu trong thư mục này. Skill tương ứng trong `.agents/skills/` cung cấp quy trình chuyên môn. Tài liệu này không cấp quyền hệ thống, không tự cho phép hành động cần phê duyệt và không thay thế phê duyệt rõ ràng của người dùng.

Mọi thiết kế trong thư mục này là đề xuất kiến trúc. Không có cấu hình thực thi, agent tự chủ, hoặc quy trình chạy nền nào được tạo trong Phase 4A.