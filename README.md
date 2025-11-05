# Personal Finance Tracker

A modern web application built with React and Material-UI to help you manage your personal finances effectively.

## Features

### 1. Dashboard
- Overview of your financial status
- Monthly income and expense summary
- Visual charts and graphs for financial trends
- Quick access to recent transactions

### 2. Transaction Management
- Add, edit, and delete transactions
- Categorize transactions (Income/Expense)
- Multiple income categories:
  - Salary
  - Freelance
  - Investments
  - Other Income
- Multiple expense categories:
  - Housing
  - Food & Dining
  - Transportation
  - Utilities
  - Healthcare
  - Entertainment
  - Shopping
  - Other Expenses

### 3. Budget Management
- Set monthly budgets by category
- Track spending against budgets
- Visual progress indicators
- Overspending alerts
- Budget vs. actual spending comparison charts

### 4. Financial Goals
- Set short-term and long-term financial goals
- Track progress towards goals
- Set target dates and amounts
- Visual progress tracking
- Goal completion celebrations

### 5. Data Visualization
- Interactive charts using Recharts
- Monthly spending trends
- Category-wise expense breakdown
- Budget utilization charts
- Goal progress tracking

### 6. Local Storage
- Persistent data storage using browser's local storage
- No backend required
- Privacy-focused (all data stays on your device)

## Technical Stack

- **Frontend Framework**: React.js
- **UI Library**: Material-UI (MUI)
- **Charts**: Recharts
- **Routing**: React Router
- **State Management**: React Hooks
- **Storage**: Local Storage
- **Security**: bcryptjs for password hashing
- **Animations**: Framer Motion

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/princesanklecha766-a11y/my-personal-finance-tracker.git
cd my-personal-finance-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open in your default browser at `http://localhost:3000`.

## Project Structure

```
my-personal-finance-tracker/
├── src/
│   ├── components/         # React components
│   │   ├── Budget.js
│   │   ├── BudgetDialog.js
│   │   ├── Goals.js
│   │   ├── GoalDialog.js
│   │   └── ...
│   ├── utils/             # Utility functions
│   │   ├── financeManager.js
│   │   └── storage.js
│   ├── pages/             # Page components
│   │   ├── Dashboard.js
│   │   ├── Login.js
│   │   └── Signup.js
│   └── App.js            # Main application component
├── public/               # Static files
└── package.json         # Project dependencies
```

## Usage

1. **First Time Setup**:
   - Create an account using the signup page
   - Log in with your credentials

2. **Adding Transactions**:
   - Click the "Add Transaction" button on the dashboard
   - Enter transaction details (amount, category, date)
   - Save the transaction

3. **Managing Budgets**:
   - Go to the Budget section
   - Click "Add Budget" to create a new budget
   - Select category and set monthly limit
   - Track your spending against the budget

4. **Setting Goals**:
   - Navigate to the Goals section
   - Click "Add Goal" to create a new financial goal
   - Set target amount and deadline
   - Monitor your progress

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).
