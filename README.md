# 🏦 VNPAY Sandbox Auto-fill Helper

Tampermonkey script tự động điền thông tin thẻ test và mã OTP trên VNPAY Sandbox, được chia tách thành các module nhỏ theo kiến trúc modular.

---

## 🌳 Cấu Trúc Thư Mục

```
📁 src/
    │📄 config.js              (Các hằng số và cấu hình)
    │📄 fillInput.js           (Hàm tương tác với DOM)
    │📄 getCurrentPage.js      (Detect trang hiện tại)
    │📄 createUI.js            (Xây dựng giao diện UI)
    │📄 processPayment.js      (Xử lý logic chính)
    │📄 header.js              (Metadata Tampermonkey)
    │📄 main.js                (Entry point)
```

---

## 📄 Mô Tả Từng File

### **config.js**
Chứa tất cả các hằng số, cấu hình và dữ liệu test:
- `VNPAY_CONFIG`: Thông tin thẻ test & OTP
- `UI_CONFIG`: Cấu hình giao diện người dùng
- Các URL endpoints của VNPAY

### **fillInput.js**
Module tương tác với các element input:
- `fillInput()`: Điền giá trị vào input, trigger events
- `fillCardInputs()`: Điền toàn bộ thông tin thẻ
- `fillOTPInput()`: Điền mã OTP

### **getCurrentPage.js**
Detect trang hiện tại của script:
- `getCurrentPage()`: Trả về "INDEX" hoặc "CONFIRM"
- `isVNPAYSandbox()`: Kiểm tra có phải VNPAY Sandbox không

### **createUI.js**
Xây dựng giao diện người dùng:
- `createUI()`: Tạo popup xác nhận với nút "Fill"
- Nhận callback function để xử lý khi click "Fill"

### **processPayment.js**
Logic xử lý chính:
- `processPayment()`: Xác định trang nào rồi gọi hàm điền tương ứng
- Thêm console.log để debug

### **header.js**
Metadata cho Tampermonkey script (không thay đổi)

### **main.js**
Entry point - orchestrate tất cả modules:
- Import các modules
- Kiểm tra trang web có phải VNPAY Sandbox
- Khởi tạo UI khi trang load

---

## 🎯 Lợi Ích Của Kiến Trúc Này

| Lợi Ích | Chi Tiết |
|---------|---------|
| **Dễ Bảo Trì** | Mỗi file có một trách nhiệm rõ ràng |
| **Dễ Mở Rộng** | Thêm tính năng mới không ảnh hưởng file khác |
| **Dễ Test** | Có thể test từng module riêng |
| **Dễ Debug** | Tìm lỗi nhanh hơn với code tổ chức tốt |
| **Tái Sử Dụng** | Có thể copy module sang project khác |

---

## 🔧 Cách Sử Dụng

### Build Script
```bash
npm install
npm run build
```

### Cấu Hình Bundler (webpack/vite)
```javascript
// webpack.config.js
export default {
  entry: './src/main.js',
  output: {
    filename: 'vnpay-helper.user.js'
  }
}
```

### Cài Đặt Trên Tampermonkey
1. Copy nội dung `header.js` vào đầu file script
2. Build/bundle toàn bộ code
3. Paste vào Tampermonkey new script

---

## 📝 Ví Dụ Flow Chạy Script

```
1. Script load → main.js chạy
   ↓
2. Kiểm tra isVNPAYSandbox() → OK
   ↓
3. Chờ window load → createUI() hiển thị popup
   ↓
4. User click "Xác nhận (Fill)"
   ↓
5. processPayment() chạy
   ↓
6. getCurrentPage() → trả về "INDEX" hoặc "CONFIRM"
   ↓
7. Nếu "INDEX" → fillCardInputs() điền thẻ
   Nếu "CONFIRM" → fillOTPInput() điền OTP
   ↓
8. Console log kết quả ✅
```

---

## 💡 Điểm Khác So Với Code Cũ

| Đặc Điểm | Cũ | Mới |
|---------|-------|-------|
| Cấu trúc | Tất cả trong main.js | Chia module |
| Config | Hardcode | Module config.js |
| Tái sử dụng | Khó | Dễ - import module |
| Debug | Khó tìm lỗi | Console.log rõ ràng |
| Mở rộng | Sửa main.js | Thêm file mới |

---

## 🚀 Tiếp Theo

- [ ] Thêm xác thực 2FA
- [ ] Hỗ trợ nhiều loại thẻ
- [ ] Lưu config vào LocalStorage
- [ ] Thêm UI settings panel
- [ ] Unit tests cho các module
