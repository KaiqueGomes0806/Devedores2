document.addEventListener('DOMContentLoaded', loadTransactions);
document.getElementById('transaction-form').addEventListener('submit', addTransaction);

let transactions = [];

function addTransaction(e) {
    e.preventDefault();

    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const date = document.getElementById('date').value;

    const transaction = {
        date,
        description,
        amount
    };

    transactions.push(transaction);
    saveTransactions();
    updateTransactionTable();
    document.getElementById('transaction-form').reset();
}

function updateTransactionTable() {
    const tbody = document.getElementById('transactions-table').querySelector('tbody');
    tbody.innerHTML = '';

    transactions.forEach((transaction, index) => {
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td>${formatDate(transaction.date)}</td>
            <td>${transaction.description}</td>
            <td class"valor">${formatCurrency(transaction.amount)}</td>
            <td><button onclick="removeTransaction(${index})">Remover</button></td>
            <input type="checkbox" id="check" nome="check" value="check">      
        `;

        tbody.appendChild(tr);
    });
}

function removeTransaction(index) {
    transactions.splice(index, 1);
    saveTransactions();
    updateTransactionTable();
}

function saveTransactions() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function loadTransactions() {
    const storedTransactions = localStorage.getItem('transactions');
    if (storedTransactions) {
        transactions = JSON.parse(storedTransactions);
        updateTransactionTable();
    }
}

function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

function formatDate(dateString) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Intl.DateTimeFormat('pt-BR', options).format(new Date(dateString));
}


function saveTableData() {
    const table = document.getElementById('myTable');
    const rows = table.querySelectorAll('tbody tr');
    const tableData = [];

    rows.forEach(row => {
        const name = row.querySelector('input[name="name"]').value;
        const email = row.querySelector('input[name="email"]').value;
        tableData.push({ name, email });
    });

    localStorage.setItem('tableData', JSON.stringify(tableData));
}

// Função para carregar os dados salvos no LocalStorage
function loadTableData() {
    const tableData = JSON.parse(localStorage.getItem('tableData')) || [];
    const tbody = document.getElementById('tableBody');
    
    tableData.forEach(data => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td><input type="text" name="name" value="${data.name}" /></td>
            <td><input type="email" name="email" value="${data.email}" /></td>
            <td><button class="deleteRow">Excluir</button></td>
        `;
        tbody.appendChild(newRow);
    });
}

// Salva os dados da tabela ao fechar ou recarregar a página
window.addEventListener('beforeunload', saveTableData);

// Carrega os dados quando a página é carregada
window.addEventListener('load', loadTableData);