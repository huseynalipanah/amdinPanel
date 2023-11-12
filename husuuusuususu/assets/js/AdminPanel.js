let users = [];
fetch('http://localhost:3000/users')
    .then(response => response.json())
    .then(data => {
        users = data;
        UsersList();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    
    function getCreate(){
        window.location.href="AdminPanelAdd.html"
    }
function deleteUser(id) {
    fetch('http://localhost:3000/users/' + id, {
        method: 'DELETE',
    })
    .then(() => {
        users = users.filter(user => user.id !== id);
        UsersList();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}



function updateUser(id) {
    let image = prompt("image");
    let name = prompt("name");
    let work = prompt("wokr");
    let updateInfo = users.find(user => user.id === id);
    if (updateInfo) {
        updateInfo.image = image;
        updateInfo.name = name;
        updateInfo.work = work;
        
        fetch(`http://localhost:3000/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateInfo),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            users = users.map(user => user.id === id ? {...user, image, name, work} : user);
            UsersList();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
}

function UsersList() {
    let userList = document.getElementById('user-list');
    userList.innerHTML = '';
    users.forEach(user => {
        let userCard = document.createElement('div');
        userCard.className = 'user-card';
        userCard.innerHTML = `
        <p>image:
        <image src="${user.image}" alt="">
        </p>
        <p>İsim: ${user.name}</p>
        <p>İş: ${user.work}</p>
        <button onclick="updateUser('${user.id}')">update</button>
        <button onclick="deleteUser('${user.id}')">delete</button>
        `;
        userList.appendChild(userCard);
    });
}

document.getElementById('user-form-admin').addEventListener('submit', function(event) {
    event.preventDefault();
    let image = document.getElementById('image').value;
    let name = document.getElementById('name').value;
    let work = document.getElementById('work').value;
    let userNewInfo = {
        "image":image,
        "name": name,
        "work": work,
        "id": Math.random().toString(36).substring(7)
    };

    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userNewInfo),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        users.push(data);
        UsersList();
   
        window.location.href = 'AdminPanel.html'; 
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    window.location.href="AdminPanel.html"

});


