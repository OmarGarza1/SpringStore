// Call the dataTables jQuery plugin
$(document).ready(function() {

});


async function login(){

        let repeatPassword = $("#registerRepeatPassword").val();

        let data = {};
        data.email = $("#loginInputEmail").val();
        data.password = $("#loginInputPassword").val();

       const request = await fetch('api/login' , {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
               'Content-Type': 'application/json',
            },
              body: JSON.stringify(data)
           });

    const response = await request.text();

    if(response != "FAIL"){
        localStorage.token = response;
        localStorage.email = data.email;
        $(location).prop('href', 'users.html');
    }else{
        alert("Invalid credentials");
    }

}
