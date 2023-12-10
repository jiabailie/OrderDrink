
function calculatePrice(){
    let selectDrink = document.getElementById('drink').value;
    let selectSizeA = document.getElementsByName('size');
    let price = 0;
    for (let radio of selectSizeA){
        if(radio.checked)
            var selectSize = radio.value;
    }
    switch(selectDrink){
        case 'bubbleMilktea':
            if (selectSize == 'small'){
                price = 20;
            }
            else if (selectSize == 'medium'){
                price = 25;
            }
            else if (selectSize == 'large'){
                price = 30;
            }
            break;
        case 'icedLatte':
            if (selectSize == 'small'){
                price = 25;
            }
            else if (selectSize == 'medium'){
                price = 30;
            }
            else if (selectSize == 'large'){
                price = 35;
            }
            break;
        case 'icedMocha':
            if (selectSize == 'small'){
                price = 30;
            }
            else if (selectSize == 'medium'){
                price = 35;
            }
            else if (selectSize == 'large'){
                price = 40;
            }
            break;
        default:
            for (i=0;i<selectSizeA.length;i++){
                if(selectSizeA[i].checked){
                    selectSizeA[i].checked = false;
                    alert("please select a drink");
                }
            }
            price = 0;
    }
    document.getElementById("price").textContent = price;
}

function validatedForm(){
    let name = document.getElementById('name').value;
    let selectDrink = document.getElementById('drink').value;
    let selectSize = document.getElementsByName('size');
    let selectIce = document.getElementsByName('ice');
    let selectSweetness = document.getElementsByName('sweetness');
    let flagA, flagB, flagC = 0;
    
    for (let radio of selectSize){
        if(radio.checked)
            flagA = 1;
    }
      
    for (let radio of selectIce){
        if(radio.checked)
            flagB = 1;
    }

    for (let radio of selectSweetness){
        if(radio.checked)
            flagC = 1;
    }

    if(name.trim() == ""){
        alert('Please enter name!');
        return false;
    }
    else if(selectDrink == 'none'){
        alert("Please select drink!")
        return false;
    }
    else if(!flagA){
        alert('Please select size!');
        return false;
    }
    else if(!flagB){
        alert('Please select Ice!');
        return false;
    }
    else if(!flagC){
        alert('Please select Sweetness!');
        return false;
    }
    else
        return true;
}

function resetbutton(){
    document.getElementById("price").textContent = '0';
    document.getElementById("priceForm").reset();
}

function placeOrder(event){
    if(!validatedForm()){
        event.preventDefault()
    }
    else{
        let name = document.getElementById('name').value;
        let selectDrink = document.getElementById('drink').value;
        let selectSizeA = document.getElementsByName('size');
        for (let radio of selectSizeA){
            if(radio.checked)
                var selectSize = radio.value;
        }
        let selectIceA = document.getElementsByName('ice');
        for (let radio of selectIceA){
            if(radio.checked)
                var selectIce = radio.value;
        }
        let selectSweetnessA = document.getElementsByName('sweetness');
        for (let radio of selectSweetnessA){
            if(radio.checked)
                var selectSweetness = radio.value;
        }
        let orderData = [name,selectDrink,selectSize,selectIce,selectSweetness];
        localStorage.setItem("orders",orderData);

        $("#alertMessage").removeClass("d-none").addClass("alert > alert-success")
        .html("Order placed successfully! Thank you for your order.").fadeIn(500).delay(3000).fadeOut(500);
        setTimeout( function(){
            resetbutton();
        },3000);

        
    }
}

$(document).ready(function(){
    $("#name").on("input",function(){
        var name = $(this).val().trim();
            if (name=="") {
            $(this).addClass("unavailable").removeClass("available");
        }
        else {
            $(this).addClass("available").removeClass("unavailable");
        }   
    });
});

$(document).ready(function(){
    $("#drink").on("change",function(){
        var drink = $(this).val().trim();
            if (drink=="none") {
            $(this).addClass("unavailable").removeClass("available");
            $("#ImgChange").addClass("d-none");
        }
        else {
            $(this).addClass("available").removeClass("unavailable");
            $("#ImgChange").removeClass("d-none");
            if(drink=="bubbleMilktea"){
                $("#DrinkImg").attr({src:"assets/bubble-milktea.png",alt:"Bubble Milktea"});
            }else if(drink == "icedLatte"){
                $("#DrinkImg").attr({src:"assets/iced-latte.jpg",alt:"Iced Latte"});
            }else{
                $("#DrinkImg").attr({src:"assets/iced-mocha.jpg",alt:"Bubble Milktea"});
            }
        }   
    });
});