# meal planner api
# 🍳 Smart Full-Stack Meal Planner

A modern, data-driven full-stack meal planning web application built with **Node.js, Express, MySQL, and JavaScript**, integrating live data from **TheMealDB API**. 

Designed as part of the `decodelabs_tasks` portfolio, this project demonstrates a complete client-server architecture featuring user-isolated session tracking and centralized developer analytics.

---

## ✨ Features

* **Live Internet Recipe Search:** Query external culinary databases dynamically using ingredients (e.g., beef, chicken, pasta).
* **Interactive UI/UX:** Features a food-themed background, responsive navigation tabs, smooth CSS transitions, and separate toggles for ingredients and step-by-step instructions.
* **Dual-Purpose Data Flow:**
  * **For Users:** A personalized "My Cloud Saved Recipes" page powered by secure browser session IDs (`localStorage`), allowing users to manage their bookmarks.
  * **For Developers:** A centralized MySQL database that records all user saves across the platform, enabling engagement tracking and recipe popularity analytics.
* **Secure Backend:** Implements environment variable isolation (`dotenv`) to protect sensitive database credentials.

---

## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3 (Flexbox/Grid, Custom Animations), JavaScript (ES6+)
* **Backend:** Node.js, Express.js, `cors`
* **Database:** MySQL (`mysql2/promise`)
* **External API:** TheMealDB Open API

---

## 🚀 Getting Started Locally

Follow these steps to set up and run the project on your local machine.

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
cd your-repo-name

