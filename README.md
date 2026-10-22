# Infodation AI Studio — website

Website tĩnh (HTML/CSS/JS thuần, không cần build) dựng theo thiết kế *Infodation AI Studio — Redesign 3*.

## Chạy thử

```bash
node serve.js
```

Mở http://localhost:5173. Mở file `index.html` trực tiếp cũng chạy được (chỉ cần internet để tải Google Fonts).

## Cấu trúc

| Đường dẫn | Nội dung |
|---|---|
| `index.html` | Trang chủ |
| `solutions.html` | Khám phá giải pháp (tìm kiếm + lọc theo ngành, giữ trạng thái trên URL `?ind=&q=`) |
| `solutions/<slug>.html` | Trang con riêng cho từng giải pháp, kèm demo tương tác |
| `technologies.html` | Công nghệ: stack 3D, sơ đồ luồng dữ liệu, 6 cụm năng lực, ma trận cụm ↔ giải pháp, nguyên tắc kỹ thuật (nội dung trong `assets/js/i18n/tech.js`) |
| `admin.html` | Cài đặt quản trị: combo màu + ngôn ngữ mặc định |
| `assets/js/palettes.js` | 6 combo màu (mỗi combo 5 màu chính) |
| `assets/js/config.js` | Combo + ngôn ngữ mặc định cho mọi khách truy cập |
| `assets/js/i18n/{en,vi,nl}.js` | Toàn bộ nội dung 3 ngôn ngữ |
| `assets/js/data/solutions.js` | Danh mục giải pháp, thông tin liên hệ, đối tác, khách hàng |
| `assets/js/motion.js` | Engine 3D: tilt theo chuột, scroll-scrub "ráp" thành phần, hero stack |
| `assets/js/pages/demos.js` | Hình minh họa blueprint + demo cho từng giải pháp |

## Đổi màu (admin)

`admin.html` → chọn combo → xem trước ngay trên trình duyệt đó. Để áp dụng cho **mọi khách**,
bấm **Tải config.js** rồi thay file `assets/js/config.js` trên server.
Có thể xem trước combo bất kỳ qua URL: `index.html?palette=nordic-fjord`.

Trang admin là trang tĩnh, không có đăng nhập — nên chặn `/admin.html` ở tầng hosting
(basic auth / IP allowlist) nếu không muốn người ngoài thấy. Thay đổi trong admin chỉ ảnh hưởng
trình duyệt của người đang dùng, không ghi gì lên server.

## Ngôn ngữ

EN (mặc định), VI, NL. Khách đổi trên header; lựa chọn được nhớ. Ép ngôn ngữ qua URL: `?lang=nl`.

## Thêm một giải pháp

1. Thêm mục vào `assets/js/data/solutions.js`.
2. Thêm nội dung `sol.<slug>` vào cả 3 file `i18n/*.js` (copy cấu trúc một giải pháp có sẵn).
3. Thêm hình hero + demo vào `assets/js/pages/demos.js` (`HERO[slug]`, `DEMOS[slug]`).
4. Chạy `node tools/gen-solution-pages.js` để tạo `solutions/<slug>.html`.

## Tài liệu PDF (admin → tab Documents)

Mỗi tài liệu có 1 file PDF cho từng ngôn ngữ (EN / VI / NL): Hồ sơ năng lực, Hồ sơ giải pháp IntelliCAD,
Số hóa tài liệu thông minh và AI Voice Bot. Khách xem web ở ngôn ngữ nào sẽ tải file ngôn ngữ đó;
ngôn ngữ chưa có file thì tự lấy bản tiếng Anh.

Upload cần chạy server Node kèm khóa admin (không có khóa thì upload bị tắt):

```bash
ADMIN_TOKEN=dat-mot-chuoi-dai-va-kho-doan node serve.js
```

PowerShell: `$env:ADMIN_TOKEN="..."; node serve.js`. Nhập đúng khóa đó vào ô "Khóa admin" ở tab Documents.

- File lưu tại `assets/docs/<tài-liệu>/<ngôn-ngữ>.pdf`; danh sách nằm ở `assets/docs/docs.json`,
  server tự sinh `assets/js/docs.js` để mọi trang đọc (chạy được cả khi hosting tĩnh).
- Chỉ nhận PDF, tối đa 25 MB.
- Nếu deploy lên hosting tĩnh (không chạy Node): upload trên máy local rồi copy thư mục `assets/docs/`
  và file `assets/js/docs.js` lên server.

## Cần bổ sung

- **Form liên hệ**: chưa có backend; form kiểm tra dữ liệu rồi mở ứng dụng email với nội dung soạn sẵn
  gửi `sales@infodation.com`. Khi có API, thay hàm `bindMailForm` trong `assets/js/layout.js`.
- Các demo trên trang giải pháp chạy bằng **dữ liệu minh họa** (đã ghi rõ trên giao diện).
