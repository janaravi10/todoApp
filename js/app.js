var myApp = (function (n) {
    var myform = document.getElementById("myform"),
        saveBtn = document.getElementById("submit"),
        cancelBtn = document.getElementById("cancel");
    var clearForm = function (e) {
        myform.reset();
    };
    var deleteTodoItem = function (content) {
        var todoArray = JSON.parse(localStorage.getItem("localTodoItem"));
        for (var i = 0; i < todoArray.length; i++) {
            if (todoArray[i].todoValue == content) {
                todoArray.splice(i, 1);
            };
            localStorage.setItem("localTodoItem", JSON.stringify(todoArray));
            showTodoItems();
        };
    };
    var showTodoItems = function () {
        var todoArray = JSON.parse(localStorage.getItem("localTodoItem"));
        var result = document.getElementById("showcontent");
        result.innerHTML = "";
        if (todoArray !== null) {
            for (let i = 0; i < todoArray.length; i++) {
                var content = todoArray[i].todoValue;
                var dl = todoArray[i].dateValue;
                if (dl <= 12) {
                    ampm = " AM";
                } else {
                    ampm = " PM"
                }
                dl = dl % 12 || 12;
                result.innerHTML += "<div class='well'>" + "<p>" + content + "</p>" + "<a class='dl'>" + '<span>Last hour to complete :</span>' + dl + ampm + "</a>" + "<a class='btn btn-danger del' onclick ='myApp.deleteTodoItem( \"" + content + "\")'>" + "x" + "</a>" + "</div>";
            };
        };
    };

    var saveInfo = function saveInfo(e) {
        e.preventDefault();
        var dateValue = document.getElementById("inputdeadline").value;
        var todoValue = document.getElementById("textarea").value;
        todoValue = todoValue.replace(/\n/g, "   ");
        if (dateValue > 24 || dateValue <= 0) {
            myform.reset();
            return false;
        };
        if (!(todoValue)) {
            myform.reset();
            return false;
        };
        var todoObj = {
            todoValue,
            dateValue
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
    window.addEventListener("load", showTodoItems);
    cancelBtn.addEventListener("click", clearForm);
    saveBtn.addEventListener("click", saveInfo);
    //method for public
    n.saveInfo = saveInfo;
    n.showTodoItems = showTodoItems;
    n.deleteTodoItem = deleteTodoItem;
    return n;

})({});
