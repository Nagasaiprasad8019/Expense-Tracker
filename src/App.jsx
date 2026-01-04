import { useState, useEffect } from "react";
import "./App.css";
function App() {
  const [expenses, setExpenses] = useState(() => {
    return JSON.parse(localStorage.getItem("expenses")) || [];
  });
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);
   const addExpense = (e) => {
  e.preventDefault();
  if (!title || !amount) return;
  setExpenses([
    ...expenses,
    {
      id: Date.now(),
      title,
      amount: Number(amount),
      category,
    },
  ]);
  setTitle("");
  setAmount("");
  setCategory("Food");
};
  const deleteExpense = (id) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };

  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
  <div className="app">
    <h1>Expense Tracker</h1>

    <form className="form" onSubmit={addExpense}>
      <input
        type="text"
        placeholder="Expense name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Shopping">Shopping</option>
        <option value="Others">Others</option>
      </select>

      <button>Add Expense</button>
    </form>

    <div className="total">Total: ₹{total}</div>

    <ul className="list">
      {expenses.map((exp) => (
        <li key={exp.id}>
          <span>
            {exp.title} — ₹{exp.amount} ({exp.category})
          </span>
          <button
            className="delete-btn"
            onClick={() => deleteExpense(exp.id)}
          >
            ✕
          </button>
        </li>
      ))}
    </ul>
  </div>
);

}

export default App;
