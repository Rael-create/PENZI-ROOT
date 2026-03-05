# Penzi SMS Dating Service - Frontend

Penzi is Kenya's #1 SMS-based dating service, designed to connect singles through simple SMS commands without the need for mobile data or complex apps. This repository contains the modern web frontend for the service, featuring a landing page, a "how-it-works" guide, an SMS simulator for testing, and a real-time service dashboard.

##  Features

-   **Modern UI/UX**: Dark-themed glassmorphism design with fluid animations.
-   **SMS Simulator**: A fully interactive terminal that mimics the SMS interaction with the Penzi backend.
-   **Service Dashboard**: Real-time visualization of registered users and active participants.
-   **Command Portal**: Administrative interface to execute SMS commands directly.
-   **Responsive Design**: Optimized for both desktop and mobile viewing.

##  Application Flow

The application is structured to guide users from discovery to interaction:

1.  **Landing Page (`/`)**: Introduction to the service with key statistics (6,000+ partners, SMS shortcode 22141).
2.  **How It Works (`/how-it-works`)**: A 6-step visual guide detailing the SMS registration and matchmaking process:
    -   `PENZI`: Initial activation.
    -   `start#name#age#...`: Profile registration.
    -   `details#...`: Adding personal details.
    -   `MYSELF ...`: Self-introduction.
    -   `match#age#town`: Finding partners.
    -   `NEXT`: Browsing more matches.
3.  **SMS Simulator (`/simulator`)**: An interactive chat interface where users can simulate sending the commands mentioned above and receive real-time system replies.
4.  **Service Dashboard (`/dashboard`)**: A high-level overview for service monitoring, showing "Registered Users" and "Active Today" metrics, along with a quick-send portal for manual command execution.

##  Tech Stack

-   **Framework**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
-   **Routing**: [React Router v6](https://reactrouter.com/)
-   **Icons**: [React Icons (Feather Icons)](https://react-icons.github.io/react-icons/)
-   **API**: Axios for backend communication.
-   **Styling**: Modern CSS with custom properties and glassmorphism.

##  Getting Started

### Prerequisites

-   Node.js (v16.x or later)
-   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-repo/penzi-frontend.git
    cd penzi-frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Configure API Endpoint:
    Ensure your backend service is running and update the API base URL in `src/api/index.js` if necessary.

### Running the App

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`.


