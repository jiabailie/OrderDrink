$(document).ready(function(){
    $.get("assets/drink-menu.json",function(data){
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            var card=`
            <div class="col mt-2 mb-2 " >
                <div class="card " id="${item.name}">
                    <img width="200" height="400" src="${item.image}" alt="item.name" class="card-img-top ">
                    
                    <div class="card-body">
                        <h4 class="card-title fw-medium">${item.name}</h4>
                        <div class="text-left">
                            <p  class=" badge  bg-success text-wrap fs-6">${item.type}</p>
                        </div>
                        <p class="card-sm-text">${item.price}</p>
                    </div>
                </div>
            </div>
            `
            console.log(data);
            $("#menu").append(card)
        }
    }).fail(function (error){
        var errorMessage =`
        <div class = "alert alert-danger text-danger">
           Failed to fetch drink menu. Please try again later.
        </div>
        `
        $("#error-message").html(errorMessage)
    });
});