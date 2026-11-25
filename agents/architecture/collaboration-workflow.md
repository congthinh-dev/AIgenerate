# Quy trình cộng tác và xử lý xung đột

## Quy trình cộng tác

1. **Tiếp nhận:** Orchestrator ghi lại mục tiêu, điều kiện hoàn tất, giới hạn và hành động cần phê duyệt.
2. **Khảo sát:** đọc `AGENTS.md`, trạng thái workspace, tệp liên quan và skill phù hợp trước khi đề xuất thay đổi.
3. **Phân công:** chọn vai trò chuyên môn theo phạm vi. Chỉ giao việc cho agent khác khi việc điều phối đã được cho phép; không tự tạo tác vụ song song.
4. **Thực hiện:** mỗi vai trò nêu tệp sở hữu, tránh sửa ngoài phạm vi và trả lại thay đổi cùng bằng chứng xác minh.
5. **Kiểm tra độc lập:** dùng Testing hoặc Code Review khi rủi ro/phạm vi phù hợp; reviewer không sửa mã trong vai trò review.
6. **Tích hợp:** Orchestrator kiểm tra diff, trạng thái Git, kết quả kiểm tra và các giới hạn chưa giải quyết.
7. **Báo cáo:** nêu tệp thay đổi, kiểm tra đã chạy, bằng chứng, giả định và vấn đề cần người dùng quyết định.

## Quyền sở hữu thay đổi

- Mỗi tác vụ có một người chịu trách nhiệm tích hợp.
- Ghi rõ tệp hoặc vùng tệp được giao; không để nhiều agent sửa cùng tệp cùng lúc.
- Khi một tệp cần chuyển chủ sở hữu, dừng ghi, bàn giao trạng thái và xác nhận ai tiếp tục.
- Không staging, commit, push hoặc thay đổi dữ liệu/configuration production nếu chưa được yêu cầu và cho phép tương ứng.

## Quy tắc giải quyết xung đột

1. Áp dụng thứ tự ưu tiên: chỉ dẫn hệ thống/nền tảng → yêu cầu rõ của người dùng → `AGENTS.md` → phạm vi vai trò → skill chuyên môn.
2. Không dùng tài liệu vai trò hoặc skill để mở rộng quyền hay vượt giới hạn cụ thể của người dùng.
3. Khi hai thay đổi cùng sửa một vùng, tạm dừng tích hợp; so sánh mục tiêu, bằng chứng và tác động rồi chọn một thay đổi hoặc đề xuất hợp nhất tối thiểu.
4. Khi kết quả kiểm thử mâu thuẫn với nhận định của người thực hiện, giữ nguyên bằng chứng, tái hiện trong môi trường an toàn và không tuyên bố hoàn tất cho đến khi giải thích được.
5. Security có thể yêu cầu dừng một hành động rủi ro; Orchestrator không được bỏ qua cảnh báo để tiếp tục hành động có tác động cao.
6. Architecture đưa ra khuyến nghị kỹ thuật; người dùng quyết định khi lựa chọn ảnh hưởng đáng kể tới phạm vi, bảo mật, chi phí, dữ liệu hoặc production.
7. Nếu bất đồng vẫn còn hoặc cần thay đổi yêu cầu, trình bày các lựa chọn và xin người dùng quyết định. Không âm thầm chọn phương án làm tăng rủi ro.

## Dừng và chuyển cấp

Dừng phần việc phụ thuộc khi gặp quyền truy cập thiếu, tác động không rõ, dấu hiệu lộ bí mật, nguy cơ mất dữ liệu, production hoặc yêu cầu vượt phạm vi. Báo mục tiêu, bằng chứng, lựa chọn an toàn và quyết định cần từ người dùng.