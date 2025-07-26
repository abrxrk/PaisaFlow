# PaisaFlow - Your AI-Powered Financial Companion

PaisaFlow is a modern, full-stack web application designed to help you take control of your financial health. It provides a beautiful and intuitive interface to monitor spending, manage budgets, track goals, and get personalized insights from an AI-powered chatbot.

---

## ✨ Key Features

* **Beautiful Landing Page:** A welcoming and informative entry point for new users.
* **Interactive Dashboard:** Get a quick overview of your total income, expenses, net savings, and savings rate with clear, visually appealing cards.
* **Budget Tracker:**
    * Create, edit, and delete budgets for different spending categories.
    * Visualize your spending against your limits with dynamic progress bars.
    * Get automatic alerts when you are over budget.
* **Goal Management:**
    * Set, update, and track your financial goals (e.g., Emergency Fund, Vacation).
    * Visually track your progress towards each goal.
    * Get alerts for approaching deadlines and celebrate when goals are achieved.
* **Detailed Transaction History:**
    * View a comprehensive list of all your income and expenses.
    * Search, filter by category/type, and sort by date or amount to easily find what you're looking for.
* **AI Chatbot Assistant:**
    * A floating chatbot available on every page.
    * Ask questions about your personal finances (e.g., "How much did I spend on food?") and get data-driven answers.
    * Ask general financial questions (e.g., "What is a SIP?") for clear explanations.

## 🛠️ Tech Stack

* **Frontend:** [React](https://react.dev/) (v19)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Icons:** [Lucide React](https://lucide.dev/)
* **AI/LLM Integration:** [OpenRouter API](https://openrouter.ai/) (using the Mistral 7B model)

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* [Node.js](https://nodejs.org/en/) (v18 or newer)
* [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/your-username/riffhi-paisaflow.git](https://github.com/your-username/riffhi-paisaflow.git)
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd riffhi-paisaflow/PaisaFlow
    ```

3.  **Install NPM packages:**
    ```sh
    npm install
    ```

4.  **Set up environment variables:**
    The AI Chatbot requires an API key from OpenRouter.

    * Create a new file named `.env` in the `PaisaFlow/` root directory.
    * Add the following line to the `.env` file, replacing `your_api_key_here` with your actual OpenRouter API key:

    ```env
    VITE_OPENROUTER_API_KEY="your_api_key_here"
    ```

5.  **Run the development server:**
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
