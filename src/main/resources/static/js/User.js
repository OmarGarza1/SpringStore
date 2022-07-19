// Call the dataTables jQuery plugin
$(document).ready(function() {
    loadUsers();
    $('#usersTable').DataTable();

    updateUserInfo();
});

function updateUserInfo(){
 $('#emailLogged').text(localStorage.email);
}

async function loadUsers(){

      const request = await fetch('api/users', {
        method: 'GET',
        headers: getHeaders(),
       });

       const users = await request.json();

       console.log(users);

       $("#usersTable tbody").empty();

       for(let user of users){

         var row = $('<tr />', {})
                .appendTo( $("#usersTable tbody"));

           $('<td />', {
                'text': user.userId,
                 'id': 'userId_' + user.userId
            }).appendTo(row);

            $('<td />', {
                 'text': user.name,
                 'id': 'name_' + user.userId
            }).appendTo(row);

            $('<td />', {
                 'text': user.email,
                 'id': 'email_' + user.userId
            }).appendTo(row);

            $('<td />', {
                'text': user.phoneNumber,
                'id': 'phone_' + user.userId
             }).appendTo(row);

            $('<td />', {
                 'text': user.position,
                 'id': 'position_' + user.userId
            }).appendTo(row);

             $('<td />', {
                 'text':  dateFormat(new Date(user.startDate), 'yyyy-MM-dd'),
                 'id': 'startDate_' + user.userId
             }).appendTo(row);

            let endDate = dateFormat(new Date(user.endDate), 'yyyy-MM-dd');
             $('<td />', {
                 'text': user.endDate == null ? "TBD": endDate,
                 'id': 'endDate_' + user.userId
             }).appendTo(row);

             $('<td />', {
                 'text': user.userActive ? "Yes" : "No",
                 'id': 'active' + user.userId
            }).appendTo(row);

             // delete button //
                 $('<td />', {
                     'id': 'actionField_' + user.userId
                 }).appendTo(row);

                if(user.userActive){
                     $('<a />', {
                         'id': 'deleteButton_' + user.userId,
                         'href': '#',
                         'class': 'btn btn-danger btn-circle',
                         'onclick': "deleteUser(" + user.userId+ ")"
                     }).appendTo($('#actionField_' + user.userId));

                     $('<i />', {
                         'id': 'deleteButtonImage',
                         'class': 'fas fa-trash'
                     }).appendTo($('#deleteButton_' + user.userId));
                 }else{
                     $('<a />', {
                         'id': 'enableButton_' + user.userId,
                         'href': '#',
                         'class': 'btn btn-success btn-circle',
                         'onclick': "enableUser(" + user.userId+ ")"
                     }).appendTo($('#actionField_' + user.userId));

                     $('<i />', {
                         'id': 'enableButtonImage',
                         'class': 'fas fa-check'
                     }).appendTo($('#enableButton_' + user.userId));

                }

            }
             // delete button //

}

async function deleteUser(id){

        if(!confirm('Are you sure you want to disable this user from the system?')){
            return;
        }

       const request = await fetch('api/users/' + id, {
            method: 'DELETE',
            headers: getHeaders()
           });

    location.reload();

}

function getHeaders(){
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.token
    }
}

async function enableUser(id){

        if(!confirm('Are you sure you want to enable this user in the system?')){
            return;
        }

       const request = await fetch('api/users/' + id, {
            method: 'PUT',
            headers: getHeaders(),
           });

    location.reload();

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
/*
function search() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
 }
    */
