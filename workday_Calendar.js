
// create date string
var date = new Date();
var week_Day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var month = ["Januray", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var date_String = week_Day[date.getDay()] + ", " + month[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();

// prints current date to title div
$("#date").text(date_String);

var input_Array = {};

init();

function render_Events() {
    if (!input_Array) {
        input_Array = {};
    }
    for (i=0; i < 24; i++) {
        $("#input" + i).val(input_Array["input" + i]);
    }
}
function store_Events() {
    localStorage["input_Array"] = JSON.stringify(input_Array);
    render_Events();
}
function init() {

    input_Array = JSON.parse(localStorage.getItem("input_Array"));

    // appends hour labels
    for (i=0; i < 24; i++) {
        var hour_Block = $("<div>").attr("id", "div" + i);
        hour_Block.addClass("hour-block-class");
        $("#hour-block").append(hour_Block);
        // add am labels for i:0-11, pm labels for i:12-23
        if (i < 12) {
            var hour_Div = `<div>${i+1}AM</div>`;
            $(`#div${i}`).append(hour_Div);
        }
        else {
            var hour_Div = `<div>${i-11}PM</div>`;
            $(`#div${i}`).append(hour_Div);        
        }
    }
    // appends forms/ labels for each hour with id's and classes
    var current_Hour = date.getHours();
    for (i=0; i < 24; i++) {
        var input_El = $("<input>").attr("id", "input" + i);
        input_El.addClass("input-el");    

        // add color functionality
        if (i < current_Hour - 1) {
            input_El.addClass("before");
        } else if (i == current_Hour - 1) {
            input_El.addClass("during");
        } else {
            input_El.addClass("after");
        }

        $("#input-block").append(input_El);      
    }
    // append #save-block
    for (i=0; i < 24; i++) {
        var save_Button = $("<button>");
        save_Button.addClass("save-button-class")
        save_Button.attr("id", "save" + i);
        save_Button.text("save");
        $("#save-block").append(save_Button);
    }
    render_Events();
}
// add onclick event to each save button
$(".save-button-class").on("click", function() {
    var pHold = "input" + this.id.substr(4);
    input_Array[pHold] = $(`#${pHold}`).val();
    
    store_Events();        
    event.preventDefault();
})
