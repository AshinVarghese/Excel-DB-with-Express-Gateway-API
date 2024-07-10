const apiUrl = 'http://localhost:3001/api/data'; // Update to use gateway API

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});

function fetchData() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const dataList = document.getElementById('data-list');
            dataList.innerHTML = '';
            data.forEach(item => {
                const dataItem = document.createElement('div');
                dataItem.className = 'data-item';
                dataItem.innerHTML = `
                    <span>${item.name} (${item.age})</span>
                    <button onclick="deleteData(${item.id})">Delete</button>
                `;
                dataList.appendChild(dataItem);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

function addData() {
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;

    if (name && age) {
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, age })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Data added:', data);
            fetchData();
        })
        .catch(error => console.error('Error adding data:', error));
    } else {
        alert('Please enter both name and age');
    }
}

function deleteData(id) {
    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    })
    .then(() => {
        console.log('Data deleted');
        fetchData();
    })
    .catch(error => console.error('Error deleting data:', error));
}
