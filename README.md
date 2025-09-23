# Call API

## 🎯 Mục tiêu

- Nắm được cách xây dựng **REST API với Spring Boot**.
- Biết cách gọi API từ **React** thông qua thư viện **Axios**.
- Thực hiện các chức năng **CRUD (Create, Read, Update, Delete)** với dữ liệu nhân viên (Employee).
- Hiểu cơ chế **CORS** và cách cấu hình trong Spring Boot để cho phép React call API.

---

## 📝 Mô tả

Bài tập gồm 2 phần chính:

1. **Backend (Server)**

   - Xây dựng bằng **Spring Boot 3 + JPA + MySQL**.
   - Expose REST API cho entity **Employee** và **Department**.
   - Hỗ trợ các API:
     - `GET /api/employees` → Lấy danh sách nhân viên
     - `GET /api/employees/{id}` → Lấy chi tiết nhân viên theo id
     - `POST /api/employees` → Thêm mới nhân viên
     - `PUT /api/employees/{id}` → Cập nhật thông tin nhân viên
     - `PATCH /api/employees/{id}/status` → Thay đổi trạng thái nhân viên
     - `DELETE /api/employees/{id}` → Xóa nhân viên
   - Cấu hình **CORS** để cho phép React gọi API.

2. **Frontend (Client)**
   - Xây dựng bằng **React 19 + Vite + React Bootstrap**.
   - Sử dụng thư viện **Axios** để call API từ backend.
   - Có giao diện form CRUD:
     - Nhập thông tin: Full Name, Address, Phone, Status
     - Hiển thị danh sách nhân viên
     - Chỉnh sửa / Xóa nhân viên
   - Quản lý state với React hooks (`useState`, `useEffect`).

---

## ⚙️ Công nghệ sử dụng

### Backend

- Java 21
- Spring Boot 3.5.6
- Spring Data JPA
- MySQL
- Lombok
- Maven

### Frontend

- React 19
- Vite
- Axios
- React Bootstrap
- lucide-react (icon)

---
