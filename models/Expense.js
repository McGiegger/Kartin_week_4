let expenses = [];
let nextId = 1;

module.exports = {
  getAll: (userId) => expenses.filter(expense => expense.userId === userId),
  add: (userId, { description, amount }) => {
    const newExpense = { id: nextId++, userId, description, amount };
    expenses.push(newExpense);
    return newExpense;
  },
  update: (id, updates) => {
    const index = expenses.findIndex(expense => expense.id === id);
    if (index !== -1) {
      expenses[index] = { ...expenses[index], ...updates };
      return expenses[index];
    }
    return null;
  },
  delete: (id) => {
    const index = expenses.findIndex(expense => expense.id === id);
    if (index !== -1) {
      const deleted = expenses[index];
      expenses = expenses.filter(expense => expense.id !== id);
      return deleted;
    }
    return null;
  },
  calculateTotal: (userId) => {
    return expenses
      .filter(expense => expense.userId === userId)
      .reduce((total, expense) => total + expense.amount, 0);
  }
};