# GharBaitheKamai.in

**Kaam bhi, Kamai bhi - Aapke Shehar Se.**

A MERN stack platform connecting local workers with nearby micro jobs for daily earnings.  
Target users are normal / low-income workers and small local employers across Indian cities.

## Tech Stack

- **Frontend:** React + Vite, React Router, Axios
- **Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT auth
- **API Style:** REST JSON
- **Auth:** Simple phone + password for MVP (OTP can be added later)

---

## Features (MVP)

- Worker & Employer roles
- Phone-based registration & login
- Employer can post jobs (title, amount, city, area, wage type)
- Worker can view list of open jobs and apply with 1 click
- Basic JWT-protected routes
- Simple, mobile-first friendly UI

---

## Project Structure

```bash
GharBaitheKamaiFull/
  backend/
    src/
      config/
      controllers/
      middlewares/
      models/
      routes/
      utils/
  frontend/
    src/
      pages/
      services/
```

---

## Setup Instructions

### Clone / Extract

```bash
git clone https://github.com/your-username/GharBaitheKamai.in.git
# or extract the zip
```

### Backend Setup

```bash
cd backend
cp .env.example .env   # edit Mongo URI etc.
npm install
npm run dev            # starts API at http://localhost:5000
```

### Frontend Setup

```bash
cd ../frontend
npm install
npm run dev            # starts Vite dev server at http://localhost:5173
```

> Make sure `VITE_API_URL` (if used) points to your backend URL.  
> Default is `http://localhost:5000` from `apiClient.js`.

---

## Next Improvements

- Proper SMS OTP login flow (MSG91 / Twilio etc.)
- Geo-based job search (distance filter)
- Worker profiles with experience & ratings
- Employer dashboard with applicants page
- Hindi + regional language toggle
- Razorpay integration for employer job post credits

---

## Author

Built for the idea of **helping local workers earn easily using just a phone.**  
You can customize branding / design as per your vision.

---

##  Contact & Support

 Developed by [Wearl Technologies](https://wearl.co.in)  
 Email: [hello@wearl.co.in](mailto:hello@wearl.co.in)  
 Website: [https://wearl.co.in](https://wearl.co.in)  
 Instagram: [@dev.wearl](https://instagram.com/dev.wearl)

---

##  License

This project is licensed under a Custom Proprietary License – Personal Use Only.
© 2025 Saurabh Kushwaha. All Rights Reserved.
This software and its source code are the exclusive property of Saurabh Kushwaha.
No individual or organization other than the owner is permitted to use, copy, modify, publish, distribute, sell, or create derivative works from this project.
Any unauthorized usage is strictly prohibited and may lead to legal action.
Permission for any use requires written approval from the owner.

---

##  Contributing

Contributions, issues, and feature requests are welcome!  
1. Fork this repo  
2. Create a new branch: `git checkout -b feature/new-feature`  
3. Commit changes: `git commit -m "Added new feature"`  
4. Push and open a Pull Request  

---

##  About Wearl Technologies

**Wearl Technologies** is a digital innovation company specializing in:  
 •  Web Development 
 •  E-commerce Solutions 
 •  Mobile App Development 
 •  AI Integrations  

We help businesses **go digital and scale faster** through custom-built tech solutions.

 [Visit wearl.co.in →](https://wearl.co.in)

---

© 2025 [Wearl Technologies](https://wearl.co.in) – All Rights Reserved.


