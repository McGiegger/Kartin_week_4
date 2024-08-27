const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Expense = require('../models/Expense');

// GET /api/expenses
router.get('/', auth, (req, res) => {
  const expenses = Expense.getAll(req.user.id);
  res.json(expenses);
});

// POST /api/expenses
router.post('/', auth, (req, res) => {
  const { description, amount } = req.body;
  if (!description || !amount) {
    return res.status(400).json({ msg: 'Please include a description and amount' });
  }
  const newExpense = Expense.add(req.user.id, { description, amount });
  res.json(newExpense);
});

// PUT /api/expenses/:id
router.put('/:id', auth, (req, res) => {
  const updatedExpense = Expense.update(parseInt(req.params.id), req.body);
  if (updatedExpense) {
    res.json(updatedExpense);
  } else {
    res.status(404).json({ msg: 'Expense not found' });
  }
});

// DELETE /api/expenses/:id
router.delete('/:id', auth, (req, res) => {
  const deletedExpense = Expense.delete(parseInt(req.params.id));
  if (deletedExpense) {
    res.json({ msg: 'Expense deleted', expense: deletedExpense });
  } else {
    res.status(404).json({ msg: 'Expense not found' });
  }
});

// GET /api/expenses/total
router.get('/total', auth, (req, res) => {
  const total = Expense.calculateTotal(req.user.id);
  res.json({ total });
});

module.exports = router;