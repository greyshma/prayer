# 🙏 JY AJCE Campus Ministry App

A premium, fully responsive, front-end web application built for the **Jesus Youth movement at Amal Jyothi College of Engineering (AJCE)**. Designed with a modern dark theme, glassmorphism, and smooth micro-animations, this app serves as a centralized spiritual hub for students, featuring everything from daily scriptures and interactive Holy Mass tracking to an Instagram-style community feed.

## ✨ Key Features

This application implements 15 core features designed for the JY AJCE community:

1. **Dashboard & Streaks 🔥**: Keep track of daily prayer and Mass attendance streaks dynamically.
2. **Proper Holy Mass Tracker ⛪**: Interactive modal allowing users to log their Mass attendance (Date, Parish, and Intentions).
3. **Mass Rewards & Virtual Rosary 📿**: Attend 10 Masses and recite a Hail Mary to unlock a beautiful "Virtual Rosary" that can be gifted to a friend.
4. **Recent Moments (Instagram Style) 📸**: An interactive feed showcasing past activities with "like" functionality and captions.
5. **Weekly Schedule 🗓️**: Dynamic schedule highlighting today's events (e.g., Core Meeting on Mon, Intersession on Tue, Gathering on Wed, Prolife Rosary on Thu).
6. **Campus Prayer Area 🕊️**: Features the official AJCE Campus Prayer.
7. **Pray Box 🙏**: Submit prayer requests anonymously or with a name, and an interactive board to click "Pray" for others' intentions.
8. **Event Suggestion System 💡**: Direct form for proposing new gathering ideas to the core team.
9. **Daily Bible Quote 📖**: Automatically generates and displays a new scripture verse every day.
10. **Random Prayer Partner 🤝**: One-click assignment of a random ministry member to keep in your prayers for the week.
11. **Nearby Parishes 📍**: Details and Mass timings for local churches (St. Mary's, St. Dominic's, AJCE Campus Chapel).
12. **Ministry Profiles 👥**: Grid layout showcasing ministry leaders and coordinators.
13. **Alumni Network 🎓**: Dedicated space for alumni to post job opportunities and connect with current students.
14. **Birthday Blessings 🎂**: Log birthdays. Discovers if today is a logged birthday and triggers an animated spiritual blessing UI!
15. **Monthly Summaries 📊**: An automatic calculation of total prayers offered and Masses attended this month.
16. **Automatic Mass Alarm ⏰**: Integrated UI toggle to set daily 6:00 AM Mass reminders. 

## 💻 Tech Stack

- **HTML5**: Semantic tagging and structured layout.
- **CSS3 (Vanilla)**: Fully custom CSS utilizing CSS Variables, Flexbox/Grid, Glassmorphism techniques, and Keyframe animations. No external UI frameworks (like Tailwind or Bootstrap) were used, ensuring full bespoke control.
- **JavaScript (Vanilla)**: Handles all DOM manipulation, mock state logic, local storage APIs, modal toggling, and streak calculations.
- **FontAwesome**: Used for all scaled vector iconography.
- **Google Fonts**: Uses *Inter* for clean UI text and *Playfair Display* for aesthetic serif headings.

## 🚀 How to Run Locally

Since this project is built entirely on client-side web technologies with browser-based `localStorage` acting as the database, there is no complicated build step or backend required!

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/jy-ajce-app.git
   ```
2. **Navigate to the directory:**
   ```bash
   cd jy-ajce-app
   ```
3. **Open in Browser:**
   Simply double-click the `index.html` file to open it in your default web browser (Chrome, Safari, Edge, or Firefox).

*Optional:* For the best development experience, open the folder in VS Code and use the **Live Server** extension to launch the app.

## 💾 State Management

All user data (such as streaks, logged masses, unlocked rosaries, added birthdays, and assigned partners) is seamlessly saved to the browser's `localStorage`. This ensures that when a user closes the tab and returns tomorrow, their spiritual progress is perfectly intact.

## 🎨 Design System

- **Backgrounds**: Deep premium dark tones (`#0a0a12`) layered with radial gradient lighting.
- **Accents**: Holy Gold (`#d4a853`), Spirit Purple (`#8b5cf6`), and Emerald Green (`#10b981`).
- **Cards**: Translucent glass effect (`rgba(255, 255, 255, 0.03)`) with subtle blurred backdrops and hovering translation animations.

---
*"O Lord, let the campuses be filled with young missionaries blessed with the love of the Father, the grace of Christ and the anointing of the Holy Spirit."*
