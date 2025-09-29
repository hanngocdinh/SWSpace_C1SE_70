# SWSpace_C1SE_70

Our team aims to integrate online booking, multi-channel payment, fast QR code check-in, and AI-based smart space management via facial recognition — delivering a seamless, safe, and convenient 24/7 experience for customers while helping operators optimize costs, improve management efficiency, and gain sustainable competitive advantage.

# Ứng dụng React + Vite + Express.js + MySQL

Một ứng dụng full-stack với frontend React + Vite, backend Express.js và cơ sở dữ liệu MySQL.

---

## 📋 Mục lục
- [Tính năng](#-tính-năng)
- [Cấu trúc dự án](#-cấu-trúc-dự-án)
- [Cài đặt](#-cài-đặt)
- [Chạy ứng dụng](#-chạy-ứng-dụng)
- [Scripts có sẵn](#-scripts-có-sẵn)
- [Công nghệ sử dụng](#-công-nghệ-sử-dụng)
- [Cấu hình](#-cấu-hình)
- [API Endpoints](#-api-endpoints)
- [Đóng góp](#-đóng-góp)

---

## ✨ Tính năng
- ⚡ React với Vite cho frontend hiện đại và nhanh chóng  
- 🚀 Express.js backend với CORS đã được cấu hình  
- 🗄️ MySQL database với driver `mysql2/promise`  
- 🔄 Proxy tự động từ frontend đến backend API  
- 🛠️ Hot Module Replacement (HMR) cho phát triển  
- 📦 Quản lý dependencies riêng biệt cho frontend và backend  
- 🎯 Ví dụ tích hợp API và database operations (CRUD)  
- 📱 Responsive UI với form và danh sách users  

---

## 📁 Cấu trúc dự án
```
ngochan/
├── package.json           # Scripts chính và dependencies
├── README.md             # Tài liệu này
├── backend/              # Thư mục backend
│   ├── package.json      # Dependencies backend
│   ├── server.js         # File server chính với API endpoints
│   ├── src/utils/db.js   # Cấu hình kết nối MySQL
│   └── .env              # Biến môi trường backend
└── frontend/             # Thư mục frontend
    ├── package.json      # Dependencies frontend
    ├── vite.config.js    # Cấu hình Vite với proxy
    ├── index.html        # File HTML chính
    ├── .env              # Biến môi trường frontend
    └── src/
        ├── App.jsx       # Component chính với CRUD operations
        ├── App.css       # Styles cho App
        └── assets/       # Tài nguyên tĩnh
```

---

## 🚀 Cài đặt

### Yêu cầu hệ thống
- Node.js (phiên bản 16 trở lên)
- npm hoặc yarn
- MySQL 8+

### Cài đặt dependencies

1. Cài đặt dependencies gốc:
```bash
npm install
```

2. Cài đặt dependencies cho backend:
```bash
cd backend
npm install
cd ..
```

3. Cài đặt dependencies cho frontend:
```bash
cd frontend
npm install
cd ..
```

---

## 🏃‍♂️ Chạy ứng dụng

### Chạy cả frontend và backend cùng lúc (Khuyến nghị)
```bash
npm run dev
```

### Chạy riêng biệt

**Chỉ chạy backend:**
```bash
npm run server
```
Backend chạy tại: `http://localhost:5000`

**Chỉ chạy frontend:**
```bash
npm run client
```
Frontend chạy tại: `http://localhost:5173`

---

## 📜 Scripts có sẵn

### Scripts gốc
- `npm run dev` - Chạy cả frontend và backend
- `npm run server` - Chỉ chạy backend
- `npm run client` - Chỉ chạy frontend
- `npm run build` - Build frontend cho production
- `npm start` - Chạy backend ở chế độ production

### Scripts backend
- `npm start` - Chạy server với Node.js
- `npm run dev` - Chạy server với nodemon (auto-restart)

### Scripts frontend
- `npm run dev` - Chạy development server
- `npm run build` - Build cho production
- `npm run preview` - Preview bản build

---

## 🛠️ Công nghệ sử dụng

### Frontend
- **React** - Thư viện UI  
- **Vite** - Build tool và development server  
- **JavaScript/JSX**

### Backend
- **Express.js** - Web framework cho Node.js  
- **CORS** - Middleware xử lý Cross-Origin Resource Sharing  
- **dotenv** - Quản lý biến môi trường  
- **nodemon** - Auto-restart server khi phát triển  
- **mysql2/promise** - Driver MySQL  

### Database
- **MySQL** - Database quan hệ  

### Tools
- **concurrently** - Chạy nhiều commands cùng lúc  

---

## 🔧 Cấu hình

### Backend (.env)
```env
PORT=5000
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=your_db
```

### Frontend (.env)
```env
# ví dụ nếu cần thêm config
VITE_API_URL=http://localhost:5000/api
```

**Lưu ý:** File `vite.config.js` đã được cấu hình proxy để chuyển tiếp request `/api/*` đến backend.

---

## 🌐 API Endpoints

### Endpoints cơ bản
- `GET /` - Thông điệp chào mừng
- `GET /api/health` - Kiểm tra kết nối DB (`{ ok: true }` nếu thành công)

### Endpoints cho Users (CRUD)
- `GET /api/users` - Lấy danh sách users
- `POST /api/users` - Tạo user mới
  ```json
  {
    "name": "Tên người dùng",
    "email": "email@example.com"
  }
  ```
- `GET /api/users/:id` - Lấy thông tin user theo ID
- `PUT /api/users/:id` - Cập nhật user theo ID
  ```json
  {
    "name": "Tên mới",
    "email": "email_moi@example.com"
  }
  ```
- `DELETE /api/users/:id` - Xóa user theo ID

---

## 🗄️ Tạo bảng MySQL

```sql
CREATE TABLE IF NOT EXISTS users (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
```

---

## 🤝 Đóng góp
1. Fork dự án  
2. Tạo feature branch (`git checkout -b feature/TinhNangMoi`)  
3. Commit thay đổi (`git commit -m 'Thêm tính năng mới'`)  
4. Push lên branch (`git push origin feature/TinhNangMoi`)  
5. Mở Pull Request  
