const url = 'http://localhost:4444'

let users = []

const check_Admin = async () => {
    try {
        if (!localStorage.getItem('token')) window.location.replace('authorization_page.html')
        let response = await fetch(url + '/auth/me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },

        });
        let res = await response.json()
        if (response.ok) {
            if (!res.isAdmin) {
                alert('Ты не админ!')
                window.location.replace('authorization_page.html')
            }
            getUsers()
        } else {
            alert('Не удалось авторизоваться')
            window.location.replace('authorization_page.html')
        }
    } catch (error) {
        alert('Не удалось авторизоваться')
        window.location.replace('authorization_page.html')
    }
}

const delete_user = async (id) => {
    if (id) {
        let response = await fetch(url + `/user/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },

        });
        if (response.ok) {
            getUsers()
        }
    }
}

const search_user = async () => {
    let search_line = document.getElementById('search_user').value
    let result = users.filter((user) => user.fio.includes(search_line))
    display_user(result)
}

const getUsers = async () => {
    try {
        let response = await fetch(url + '/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },

        });
        let res = await response.json()
        if (response.ok) {
            users = res
            display_user(res)

        } else {

        }
    } catch (error) {

    }
}

const display_user = (users) => {
    let string = ''
    let container = document.getElementById('users-container')
    users.map((user) => {
        string +=
            `<div class="users-item">
            ${user.fio}
            <button onclick="delete_user('${user._id}')">
                Удалить
            </button>
            </div>`
    });
    container.innerHTML = string
}

const reset = () => {
    document.getElementById('search_user').value = ''
    display_user(users)
} 

check_Admin()
