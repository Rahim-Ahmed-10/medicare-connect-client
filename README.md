# 🏥 MediCare Connect

A modern and full-stack healthcare management platform designed to streamline seamless coordination between patients, doctors, and administrators.

---

## 📋 Overview
**MediCare Connect** is a robust digital ecosystem where patients can easily discover specialist doctors, book instant appointments, complete secure payments via Stripe, and receive digital prescriptions. It also features dedicated management portals for doctors and administrators.

---

## 🛠 Tech Stack
- **Frontend:** Next.js (App Router), Tailwind CSS, Framer Motion, Recharts
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT, Firebase (Google Login)
- **Payment Gateway:** Stripe

---

## ✨ Key Features

### 👤 Patient Portal
- **Doctor Discovery:** Search and filter doctors by name, hospital, and specialization.
- **Appointment Booking:** Secure and seamless live schedule booking.
- **Secure Payments:** Integrated Stripe checkout gateway for consultation fees.
- **History & Reviews:** Track appointment history and submit doctor reviews.

### 👨‍⚕️ Doctor Portal
- **Profile & Schedule Management:** Comprehensive profile settings and availability scheduling.
- **Appointment Control:** Accept or reject incoming patient appointment requests.
- **Digital Prescriptions:** Generate and manage medical prescriptions for patients.

### 🛡️ Admin Dashboard
- **User Control:** Verify and manage user and doctor profiles/roles.
- **Monitoring:** Oversee platform-wide transactions, payments, and appointment records.
- **Analytics:** Real-time data visualization and charts powered by Recharts.

---

## 🚀 Installation & Setup

1. **Clone the Repository:**
   ```bash
   git clone [https://github.com/Rahim-Ahmed-10/medicare-connect-client.git](https://github.com/Rahim-Ahmed-10/medicare-connect-client.git)
   cd medicare-connect-client
Install Dependencies:

Bash
npm install
Environment Setup:
Create a .env.local file in the root directory and add your respective Firebase, MongoDB, and Stripe secret keys.

Run the Development Server:

Bash
npm run dev
🔐 Test Admin Credentials
Email: admin@medicare.com

Password: Admin!123

📊 Analytics & Data Visualization
The dashboard utilizes Recharts to display doctor performance metrics and appointment trends dynamically, providing insightful data visualization.

👨‍💻 Developer
Name: Rahim Miah

GitHub Client: https://github.com/Rahim-Ahmed-10/medicare-connect-client

GitHub Server: https://github.com/Rahim-Ahmed-10/medicare-connect-server

Live Preview: https://medicare-connect-client-theta.vercel.app