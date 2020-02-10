var mainForm = document.getElementById('mainForm');
var mainFormSubmit = document.getElementById('mainFormSubmit');
var table = document.getElementById('table');
var titleFilter = document.getElementById('titleFilter');
var saveEditButtons = document.getElementsByClassName('save-edit-button');
var openOnlyshow = document.getElementById('openOnlyshow');
var favoriteOnlyshow = document.getElementById('favoriteOnlyshow');
this.data = null;

var getData = function(){
    obj = { "table":"data"};
    dbParam = JSON.stringify(obj);
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let arr = this.responseText.split('<br />')
        window.data = arr[arr.length-1];
      }
    };
    xmlhttp.open("GET", "./read.php?x=" + dbParam, true);
    xmlhttp.send();
}


var addNewPlace = function(title, description, latitude, longitude, opening_hours, closing_hours) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        const serverResponse = document.getElementById('serverResponse');
        serverResponse.innerHTML = this.responseText;
    }

    xhr.open("POST", "./process.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("title="+title+"&action=send&description="+description+"&latitude="+latitude+"&longitude="+longitude+"&opening_hours="+opening_hours+"&closing_hours="+closing_hours+"&picked=0");
}

var removePlace = function(id, action) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        const serverResponse = document.getElementById('serverResponse');
        serverResponse.innerHTML = this.responseText;
    }

    xhr.open("POST", "./process.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("id=" + id +"&action=" + action);    
}

var editPlace = function(id, action, title, description, latitude, longitude, opening_hours, closing_hours, picked) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        const serverResponse = document.getElementById('serverResponse');
        serverResponse.innerHTML = this.responseText;
    }

    xhr.open("POST", "./process.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("id=" + id + "&action=" + action + "&title=" + title + "&description=" + description + "&latitude=" + latitude + "&longitude=" + longitude + "&opening_hours=" + opening_hours + "&closing_hours=" + closing_hours + "&picked=" + picked);    
}

function addRowHandlers() {
    var rows = table.getElementsByTagName("tr");
    var inputs = table.getElementsByTagName('input');
    for (input of inputs) {
        input.addEventListener('click', function(event){
            event.stopPropagation();
        })       
        input.addEventListener('keyup', function(event){
            console.log(input + ' ' + event + ' changed');
        }) 
    }
    for (i = 0; i < rows.length; i++) {
      var currentRow = table.rows[i];
      
      var createClickHandler = function(row) {
        return function() {
          var idCell = row.getElementsByClassName("id")[0];
          var id = idCell.innerHTML;
          var titleCell = row.getElementsByClassName("title")[0];
          var title = titleCell.innerHTML;
          var descriptionCell = row.getElementsByClassName("description")[0];
          var description = descriptionCell.innerHTML;
          this.classList.toggle("active-mode")
          console.log("id: " + id + " title: " + title + " description: " + description + ' this ' + this);
          var actionsCell = row.getElementsByClassName("actions")[0];
          var actionBtns = actionsCell.getElementsByClassName('actions-buttons')[0];
          var editBtns = actionBtns.children;
          for(let elem of editBtns) {
            elem.addEventListener("click", function(event){
                if (elem !== event.target) return;
                event.stopImmediatePropagation();
                if(elem.text === 'delete') {
                    removePlace(id, elem.text);
                    row.parentNode.removeChild(row);
                } else if (elem.text === 'edit') {
                    var name, arr;
                    name = "edit-mode";
                    arr = row.className.split(" ");
                    if (arr.indexOf(name) == -1) {
                        row.className += " " + name;
                    }

                    
                    let inputs = row.getElementsByTagName('input'),
                        editButton = row.getElementsByClassName('edit-button')[0],
                        saveEditButton = row.getElementsByClassName('save-edit-button')[0],
                        clsName, classNamesArr;
                        
                    for(let input of inputs) {
                        ['keyup','change'].forEach( evt => 
                            input.addEventListener(evt, function(){
                                if(this.value !== this.parentElement.parentElement.getElementsByTagName('div')[0].innerText ||
                                    (this.checked && this.parentElement.parentElement.innerText === 'no') ||
                                    (!this.checked && this.parentElement.parentElement.innerText === 'yes')) {
                                    clsName = "hidden";
                                    classNamesArr = editButton.className.split(" ");
                                    if (classNamesArr.indexOf(clsName) === -1) {
                                        editButton.className.length === 0 ? editButton.className += clsName : editButton.className += " " + clsName;
                                    }
                                    classNamesArr = saveEditButton.className.split(" ");
                                    if (classNamesArr.indexOf(clsName) !== -1) {
                                        saveEditButton.className = saveEditButton.className.replace(clsName, '');
                                    }
                                } else {
                                    let parentRow = this.closest('tr');
                                    let arrOfFields = parentRow.getElementsByTagName('input');
                                    let flag = true;
                                    for(let item of arrOfFields){
                                        console.log(item.value == item.parentElement.parentElement.innerText);
                                        if(item.value == item.parentElement.parentElement.innerText ||
                                          (!item.checked && item.parentElement.parentElement.innerText === 'no') ||
                                          (item.checked && item.parentElement.parentElement.innerText === 'yes')){
                                            flag = true;
                                        } else {
                                            flag = false;
                                            return;
                                        }
                                    }
                                    if(flag) {
                                        clsName = "hidden";
                                        classNamesArr = saveEditButton.className.split(" ");
                                        if (classNamesArr.indexOf(clsName) === -1) {
                                            saveEditButton.className.length === 0 ? saveEditButton.className += clsName : saveEditButton.className += " " + clsName;
                                        }
                                        classNamesArr = editButton.className.split(" ");
                                        if (classNamesArr.indexOf(clsName) !== -1) {
                                            editButton.className = editButton.className.replace(clsName, '');
                                        }
                                    }                                
                                }
                            }, false)
                        );
                    }
                }               
              
              }, false);
          }
        };
    };
      
    currentRow.onclick = createClickHandler(currentRow);
    }
}

window.onload = addRowHandlers();
window.onload = getData();

mainFormSubmit.addEventListener('click', function(event) {
    let inputArr = this.parentElement.getElementsByTagName('input'), valueArr = [];
    for(let input of inputArr) {
        valueArr.push(input.value);
    }  
    addNewPlace(valueArr[0], valueArr[1], valueArr[2], valueArr[3], valueArr[4], valueArr[5])   
}, false)


for(saveEditButton of saveEditButtons) {
    saveEditButton.addEventListener("click", function(event){
        let valuesArr = [];
        let row = this.closest('tr');
        let id = row.getElementsByClassName('id')[0].innerText;
        let inputs = row.getElementsByTagName('input')
            for(let input of inputs) {
                valuesArr.push(input.value !== 'on' ? input.value : input.checked);
            }
        editPlace(id, 'edit', valuesArr[0], valuesArr[1], valuesArr[2], valuesArr[3], valuesArr[4], valuesArr[5], valuesArr[6]===true ? 1 : 0);
    }, false)
}

titleFilter.addEventListener('keyup', function(event) {
    let table = document.getElementById('table');
    var arr = table.getElementsByClassName('title');
    var val = titleFilter.value.toLowerCase();
    for(let elem of arr) {
        var clsName, classNamesArr;
            clsName = "filtered-hidden";
            classNamesArr = elem.parentElement.className.split(" ");
            elemText = elem.innerText.toLowerCase();
            inputText = elem.getElementsByTagName('input')[0].value.toLocaleLowerCase();
        if(titleFilter.value === '' || (elemText.indexOf(val) !== -1 || inputText.indexOf(val) !== -1)) {
            if (classNamesArr.indexOf(clsName) !== -1) {
                elem.parentElement.className = elem.parentElement.className.replace(clsName, '');
            }
        } else {            
            if (classNamesArr.indexOf(clsName) === -1) {
                elem.parentElement.className.length === 0 ? elem.parentElement.className += clsName : elem.parentElement.className += " " + clsName;
            }
        }
    }
}, false);

openOnlyshow.addEventListener('change', function() {
    table = document.getElementById('table');
    let tbody = table.getElementsByTagName('tbody')[0];
    let arrayOfRows = tbody.getElementsByTagName('tr');
    let clsName = "notopen-hidden";
    let d = new Date();
    let h = d.getHours();
    let m = d.getMinutes();    
    for(row of arrayOfRows) {
        let classNamesArr = row.className.split(" ");
        if (this.checked ) {
            let closingTime = row.getElementsByClassName('closing-hours-viewmode')[0].innerText;
            let arr = closingTime.split(':');
            let closingTimeHoursMins = arr[0] + '.' + arr[1];
            let currentTimeHoursMins = h + '.' + m;
            if(closingTimeHoursMins < currentTimeHoursMins) {
                if (classNamesArr.indexOf(clsName) === -1) {
                    row.className.length === 0 ? row.className += clsName : row.className += " " + clsName;
                }
            }            
        } else {
            if (classNamesArr.indexOf(clsName) !== -1) {
                row.className = row.className.replace(clsName, '');
            }
        }
    }
}, false);

favoriteOnlyshow.addEventListener('change', function(){
    table = document.getElementById('table');
    console.log(table);
    let tbody = table.getElementsByTagName('tbody')[0];
    let arrayOfRows = tbody.getElementsByTagName('tr');
    let clsName = "notfavorite-hidden";  
    for(row of arrayOfRows) {
        let classNamesArr = row.className.split(" ");
        if (this.checked ) {
            if(row.getElementsByClassName('favorite-viewmode')[0].innerText == 'no') {
                if (classNamesArr.indexOf(clsName) === -1) {
                    row.className.length === 0 ? row.className += clsName : row.className += " " + clsName;
                }
            }            
        } else {
            if (classNamesArr.indexOf(clsName) !== -1) {
                row.className = row.className.replace(clsName, '');
            }
        }
    }
}, false);

mainForm.onclick = function() {
    return false;
}

