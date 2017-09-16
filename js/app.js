var myform = document.getElementById("myform");
//myform.addEventListener("submit", saveInfo);
window.addEventListener("load", showTodoItems);
var saveBtn = document.getElementById("submit");
saveBtn.addEventListener("click",saveInfo);
var cancelBtn  =document.getElementById("cancel");
cancelBtn.addEventListener("click",clearForm)
function clearForm(e){
    myform.reset();
}
function saveInfo(e) {
    e.preventDefault();
    var todoValue = document.getElementById("textarea").value;
    var todoObj = {
        todoValue
    }
    if(!(todoValue)){
        myform.reset();
        return false;
    }
    if (localStorage.getItem("localTodoItem") === null) {
        var todoArray = [];
        todoArray.push(todoObj);
        localStorage.setItem("localTodoItem", JSON.stringify(todoArray));
    } else {
        var todoArray = JSON.parse(localStorage.getItem("localTodoItem"));
        todoArray.push(todoObj);
        localStorage.setItem("localTodoItem", JSON.stringify(todoArray));
    }
    showTodoItems();
    myform.reset();
}

function deleteTodoItem(content) {
    var todoArray = JSON.parse(localStorage.getItem("localTodoItem"));
    for (var i = 0; i < todoArray.length; i++) {
        if (todoArray[i].todoValue == content) {
            todoArray.splice(i, 1);
        }
        localStorage.setItem("localTodoItem", JSON.stringify(todoArray));
        showTodoItems();
    }
}

function showTodoItems() {
    var todoArray = JSON.parse(localStorage.getItem("localTodoItem"));
    var result = document.getElementById("showcontent");
    result.innerHTML = "";
    if (todoArray !== null) {
        for (let i = 0; i < todoArray.length; i++) {
            var content = todoArray[i].todoValue;
            result.innerHTML += "<div class='well'>" + content + "<a class='btn btn-danger del' onclick ='deleteTodoItem( \"" + content + "\")'>" + "x" + "</a>" + "</div>";
        }
    }
}
