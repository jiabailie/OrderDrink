$(document).ready(function (){
    var bookingStatus = localStorage.getItem('bookedTable');
    var tableSelectID = "";
    if(bookingStatus){
        bookingStatus =  JSON.parse(bookingStatus);
    } else{
        bookingStatus = [];
    }

    var circle = $("circle");
    for (var i =0;i<circle.length;i++){
        var tableID = $(circle[i]).attr("id");
        if(bookingStatus.includes(tableID)){
            circle.addClass("booked").removeClass("unbooked");
        }
    }

    $("circle,text").click(function(){
        tableSelectID = $(this).attr("id");
        if(!bookingStatus.includes(tableSelectID)){
            $("#selected-table").text("Do you want to book Table "+tableSelectID+"?");
            $("#confirmButton").removeClass("d-none");
        }else{
            alert("This table is already booked");
        }
    });

    $('#dismiss').click(function(){
        $('#confirmButton').addClass("d-none");
        $("#selected-table").text("Click a Table to book");
    });

    $('#confirm').click(function(){
        bookingStatus.push(tableSelectID);
        localStorage.setItem('bookingInfo', JSON.stringify(bookingStatus));
        $('#selected-table').text("Click a Table to book");
        $('#confirmButton').addClass("d-none");
        $('#'+tableSelectID).addClass("booked").removeClass("table");
    });
    
});