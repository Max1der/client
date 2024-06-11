const url = 'http://localhost:4444'


 function userType()
 {
  let Slider = document.getElementById("switch_slider");
  let altButton = document.getElementById("registry_button");

  if (Slider.checked == true)
  {
    altButton.style.display = "none";
  } else 
  {
    altButton.style.display = "block";
  }
}


const testLoginAndPass = async(islogin) => {
  let logname = document.getElementById("login").value;
  let passWord = document.getElementById("password").value;
  let Slider = document.getElementById("switch_slider");
  let user = {
    login: logname,
    password: passWord,
    isAdmin: Slider.checked
  }

  try {
    let response = await fetch(url+'/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(user),
    });
    let res = await response.json()
    if (response.ok){

      localStorage.setItem('token',res.token)
      if (islogin && Slider.checked){
        Slider.checked = false
        window.location.replace('admin_page.html')
      } else if (islogin && !Slider.checked){
        window.location.replace('user_page.html')
      } else {
        Slider.checked = false
        window.location.replace('registry_page.html', '_self');
      }

    } else {alert(res.msg)}
  } catch (error) {
    if (error.msg)
      alert(error.msg)
    else alert('Не удалось выполнить запрос')
  }

}
