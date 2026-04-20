# Portfolio Builder

A dynamic, interactive, and customizable professional portfolio built for AI & Data Science professionals. This application allows you to showcase your experience, generate PDF resumes on the fly, and seamlessly manage your projects, skills, and certifications directly from the UI.

## 🚀 Features

- **Dynamic Resume Generation**: Instantly generate and download a perfectly formatted PDF resume containing your latest skills and experiences using `html2pdf.js`.
- **Interactive Management**: Add, edit, or delete items in your Skills, Projects, and Certificates tabs on the fly.
- **Admin Password Authentication**: Protects the application's edit capabilities. Attempting to modify or add any data prompts a secure admin password gateway.
- **Dark/Light Mode**: Full theming support explicitly tailored to feel highly modern and premium.
- **Dynamic Animations**: Smooth, beautiful page transitions and scroll animations powered by Framer Motion.
- **Searchable Portfolios**: A built-in search functionality instantly filters your displayed projects based on tech stack or title.

## 🛠️ Technology Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: React Icons (Ionicons)
- **PDF Generation**: html2pdf.js
- **State Management**: React Context API & `localStorage` persistence.

## ⚙️ Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/PROGRAMERPARTH/MainPortfolioWebsite.git
   cd MainPortfolioWebsite
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Configure your Environment Variables:
   Create a `.env` file in the root of the project with the following (you can also modify the existing `.env`):
   ```env
   VITE_APP_TITLE=Portfolio Builder
   VITE_APP_URL=http://localhost:5173
   
   # Admin Authentication Password (for adding/editing content)
   VITE_ADMIN_PASSWORD=admin123
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🔒 Security
To prevent unauthorized users from modifying your publicly deployed portfolio, editing actions are protected. Before you can *Add*, *Edit*, or *Delete* any project, skill, or certification, the application will prompt you for the admin password (`VITE_ADMIN_PASSWORD`).

## 📄 License
This project is open-source and available under the MIT License.
