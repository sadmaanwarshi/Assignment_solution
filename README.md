# 🧾 Billing System (Node.js + React + PostgreSQL)

This is a **billing system** built with **Node.js (Express)** for the backend and **React** for the frontend.  
It allows users to **add customer bills** and **fetch bills using a bill number**.

---

## 📌 Features  
✔ **Add New Bill** (Customer name, phone, bill number, amount)  
✔ **Fetch Bill by Bill Number**  
✔ **Bootstrap UI for a professional look**  
✔ **Toast notifications for success & errors**  

---

## 📂 Folder Structure  

billing-system/ │── backend/ # Node.js (Express) API │ ├── server.js # Main Express server │ ├── .env # Environment variables │ ├── package.json # Backend dependencies │── frontend/ # React UI │ ├── src/ # React components │ ├── package.json # Frontend dependencies │── .gitignore # Files to ignore


---

## 🛠️ Installation & Setup  

### **1️⃣ Clone the repository**  
```bash
git clone https://github.com/your-username/billing-system.git
cd billing-system
```
---

## setup backend
``` bash
cd backend
npm install
```
---
# Configure PostgreSQL Database

DB_USER=your_postgres_user
DB_HOST=localhost
DB_NAME=billing_system
DB_PASSWORD=your_password
DB_PORT=5432
PORT=3000
---
## Start the Backend Server
```bash
npm start
```
---

# setup frontend
``` bash
cd ../frontend
npm install
npm start
```
---
# ✅ Tech Stack
Backend: Node.js, Express, PostgreSQL
Frontend: React, Bootstrap, Axios
Other: dotenv, CORS, Toastify
---

# 🚀 Author
## sadmaan warshi
