document.getElementById('money-tracker-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const category = document.getElementById('category_select').value;
    const amount = Number(document.getElementById('amount_input').value);
    const info = document.getElementById('info').value;
    const date = document.getElementById('date_input').value;

    if (!category || isNaN(amount) || amount <= 0 || !info || !date) {
        alert('Please fill in all fields correctly.');
        return;
    }

    const expense = { category, amount, info, date };
    addExpense(expense);
    updateTotal(amount, category);
    appendRow(expense);
});

const expenses = [];
let totalAmount = 0;

function addExpense(expense) {
    expenses.push(expense);
}

function updateTotal(amount, category) {
    totalAmount += (category === 'Income' ? amount : -amount);
    document.getElementById('total-amount').textContent = totalAmount.toFixed(2);
}

function appendRow(expense) {
    const tableBody = document.getElementById('expense-table-body');
    const newRow = tableBody.insertRow();

    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const infoCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();

    categoryCell.textContent = expense.category;
    amountCell.textContent = expense.amount.toFixed(2);
    infoCell.textContent = expense.info;
    dateCell.textContent = expense.date;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', function() {
        tableBody.removeChild(newRow);
        adjustTotalOnDelete(expense);
        expenses.splice(expenses.indexOf(expense), 1);
    });

    deleteCell.appendChild(deleteBtn);
}

function adjustTotalOnDelete(expense) {
    const adjustment = (expense.category === 'Income' ? -expense.amount : expense.amount);
    updateTotal(adjustment, expense.category === 'Income' ? 'Expense' : 'Income');
}
