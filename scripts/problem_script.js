const url = 'https://ssa-fo1l.onrender.com'

let problems = [];
let openedProblem;

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

const displayProblems = (problems) => {
    let string = ''
    let container = document.getElementById('users-container')
    problems.map((problem) => {
        string +=
            `<div class="users-item">
                <div class="users-item-info">
                    <div>
                        ${problem.user.fio}
                    </div>
                    <div>
                        Статус:
                        ${problem.status}
                    </div>
                    <div>
                        
                        ${problem.level}
                    </div>
                </div>
            <button onclick="open_problem('${problem._id}')">
                Просмотр
            </button>
            </div>`
    });
    container.innerHTML = string
}

const open_problem = (problemId) => {
    let problem = problems.find((problem) => problem._id == problemId)
    openedProblem = problem;
    let container = document.getElementById('main_container');
    container.style.display = 'none'
    let userInfo = document.getElementById('user-info');
    userInfo.style.display = 'flex';
    let problemStatus = document.getElementById('problem-status');
    problemStatus.innerHTML = problem.status;
    let problemLevel = document.getElementById('problem-level');
    problemLevel.innerHTML = problem.level;
    let userFio = document.getElementById('user-fio')
    userFio.innerHTML = problem.user.fio;
    let userDepartment = document.getElementById('user-department');
    userDepartment.innerHTML = problem.user.department;
    let userPc = document.getElementById('user-pc');
    userPc.innerHTML = problem.user.pc;
    let userLogin = document.getElementById('user-login');
    userLogin.innerHTML = problem.user.login;
    let problemText = document.getElementById('problem-text');
    problemText.innerHTML = problem.text;
    let resolver = document.getElementById('user-resolver');
    resolver.innerHTML = problem?.resolver?.fio ?? '';
    let date = document.getElementById('user-createdAt');
    let time = new Date(problem.createdAt).toLocaleTimeString()
    date.innerHTML = new Date(problem.createdAt).toLocaleDateString() + '   ' + time.substring(0,time.length-3);
    if(problem.status == 'В работе'){
        let acceptButton = document.getElementById('accept-button');
        acceptButton.style.display = 'none'
        let completeButton = document.getElementById('complete-button')
        completeButton.style.display = 'block'
    }
}
const closeProblem = () => {
    let userInfo = document.getElementById('user-info');
    userInfo.style.display = 'none';
    let container = document.getElementById('main_container');
    container.style.display = 'block'
    get_problems(problems)
}

const acceptProblem = async() => {
    try {
        let response = await fetch(url + `/problems/${openedProblem._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                status: 'В работе'
            })
        })
        let res = await response.json();
        if(response.ok) {
            let problemStatus = document.getElementById('problem-status');
            problemStatus.innerHTML = 'В работе';
            let acceptButton = document.getElementById('accept-button');
            acceptButton.style.display = 'none'
            let completeButton = document.getElementById('complete-button')
            completeButton.style.display = 'block'
            let resolver = document.getElementById('user-resolver');
            resolver.innerHTML = res.resolver
        }
    } catch (error) {
        alert(error);
    }
}
const completeProblem = async() => {
    try {
        let response = await fetch(url + `/problems/${openedProblem._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                status: 'Завершено'
            })
        })
        let res = await response.json();
        if(response.ok) {
            
            let problemStatus = document.getElementById('problem-status');
            problemStatus.innerHTML = 'Завершено';
            let completeButton = document.getElementById('complete-button')
            completeButton.style.display = 'none'
        }
    } catch (error) {
        alert(error);
    }
}

const get_problems = async() => {
    try {
        let response = await fetch(url + `/problems`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        })
        let res = await response.json();
        if(response.ok) {
            problems = JSON.parse(JSON.stringify(res))
            displayProblems(problems)
        }
    } catch (error) {
        alert(error);
    }
}

const filter = () => {
    let filtered = JSON.parse(JSON.stringify(problems))
    let filterStatus = document.getElementById('status-filter').value
    let filterLevel = document.getElementById('level-filter').value
    if (filterStatus.length > 0 && filterLevel.length > 0){
        filtered = filtered.filter((problem)=>problem.status.includes(filterStatus)&&problem.level.includes(filterLevel))
    }
    else if(filterStatus.length == 0) {
        filtered = filtered.filter((problem)=>problem.level.includes(filterLevel))
    }
    else if(filterLevel.length == 0) {
        filtered = filtered.filter((problem)=>problem.status.includes(filterStatus))
    }
    displayProblems(filtered)
}




get_problems()