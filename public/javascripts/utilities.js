// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
        fetch('http://localhost:3000/deleteTask/'+i, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (res) {
            // document.location.reload(true);
        });
    }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function (ev) {
    let val = ev.target.textContent;
    if (ev.target.tagName === 'LI') {
        var options = {
            name: (val.slice(0, val.length-1)).toString()
        };
        fetch('http://localhost:3000/updateTask', {
            method: 'PUT',
            body: JSON.stringify(options),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (res) {
            document.location.reload(true);
        });
    }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("myInput").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') {
        alert("You must write something!");
    } else {
        var options = {
            name: inputValue,
            status: "In-Progress"
        };

        fetch('http://localhost:3000/addTask', {
            method: 'POST',
            body: JSON.stringify(options),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (res) {
            document.location.reload(true);
        });
       
    }
}