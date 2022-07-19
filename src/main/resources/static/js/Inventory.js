// Call the dataTables jQuery plugin
$(document).ready(function() {
    loadInventory();
    $('#inventoryTable').DataTable();

    updateUserInfo();
});

function updateUserInfo(){
 $('#emailLogged').text(localStorage.email);
}

async function loadInventory(){

      const request = await fetch('api/inventory', {
        method: 'GET',
        headers: getHeaders(),
       });

       const inventory = await request.json();

       console.log(inventory);

       $("#inventoryTable tbody").empty();

       for(let product of inventory){

         var row = $('<tr />', {})
                .appendTo( $("#inventoryTable tbody"));

           $('<td />', {
                'text': product.inventoryId,
                 'id': 'inventoryId_' + product.inventoryId
            }).appendTo(row);

            $('<td />', {
                 'text': product.name,
                 'id': 'name_' + product.inventoryId
            }).appendTo(row);

            $('<td />', {
                 'text': product.unit_price,
                 'id': 'unit_price_' + product.inventoryId
            }).appendTo(row);

            $('<td />', {
                'text': product.quantity_in_stock,
                'id': 'quantity_in_stock_' + product.inventoryId
             }).appendTo(row);

            $('<td />', {
                 'text': product.reorder ? 'Yes' : 'No',
                 'id': 'reorder_' + product.inventoryId
            }).appendTo(row);

            $('<td />', {
                 'text': product.reorder_time_days,
                 'id': 'reorder_' + product.inventoryId
            }).appendTo(row);


             $('<td />', {
                 'text': product.reorder_date == null ? "-" : dateFormat(new Date(product.reorder_date), 'yyyy-MM-dd'),
                 'id': 'reorder_date_' + product.inventoryId
             }).appendTo(row);
/*
             $('<td />', {
                 'text': product.userActive ? "Yes" : "No",
                 'id': 'active' + product.inventoryId
            }).appendTo(row);
*/
             // delete button //
                 $('<td />', {
                     'id': 'actionField_' + product.inventoryId
                 }).appendTo(row);

                if(product.active){
                     $('<a />', {
                         'id': 'deleteButton_' + product.inventoryId,
                         'href': '#',
                         'class': 'btn btn-danger btn-circle',
                         'onclick': "disableItem(" + product.inventoryId+ ")"
                     }).appendTo($('#actionField_' + product.inventoryId));

                     $('<i />', {
                         'id': 'deleteButtonImage',
                         'class': 'fas fa-trash'
                     }).appendTo($('#deleteButton_' + product.inventoryId));
                 }else{
                     $('<a />', {
                         'id': 'enableButton_' + product.inventoryId,
                         'href': '#',
                         'class': 'btn btn-success btn-circle',
                         'onclick': "enableItem(" + product.inventoryId+ ")"
                     }).appendTo($('#actionField_' + product.inventoryId));

                     $('<i />', {
                         'id': 'enableButtonImage',
                         'class': 'fas fa-check'
                     }).appendTo($('#enableButton_' + product.inventoryId));
                }

                     $('<a />', {
                            'id': 'requestMoreInventoryButton_' + product.inventoryId,
                            'href': '#',
                            'class': 'btn btn-warning btn-circle',
                            'onclick': "requestMoreInventory(" + product.inventoryId + "," +  product.reorder +")"
                     }).appendTo($('#actionField_' + product.inventoryId));

                     $('<i />', {
                            'id': 'requestMoreInventoryButtonImage',
                            'class': 'fas fa-exclamation-triangle'
                      }).appendTo($('#requestMoreInventoryButton_' + product.inventoryId));



            }
             // delete button //

}

async function disableItem(id){

        if(!confirm('Are you sure you want to disable this item from the system?')){
            return;
        }

       const request = await fetch('api/inventory/' + id, {
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

async function enableItem(id){

        if(!confirm('Are you sure you want to enable this item in the system?')){
            return;
        }

       const request = await fetch('api/inventory/' + id, {
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

async function requestMoreInventory(id, status){
    if(!status){
       if(!confirm('Are you sure you want to order more items from provider?')){
                return;
            }
    }else{
       if(!confirm('Are you sure you want to cancel the order from provider?')){
                return;
       }
    }
       const request = await fetch('api/inventory/reorder/' + id , {
            method: 'PUT',
            headers: getHeaders(),
           });

    location.reload();

}

