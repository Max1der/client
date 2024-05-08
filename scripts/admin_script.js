const url = 'https://ssa-fo1l.onrender.com'

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
    } else {
      alert('Не удалось авторизоваться')
      window.location.replace('authorization_page.html')
    }
  } catch (error) {
    alert('Не удалось авторизоваться')
    window.location.replace('authorization_page.html')
  }
}

function check_problem_level() {
  var Problem_check1 = document.getElementById("low_level");
  var Problem_check2 = document.getElementById("mid_level");
  var Problem_check3 = document.getElementById("high_level");

  if (Problem_check1.checked == true) {
    Problem_check2.disabled = true;
    Problem_check3.disabled = true;
  } else if (Problem_check2.checked == true) {
    Problem_check1.disabled = true;
    Problem_check3.disabled = true;
  } else if (Problem_check3.checked == true) {
    Problem_check1.disabled = true;
    Problem_check2.disabled = true;
  }
  if (Problem_check1.checked == false && Problem_check2.checked == false && Problem_check3.checked == false) {
    Problem_check1.disabled = false;
    Problem_check2.disabled = false;
    Problem_check3.disabled = false;
  }
}

check_Admin()