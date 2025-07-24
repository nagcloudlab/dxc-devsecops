

console.log('Client script loaded');


const top5TodosBtn = document.getElementById('top5-todos-btn');
const tBody = document.querySelector('table tbody');
top5TodosBtn.addEventListener('click', () => { 
    fetch('/api/todos/top5')
        .then(response => response.json())
        .then(data => { 
            tBody.innerHTML = ''; // Clear existing rows
            data.forEach(todo => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${todo._id}</td>
                    <td>${todo.title}</td>
                    <td>${todo.completed ? 'Yes' : 'No'}</td>
                `;
                tBody.appendChild(row);
            });
        })
});