var mainForm = document.getElementById('mainForm');
var mainFormSubmit = document.getElementById('mainFormSubmit');
var table = document.getElementById('table');
var titleFilter = document.getElementById('titleFilter');
var openOnlyshow = document.getElementById('openOnlyshow');
var favoriteOnlyshow = document.getElementById('favoriteOnlyshow');
this.data = null;
var _this = this;

 function getData(){
    obj = { "table":"data"};
    dbParam = JSON.stringify(obj);
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let arr = this.responseText.split('<br />');
        window.data = JSON.parse(arr[arr.length-1]);
        if(window.data && window.data.length) window.showListOnMap(window.data);
      }
    };
    xmlhttp.open("GET", "./read.php?x=" + dbParam, true);
    xmlhttp.send();
}


function addNewPlace(title, description, latitude, longitude, opening_hours, closing_hours) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        const serverResponse = document.getElementById('serverResponse');
        serverResponse.innerHTML = this.responseText;
    }

    xhr.open("POST", "./process.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("title="+title+"&action=send&description="+description+"&latitude="+latitude+"&longitude="+longitude+"&opening_hours="+opening_hours+"&closing_hours="+closing_hours+"&picked=0");
 }

function addRow() {
    obj = { "table":"data"};
    dbParam = JSON.stringify(obj);
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let arr = this.responseText.split('<br />');
        window.data = JSON.parse(arr[arr.length-1]);
        let newData = window.data[window.data.length - 1];
        let table = document.getElementById('table');
        let tbody = table.getElementsByTagName('tbody')[0];
    
        var tr = document.createElement('tr');
        var tdId = document.createElement('td');
        tdId.className = 'id';
        tdId.innerText = newData['id'];
        tr.appendChild(tdId);
    
        var tdTitle = document.createElement('td');
        tdTitle.className = 'title';
        var divTitleViewmode = document.createElement('div');
        divTitleViewmode.className = 'title-viewmode';
        divTitleViewmode.innerText = newData['title'];
        tdTitle.appendChild(divTitleViewmode);
        var divTitleEditmode = document.createElement('div');
        divTitleEditmode.className = 'title-editmode';
        var inputTitleEditmode = document.createElement('input');
        inputTitleEditmode.value = newData['title'];
        divTitleEditmode.appendChild(inputTitleEditmode);
        tdTitle.appendChild(divTitleEditmode);
        tr.appendChild(tdTitle);
    
        var tdDescription = document.createElement('td');
        tdDescription.className = 'description';
        var divDescriptionViewmode = document.createElement('div');
        divDescriptionViewmode.className = 'description-viewmode';
        divDescriptionViewmode.innerText = newData['description'];
        tdDescription.appendChild(divDescriptionViewmode);
        var divDescriptionEditmode = document.createElement('div');
        divDescriptionEditmode.className = 'description-editmode';
        var inputDescriptionEditmode = document.createElement('input');
        inputDescriptionEditmode.value = newData['description'];
        divDescriptionEditmode.appendChild(inputDescriptionEditmode);
        tdDescription.appendChild(divDescriptionEditmode);
        tr.appendChild(tdDescription);
    
        var tdLatitude = document.createElement('td');
        tdLatitude.className = 'latitude';
        var divLatitudeViewmode = document.createElement('div');
        divLatitudeViewmode.className = 'latitude-viewmode';
        divLatitudeViewmode.innerText = parseFloat(newData['latitude']);
        tdLatitude.appendChild(divLatitudeViewmode);
        var divLatitudeEditmode = document.createElement('div');
        divLatitudeEditmode.className = 'latitude-editmode';
        var inputLatitudeEditmode = document.createElement('input');
        inputLatitudeEditmode.value = newData['latitude'];
        divLatitudeEditmode.appendChild(inputLatitudeEditmode);
        tdLatitude.appendChild(divLatitudeEditmode);
        tr.appendChild(tdLatitude);
    
        var tdLongitude = document.createElement('td');
        tdLongitude.className = 'longitude';
        var divLongitudeViewmode = document.createElement('div');
        divLongitudeViewmode.className = 'longitude-viewmode';
        divLongitudeViewmode.innerText = parseFloat(newData['longitude']);
        tdLongitude.appendChild(divLongitudeViewmode);
        var divLongitudeEditmode = document.createElement('div');
        divLongitudeEditmode.className = 'longitude-editmode';
        var inputLongitudeEditmode = document.createElement('input');
        inputLongitudeEditmode.value = newData['longitude'];
        divLongitudeEditmode.appendChild(inputLongitudeEditmode);
        tdLongitude.appendChild(divLongitudeEditmode);
        tr.appendChild(tdLongitude);
    
        var tdOpeningHours = document.createElement('td');
        tdOpeningHours.className = 'opening-hours';
        var divOpeningHours = document.createElement('div');
        divOpeningHours.className = 'opening-hours-viewmode';
        divOpeningHours.innerText = newData['opening_hours'];
        tdOpeningHours.appendChild(divOpeningHours);
        var divOpeningHoursEditmode = document.createElement('div');
        divOpeningHoursEditmode.className = 'opening-hours-editmode';
        var inputOpeningHoursEditmode = document.createElement('input');
        inputOpeningHoursEditmode.value = newData['opening_hours'];
        divOpeningHoursEditmode.appendChild(inputOpeningHoursEditmode);
        tdOpeningHours.appendChild(divOpeningHoursEditmode);
        tr.appendChild(tdOpeningHours);
    
        var tdClosingHours = document.createElement('td');
        tdClosingHours.className = 'closing-hours';
        var divClosingHours = document.createElement('div');
        divClosingHours.className = 'closing-hours-viewmode';
        divClosingHours.innerText = newData['closing_hours'];
        tdClosingHours.appendChild(divClosingHours);
        var divClosingHoursEditmode = document.createElement('div');
        divClosingHoursEditmode.className = 'closing-hours-editmode';
        var inputClosingHoursEditmode = document.createElement('input');
        inputClosingHoursEditmode.value = newData['closing_hours'];
        divClosingHoursEditmode.appendChild(inputClosingHoursEditmode);
        tdClosingHours.appendChild(divClosingHoursEditmode);
        tr.appendChild(tdClosingHours);
    
        var tdFavorite = document.createElement('td');
        tdFavorite.className = 'favorite';
        var divFavorite = document.createElement('div');
        divFavorite.className = 'favorite-viewmode';
        divFavorite.innerText = newData['picked'] == 0 ? 'no' : 'yes';
        tdFavorite.appendChild(divFavorite);
        var divFavoriteEditmode = document.createElement('div');
        divFavoriteEditmode.className = 'favorite-editmode';
        var inputFavoriteEditmode = document.createElement('input');
        inputFavoriteEditmode.setAttribute('type', 'checkbox');
        inputFavoriteEditmode.className = 'set-favorite';
        inputFavoriteEditmode.checked = newData['picked'] == 1 ? true : false;
        divFavoriteEditmode.appendChild(inputFavoriteEditmode);
        tdFavorite.appendChild(divFavoriteEditmode);
        tr.appendChild(tdFavorite);
    
        var tdActions = document.createElement('td');
        tdActions.className = 'actions';
        var divActionsBlock = document.createElement('div');
        divActionsBlock.className = 'actions-block';
        tdActions.appendChild(divActionsBlock);
        var divActionsButtons = document.createElement('div');
        divActionsButtons.className = 'actions-buttons';
        var editButton = document.createElement('a');
        editButton.className = 'edit-button';
        editButton.href = 'javascript:void(0)';
        editButton.setAttribute('data-id', newData['id']);
        editButton.innerText = 'edit';
        divActionsButtons.appendChild(editButton);
        var saveEditButton = document.createElement('a');
        saveEditButton.className = 'save-edit-button hidden';
        saveEditButton.href = 'javascript:void(0)';
        saveEditButton.setAttribute('data-id', newData['id']);
        saveEditButton.innerText = 'save';
        divActionsButtons.appendChild(saveEditButton);
        var deleteButton = document.createElement('a');
        deleteButton.className = 'delete-button';
        deleteButton.href = 'javascript:void(0)';
        deleteButton.setAttribute('data-id', newData['id']);
        deleteButton.innerText = 'delete';
        divActionsButtons.appendChild(deleteButton);
        tdActions.appendChild(divActionsButtons);
        tr.appendChild(tdActions);
        tbody.appendChild(tr);
        addRowHandlers();
        showPinsOnPam();
        var form = document.getElementById('mainForm');
        var formInputs = form.getElementsByTagName('input');
        for(let input of formInputs) {
            input.value = '';
        }
      }
    };
    xmlhttp.open("GET", "./read.php?x=" + dbParam, true);
    xmlhttp.send();
}

function removePlace(id, action) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        const serverResponse = document.getElementById('serverResponse');
        serverResponse.innerHTML = this.responseText;
    }

    xhr.open("POST", "./process.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("id=" + id +"&action=" + action);    

    for(var i = 0; i < _this.data.length; i++) {
        if(_this.data[i]['id'] == id) {
            _this.data.splice(i, 1);
        }
    }
    showPinsOnPam();
}

function editPlace(id, action, title, description, latitude, longitude, opening_hours, closing_hours, picked) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        const serverResponse = document.getElementById('serverResponse');
        serverResponse.innerHTML = this.responseText;
    }

    xhr.open("POST", "./process.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("id=" + id + "&action=" + action + "&title=" + title + "&description=" + description + "&latitude=" + latitude + "&longitude=" + longitude + "&opening_hours=" + opening_hours + "&closing_hours=" + closing_hours + "&picked=" + picked);
    
    let table = document.getElementById('table');
    let tbody = table.getElementsByTagName('tbody')[0];
    let tr, rows = tbody.getElementsByTagName('tr');
    for(let row of rows) {
        if(row.getElementsByClassName('id')[0].innerText == id) {
            tr = row;
            break;
        }
    }
    for(let obj of this.data) {
        if(obj['id'] == id) {
            obj['title'] = title;
            obj['description'] = description;
            obj['latitude'] = latitude;
            obj['longitude'] = longitude;
            obj['opening_hours'] = opening_hours;
            obj['closing_hours'] = closing_hours;
            obj['picked'] = picked;
        }
    }
    var tdTitle = tr.getElementsByClassName('title')[0];
    tdTitle.getElementsByClassName('title-viewmode')[0].innerText = title;
    tdTitle.getElementsByClassName('title-editmode')[0].getElementsByTagName('input')[0].value = title;
    var tdDescription = tr.getElementsByClassName('description')[0];
    tdDescription.getElementsByClassName('description-viewmode')[0].innerText = description;
    tdDescription.getElementsByClassName('description-editmode')[0].getElementsByTagName('input')[0].value = description;
    var tdLatitude = tr.getElementsByClassName('latitude')[0];
    tdLatitude.getElementsByClassName('latitude-viewmode')[0].innerText = latitude;
    tdLatitude.getElementsByClassName('latitude-editmode')[0].getElementsByTagName('input')[0].value = latitude;
    var tdLongitude = tr.getElementsByClassName('longitude')[0];
    tdLongitude.getElementsByClassName('longitude-viewmode')[0].innerText = longitude;
    tdLongitude.getElementsByClassName('longitude-editmode')[0].getElementsByTagName('input')[0].value = longitude;
    var tdOpeningHours = tr.getElementsByClassName('opening-hours')[0];
    tdOpeningHours.getElementsByClassName('opening-hours-viewmode')[0].innerText = opening_hours;
    tdOpeningHours.getElementsByClassName('opening-hours-editmode')[0].getElementsByTagName('input')[0].value = opening_hours;
    var tdClosingHours = tr.getElementsByClassName('closing-hours')[0];
    tdClosingHours.getElementsByClassName('closing-hours-viewmode')[0].innerText = closing_hours;
    tdClosingHours.getElementsByClassName('closing-hours-editmode')[0].getElementsByTagName('input')[0].value = closing_hours;
    var tdFavorite = tr.getElementsByClassName('favorite')[0];
    tdFavorite.getElementsByClassName('favorite-viewmode')[0].innerText = picked === 1 ? 'yes' : 'no';
    tdFavorite.getElementsByClassName('favorite-editmode')[0].getElementsByTagName('input')[0].checked = picked === 1 ? true : false;
    var tdActionButtons = tr.getElementsByClassName('actions')[0].getElementsByClassName('actions-buttons')[0];
    var actionButton = tdActionButtons.getElementsByClassName('edit-button')[0];
    var saveEditButton = tdActionButtons.getElementsByClassName('save-edit-button')[0];
    removeCssClass(tr, "edit-mode");
    removeCssClass(actionButton, "hidden");
    addCssClass(saveEditButton, "hidden");
    showPinsOnPam();
}

function removeCssClass(elem, nameOfClass){
    var arr = elem.className.split(" ");
    if (arr.indexOf(nameOfClass) !== -1) {
        elem.className = elem.className.replace(nameOfClass, '');
    }
}
function addCssClass(elem, nameOfClass){
    var arr = elem.className.split(" ");
    if (arr.indexOf(nameOfClass) === -1) {
        elem.className.length === 0 ? elem.className += nameOfClass : elem.className += ' '+ nameOfClass;
    }
}

function addRowHandlers() {
    var rows = table.getElementsByTagName("tr");
    var inputs = table.getElementsByTagName('input');
    for (input of inputs) {
        input.addEventListener('click', function(event){
            event.stopPropagation();
        })
    }
    for (i = 0; i < rows.length; i++) {
      var currentRow = table.rows[i];
      
      var createClickHandler = function(row) {
        return function() {
          var idCell = row.getElementsByClassName("id")[0];
          var id = idCell.innerHTML;
          this.classList.toggle("active-mode");
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
                    addCssClass(row, 'edit-mode');                    
                    let inputs = row.getElementsByTagName('input');
                        
                    for(let input of inputs) {
                        ['keyup','change'].forEach( evt => 
                            input.addEventListener(evt, function(){
                                let editButton = row.getElementsByClassName('edit-button')[0],
                                saveEditButton = row.getElementsByClassName('save-edit-button')[0];
                                if(this.value !== this.parentElement.parentElement.getElementsByTagName('div')[0].innerText ||
                                    (this.checked && this.parentElement.parentElement.innerText === 'no') ||
                                    (!this.checked && this.parentElement.parentElement.innerText === 'yes')) {
                                    addCssClass(editButton, 'hidden');
                                    removeCssClass(saveEditButton, 'hidden');    
                                } else {
                                    let parentRow = this.closest('tr');
                                    let arrOfFields = parentRow.getElementsByTagName('input');
                                    let flag = true;
                                    for(let item of arrOfFields){
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
                                        removeCssClass(editButton, 'hidden'); 
                                        addCssClass(saveEditButton, 'hidden');
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

    let saveEditButtons = document.getElementsByClassName('save-edit-button');
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
      
    currentRow.onclick = createClickHandler(currentRow);
    }
}

function showPinsOnPam() {
    var arr = [];
    var arr1 = _this.arrOfFilteredByTitleIds ? _this.arrOfFilteredByTitleIds : [];
    var arr2 = _this.arrOfFilteredOpenOnlyIds ? _this.arrOfFilteredOpenOnlyIds : [];
    var arr3 = _this.arrOfFilteredFavoriteIds ? _this.arrOfFilteredFavoriteIds : [];
    var result = null;
    if(arr1.length !== 0 && arr2.length !== 0 && arr3.length !== 0) {
        var arrays = [];
        arrays.push(arr1);
        arrays.push(arr2);
        arrays.push(arr3);
        result = arrays.shift().filter(function(v) {
            return arrays.every(function(a) {
                return a.indexOf(v) !== -1;
            });
        });
    } else if(arr1.length !== 0 && arr2.length !== 0 && arr3.length === 0) {
        result = arr1.filter(element => arr2.includes(element));
    } else if(arr1.length === 0 && arr2.length !== 0 && arr3.length !== 0) {
        result = arr2.filter(element => arr3.includes(element));
    } else if(arr1.length !== 0 && arr2.length === 0 && arr3.length !== 0) {
        result = arr1.filter(element => arr3.includes(element));
    } else if (arr1.length !== 0 && arr2.length === 0 && arr3.length === 0) {
        result = arr1;
    } else if(arr1.length === 0 && arr2.length !== 0 && arr3.length === 0) {
        result = arr2;
    } else if (arr1.length === 0 && arr2.length === 0 && arr3.length !== 0) {
        result = arr3;
    } else {
        result = 'all';
    }

    if(result === 'all') {
        window.showListOnMap(_this.data);
    } else {
        for(let obj of _this.data) {
            if(result.indexOf(parseInt(obj['id'])) > -1) {
                arr.push(obj);
            }
        }
        window.showListOnMap(arr);
    } 
}

mainFormSubmit.addEventListener('click', function(event) {
    let inputArr = this.parentElement.getElementsByTagName('input'), valueArr = [];
    for(let input of inputArr) {
        valueArr.push(input.value);
    }  
    addNewPlace(valueArr[0], valueArr[1], valueArr[2], valueArr[3], valueArr[4], valueArr[5]);
    addRow();   
}, false)

titleFilter.addEventListener('keyup', function(event) {
    let table = document.getElementById('table');
    var arr = table.getElementsByClassName('title');
    var val = titleFilter.value.toLowerCase();
    _this.arrOfFilteredByTitle = []; //array of filtered objects
    _this.arrOfFilteredByTitleIds = [];
    for(let elem of arr) {
        var elemText = elem.innerText.toLowerCase();
            inputText = elem.getElementsByTagName('input')[0].value.toLocaleLowerCase();
        if(titleFilter.value === '' || (elemText.indexOf(val) !== -1 || inputText.indexOf(val) !== -1)) {
            removeCssClass(elem.parentElement, 'filtered-hidden');
            let id = elem.parentElement.getElementsByClassName('id')[0].innerText;
            for (let obj of _this.data) {
                for (const key in obj) {                    
                    if(key === 'id' && obj[key] === parseInt(id)) {
                        _this.arrOfFilteredByTitle.push(obj);
                        _this.arrOfFilteredByTitleIds.push(obj['id']);
                    }
                }
            } 
        } else {                   
            addCssClass(elem.parentElement, 'filtered-hidden');  
        }
    }
    showPinsOnPam();
}, false);

openOnlyshow.addEventListener('change', function() {
    table = document.getElementById('table');
    let tbody = table.getElementsByTagName('tbody')[0];
    let arrayOfRows = tbody.getElementsByTagName('tr');
    let d = new Date();
    let h = d.getHours();
    let m = d.getMinutes();    
    _this.arrOfFilteredOpenOnly = []; //array of filtered objects
    _this.arrOfFilteredOpenOnlyIds = [];
    for(row of arrayOfRows) {
        let classNamesArr = row.className.split(" ");
        
        if (this.checked ) {
            let closingTime = row.getElementsByClassName('closing-hours-viewmode')[0].innerText;
            let arr = closingTime.split(':');
            let closingTimeHoursMins = arr[0] + '.' + arr[1];
            let currentTimeHoursMins = (h.toString().length === 1 ? '0'+h : h) + '.' + (m.toString().length === 1 ? '0'+m : m);
            if(closingTimeHoursMins < currentTimeHoursMins) {
                addCssClass(row, 'notopen-hidden');
            } else {
                let id = row.getElementsByClassName('id')[0].innerText;
                for (let obj of _this.data) {
                    for (const key in obj) {                    
                        if(key === 'id' && obj[key] === parseInt(id)) {
                            _this.arrOfFilteredOpenOnly.push(obj);
                            _this.arrOfFilteredOpenOnlyIds.push(obj['id']);
                        }
                    }
                }                
            }                     
        } else {
            removeCssClass(row, 'notopen-hidden');
            _this.arrOfFilteredOpenOnly = [];
            _this.arrOfFilteredOpenOnlyIds = [];
        }
    }
    showPinsOnPam();
}, false);

favoriteOnlyshow.addEventListener('change', function(){
    table = document.getElementById('table');
    let tbody = table.getElementsByTagName('tbody')[0];
    let arrayOfRows = tbody.getElementsByTagName('tr');
    _this.arrOfFilteredFavorite = []; //array of filtered objects
    _this.arrOfFilteredFavoriteIds = [];
    for(row of arrayOfRows) {
        if (this.checked ) {
            if(row.getElementsByClassName('favorite-viewmode')[0].innerText == 'no') {
                addCssClass(row, 'notfavorite-hidden')
            } else {
                let id = row.getElementsByClassName('id')[0].innerText;
                for (let obj of _this.data) {
                    for (const key in obj) {                    
                        if(key === 'id' && obj[key] === parseInt(id)) {
                            _this.arrOfFilteredFavorite.push(obj);
                            _this.arrOfFilteredFavoriteIds.push(obj['id']);
                        }
                    }
                }
            }          
        } else {
            removeCssClass(row, 'notfavorite-hidden');
            _this.arrOfFilteredFavorite = [];
            _this.arrOfFilteredFavoriteIds = [];
        }
    }
    showPinsOnPam();
}, false);

window.onload = addRowHandlers();
window.onload = getData();

mainForm.onclick = function() {
    return false;
}