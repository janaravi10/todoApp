var myform = document.getElementById("myform"),
saveBtn = document.getElementById("submit"),
cancelBtn = document.getElementById("cancel");
saveBtn.addEventListener("click", saveInfo);
window.addEventListener("load", showTodoItems);
cancelBtn.addEventListener("click", clearForm);
function clearForm(e) {
    myform.reset();
};

function saveInfo(e) {
    e.preventDefault();
    var dateValue = document.getElementById("inputdeadline").value;
    var todoValue = document.getElementById("textarea").value;
    todoValue = todoValue.replace(/\n/g,"   ");
    if ( dateValue > 24 || dateValue <= 0) {
        myform.reset();
        return false;
    };
    var todoObj = {
        todoValue,
        dateValue
    };
    if (!(todoValue)) {
        myform.reset();
        return false;
    };
    
    if (localStorage.getItem("localTodoItem") === null) {
        var todoArray = [];
        todoArray.push(todoObj);
        todoArray.sort(function (a, b) {
            return a.dateValue - b.dateValue;
        });
        localStorage.setItem("localTodoItem", JSON.stringify(todoArray));
    } else {
        var todoArray = JSON.parse(localStorage.getItem("localTodoItem"));
        todoArray.push(todoObj);
        todoArray.sort(function (a, b) {
            return a.dateValue - b.dateValue;
        });
        localStorage.setItem("localTodoItem", JSON.stringify(todoArray));
    };
    showTodoItems();
    myform.reset();
};

function deleteTodoItem(content) {
    var todoArray = JSON.parse(localStorage.getItem("localTodoItem"));
    for (var i = 0; i < todoArray.length; i++) {
        if (todoArray[i].todoValue == content) {
            todoArray.splice(i, 1);
        };
        localStorage.setItem("localTodoItem", JSON.stringify(todoArray));
        showTodoItems();
    };
};
function showTodoItems() {
    var todoArray = JSON.parse(localStorage.getItem("localTodoItem"));
    var result = document.getElementById("showcontent");
    result.innerHTML = "";
    if (todoArray !== null) {
        for (let i = 0; i < todoArray.length; i++) {
            var content = todoArray[i].todoValue;
            var dl = todoArray[i].dateValue;
          if(dl<=12){
                ampm = " AM";
            }else{
                ampm = " PM"
            }
           dl =  dl % 12 || 12;
            result.innerHTML += "<div class='well'>" +"<p>"+ content +"</p>"+ "<a class='dl'>" + '<span>Last hour to complete :</span>' + dl + ampm + "</a>" + "<a class='btn btn-danger del' onclick ='deleteTodoItem( \"" + content + "\")'>" + "x" + "</a>" + "</div>";
        };
    };
};
