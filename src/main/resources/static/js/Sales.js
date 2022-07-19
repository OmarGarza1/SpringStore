var glb_inventory;
var glb_users;

// Call the dataTables jQuery plugin
$(document).ready(function() {
    loadInventory();
    loadUsers();
    loadSales();

    $('#salesTable').DataTable();

    updateUserInfo();
});

function updateUserInfo(){
 $('#emailLogged').text(localStorage.email);
}

async function loadSales(){

      const request = await fetch('api/sales', {
        method: 'GET',
        headers: getHeaders(),
       });

       const sales = await request.json();

       console.log(sales);

       $("#salesTable tbody").empty();

       for(let sale of sales){

         var row = $('<tr />', {})
                .appendTo( $("#salesTable tbody"));

           $('<td />', {
                'text': sale.saleId,
                 'id': 'saleId_' + sale.id
            }).appendTo(row);

            $('<td />', {
                 'text': searchProductById(sale.name_product),
                 'id': 'name_' + sale.id
            }).appendTo(row);

            $('<td />', {
                 'text': sale.total_price,
                 'id': 'price_' + sale.id
            }).appendTo(row);

            $('<td />', {
                'text':  dateFormat(new Date(sale.purchase_date), 'yyyy-MM-dd'),
                'id': 'purchaseDate_' + sale.id
            }).appendTo(row);

            $('<td />', {
                 'text': searchUserById(sale.employee_id),
                 'id': 'employee_' + sale.id
            }).appendTo(row);

             // delete button //
                 $('<td />', {
                     'id': 'actionField_' + sale.id
                 }).appendTo(row);
/*
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
*/
            }
             // delete button //

}

async function deleteUser(id){
/*
        if(!confirm('Are you sure you want to disable this user from the system?')){
            return;
        }

       const request = await fetch('api/sales/' + id, {
            method: 'DELETE',
            headers: getHeaders()
           });

    location.reload();
*/
}

function getHeaders(){
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.token
    }
}

async function enableUser(id){
/*
        if(!confirm('Are you sure you want to enable this user in the system?')){
            return;
        }

       const request = await fetch('api/sales/' + id, {
            method: 'PUT',
            headers: getHeaders(),
           });

    location.reload();
*/
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


 async function loadInventory(){

      const request = await fetch('api/inventory', {
        method: 'GET',
        headers: getHeaders(),
       });

       const inventory = await request.json();

       console.log(inventory);

       glb_inventory = inventory;
}


 async function loadUsers(){

      const request = await fetch('api/users', {
        method: 'GET',
        headers: getHeaders(),
       });

       const users = await request.json();

       console.log(users);

       glb_users = users;
}

function searchProductById(productId){

   var products = glb_inventory.filter(function(product) {
            if(product.inventoryId === productId){
                return product.name;
            }
        });
    return products[0].name;
}

function searchUserById(userId){

   var users = glb_users.filter(function(user) {
            if(user.userId === userId){
                return user.name;
            }
        });

    console.log(users);

    return users[0].name;
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
