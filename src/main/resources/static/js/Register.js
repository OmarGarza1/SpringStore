// Call the dataTables jQuery plugin
$(document).ready(function() {

});


async function registerUser(){

        let repeatPassword = $("#registerRepeatPassword").val();

        let data = {};
        data.name = $("#registerFirstName").val() + " " + $("#registerLastName").val(); ;
        data.email = $("#registerInputEmail").val();
        data.password = $("#registerInputPassword").val();
        data.startDate = dateFormat(new Date(), 'yyyy-MM-dd'),
        data.end_date = null;
        data.phone = $("#registerPhone").val();


        console.log(data.start_date);

         if(repeatPassword != data.password ){
            alert("Passwords are not the same");
            return;
         }


       const request = await fetch('api/users' , {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
               'Content-Type': 'application/json',
            },
              body: JSON.stringify(data)
           });

        $(location).prop('href', 'login.html');
}


function dateFormat(x, y) {
    var z = {
        M: x.getMonth() + 1,
        d: x.getDate(),
        h: x.getHours(),
        m: x.getMinutes(),
        s: x.getSeconds()
    };
    y = y.replace(/(M+|d+|h+|m+|s+)/g, function(v) {
        return ((v.length > 1 ? "0" : "") + z[v.slice(-1)]).slice(-2)
    });

    return y.replace(/(y+)/g, function(v) {
        return x.getFullYear().toString().slice(-v.length)
    });
}