const url = 'https://ssa-fo1l.onrender.com'

const check_Admin = async () =>{
  try {
    if (!localStorage.getItem('token')) window.location.replace('authorization_page.html')
    let response = await fetch(url+'/auth/me', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        
    });
    let res = await response.json()
    if (response.ok){
      if (!res.isAdmin){
        alert('Ты не админ!')
        window.location.replace('authorization_page.html')
      }
    } else { alert('Не удалось авторизоваться')
    window.location.replace('authorization_page.html')}
  } catch (error) {
    alert('Не удалось авторизоваться')
    window.location.replace('authorization_page.html')
  }
}

function check_user_type() {
  var User = document.getElementById("type_usr");
  var Admin = document.getElementById("type_adm");

  if (User.checked == true) {
    Admin.disabled = true;
  } else if (Admin.checked == true) {
    User.disabled = true;
  }
  if (User.checked == false && Admin.checked == false) {
    User.disabled = false;
    Admin.disabled = false;
  }
}


const validate = async (fio, department, pc, User, Admin, login, passWord_fst, passWord_scd) => {

  if (fio == "") {
    alert('Вы не заполнили ФИО');
    return false;
  } else if (department == "") {
    alert('Вы не выбрали отдел');
    return false;
  } else if (pc == "") {
    alert('Вы не выбрали ПК');
    return false;
  } else if (User.checked == false && Admin.checked == false) {
    alert('Вы не выбрали тип пользователя.')
  } else if (/^[a-zA-Z.0-9]+$/.test(login) == false) {
    alert('Логин должен содержать латинские буквы и цифры');
    return false;
  } else if (login.length < 5) {
    alert('Логин должен содержать не менее 6 символов');
    return false;
  } else if (parseInt(login.substr(0, 1))) {
    alert('Логин должен начинаться с буквы');
    return false;
  } else if (/^[a-zA-Z.1-9]\w{5,14}$/.test(passWord_fst) == false) {
    alert('Пароль введен неверно');
    return false;
  } else if (passWord_fst != passWord_scd) {
    alert('Пароли не совпадают');
    return false;
  } else {
    return true;
  }
}

const registrationUser = async() =>{
  let fio = document.getElementById("fio").value;
  let department = document.getElementById("department").value;
  let pc = document.getElementById("pc").value;
  let User = document.getElementById("type_usr");
  let Admin = document.getElementById("type_adm");
  let login = document.getElementById("login").value;
  let passWord_fst = document.getElementById("fst_password").value;
  let passWord_scd = document.getElementById("scd_password").value;

  if (!validate(fio, department, pc, User, Admin, login, passWord_fst, passWord_scd)){
    return
  }
  let body = {
    fio: fio,
    department: department,
    pc: pc,
    login: login,
    isAdmin: !!Admin.checked,
    password: passWord_fst
  }

  try {
    let response = await fetch(url+'/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(body),
    });
    let res = await response.json()
    if (response.ok){
        alert('Пользователь успешно зарегистрирован')
        window.location.replace('admin_page.html')
      }
     else { alert('Не удалось зарегистрированть пользователя')
}
  } catch (error) {
    alert('Не удалось зарегистрированть пользователя')

  }

}

check_Admin()