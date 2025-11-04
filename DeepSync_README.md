# 🚀 DeepSync – Real-Time Usage & Focus Tracker

A **modern, responsive web application** that tracks and visualizes user screen time, app usage, and productivity sessions — built using **HTML**, **Tailwind CSS**, and **Firebase Firestore**.

---

## 📘 Overview

**DeepSync** helps users monitor their daily digital activities in real-time.  
It fetches and visualizes data such as total screen time, app-wise usage, and focus sessions using **Firebase Firestore’s real-time listeners** — all displayed beautifully using **Tailwind CSS components**.

---

## 🧩 Key Features

### 🌐 Frontend
- **Modern HTML5 architecture** with semantic structure.
- **Tailwind CSS integration** for fast, utility-first styling.
- **Prebuilt responsive layouts** optimized for both desktop and mobile.
- **Custom UI components** for dashboards, analytics, and timers.

### ⚙️ Backend & Functionality
- **Firebase Firestore Integration** for real-time data storage.
- **Live Synchronization:** App updates instantly when Firestore data changes.
- **Dynamic Usage Breakdown:** Displays app-wise time distribution.
- **Focus Sessions Tracking:** Converts total minutes into “focus sessions” (25 minutes = 1 session).
- **Automatic Updates:** UI auto-refreshes without reloading the page.

### 📊 Dashboard & Analytics
- Displays:
  - 🕒 **Total Screen Time**
  - 📱 **App-Wise Usage Breakdown**
  - 🎯 **Focus Session Count**
- Supports **multi-page navigation** (`index.html`, `analytics.html`, etc.).
- Optimized for **real-time visual analytics**.

---

## 🏗️ Project Structure

```
X02-main/
├── index.html                # Main entry point
├── css/
│   ├── tailwind.css          # Tailwind source configuration
│   └── main.css              # Compiled output CSS (auto-generated)
├── js/
│   ├── app.js                # Core Firebase + real-time usage logic
│   ├── app-init.js           # Initialization and setup routines
│   ├── analytics.js          # Handles data analytics visualization
│   ├── dashboard.js          # Dashboard logic and rendering
│   ├── focus.js              # Focus session logic
│   ├── listeners.js          # UI and event listeners
│   ├── schedule.js           # Task and time scheduling logic
│   ├── settings.js           # App configuration
│   ├── tracker.js            # Activity tracking utilities
│   ├── usageTracker.js       # Usage time management
│   └── firebase-config.js    # Firebase configuration file (user must add)
├── pages/
│   ├── analytics.html        # Analytics dashboard page
│   └── (other UI pages)
├── package.json              # Dependencies and scripts
├── tailwind.config.js        # Tailwind customization
└── README.md                 # Documentation
```

---

## ⚙️ Installation & Setup

### 🧰 Prerequisites
- [Node.js](https://nodejs.org/) (v12.x or higher)
- npm or yarn
- A Firebase project (for Firestore setup)

### 🧾 Steps to Run

1. **Clone the repository**
   ```bash
   git clone https://github.com/<your-username>/DeepSync.git
   cd DeepSync
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up Firebase**
   Create a file at `js/firebase-config.js` and add your Firebase credentials:
   ```js
   export const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "your-app.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-app.appspot.com",
     messagingSenderId: "XXXXXX",
     appId: "XXXXXX"
   };
   ```

4. **Start the development environment**
   ```bash
   npm run dev
   ```
   This will automatically watch for changes and rebuild CSS using Tailwind.

5. **Build for production**
   ```bash
   npm run build:css
   ```

---

## 🧠 How It Works

### 🔥 Firebase Real-Time Listener
DeepSync uses Firebase’s **onSnapshot()** method to monitor Firestore collections in real time.  
Whenever data in Firestore updates (like screen time or focus sessions), the UI updates automatically.

### 📈 Data Flow
1. Firebase initializes using `firebase-config.js`
2. Real-time listener subscribes to the user’s data document (`usage/{userId}`)
3. Data (like duration and app usage) is processed and visualized instantly
4. Tailwind components update the dashboard dynamically

### 🧮 Example Function
```js
function formatMinutes(mins) {
  const h = Math.floor(mins/60);
  const m = mins%60;
  return `${h}h ${m}m`;
}
```
Used to display human-readable time formats in the dashboard.

---

## 🎨 Styling

DeepSync uses **Tailwind CSS** for all UI styling with extra plugins for animations, typography, and responsiveness.

### 🧩 Included Plugins
- `@tailwindcss/forms` → Improved input styling  
- `@tailwindcss/typography` → Beautiful readable text layouts  
- `@tailwindcss/container-queries` → Adaptive containers  
- `tailwindcss-animate` → Smooth animations  
- `tailwindcss-elevation` → Realistic shadow effects  
- `tailwindcss-fluid-type` → Responsive fluid typography  

---

## 🪄 NPM Scripts

| Command | Description |
|----------|--------------|
| `npm run build:css` | Builds Tailwind CSS for production |
| `npm run watch:css` | Watches for file changes and rebuilds CSS |
| `npm run dev` | Starts the live development environment |

---

## 🧰 Tech Stack

| Technology | Purpose |
|-------------|----------|
| **HTML5** | Base structure and content |
| **Tailwind CSS** | Styling and responsive design |
| **Firebase Firestore** | Real-time database and synchronization |
| **JavaScript (ES6)** | Core application logic |
| **Node.js + NPM** | Package and build management |

---

## 🧪 Use Cases

- Screen time tracking dashboard  
- Productivity and focus tracking app  
- Study-time tracker for students  
- Real-time analytics visualization for any activity monitoring  

---

## 🔐 Firebase Setup

Create `js/firebase-config.js` manually and paste your Firebase credentials as shown earlier.  
Ensure Firestore rules are configured to allow secure read/write operations for your app users.

---

## 💻 Development Notes

- The app relies on **Firestore real-time updates**.
- Missing Firebase credentials will show a console warning.
- The project is **modular**, allowing new components and pages to be added easily.
- Designed with **scalability and reusability** in mind.

---

## 🧾 License

This project is released under the **MIT License**.  
You can freely modify, distribute, and use it for educational or commercial purposes.

---

## 🙏 Acknowledgments

### 👥 Team Members

This project was developed by:

- **Adeep AG** — Project Lead & Developer  
- **Ankush** — Developer  
- **Aditya** — Developer  
- **M B Srujan** — Developer  

---

## ❤️ Built With

- HTML5 + Tailwind CSS  
- Firebase Firestore  
- Node.js + NPM  
- 💡 And a lot of teamwork & creativity!

---

**© 2025 DeepSync Project Team**
