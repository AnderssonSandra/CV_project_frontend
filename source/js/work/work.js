'use strict'
//variables for work
let workContainer = document.getElementById("admin-show-work"); // container where work show
let errorDiv = document.getElementById("error-div");
let messageDiv = document.getElementById("message-div");
let addWorkBtn = document.getElementById("add-work-btn");
let updateContainer = document.getElementById("update-div"); 

//form data variables for work
let titleInput = document.getElementById("work-form-title");
let workplaceInput = document.getElementById("work-form-workplace");
let startDateInput = document.getElementById("work-form-startDate");
let endDateInput = document.getElementById("work-form-endDate");
let buzzwordsInput = document.getElementById("work-form-buzzwords");
let descriptionInput = document.getElementById("work-form-description");

//Event listeners for work
window.addEventListener('load', getWorks, false);

if (addWorkBtn) {
    addWorkBtn.addEventListener('click', addWork);
} 

//functions for work
//Show works
function getWorks() {
    workContainer.innerHTML = '';
    //show work with GET
    fetch('http://localhost/CV_project/CV_Backend/api/workApi.php', {
        method: 'GET',
    })
    .then(response => {
        if (response.status === 404) {
            throw response;
        } 
            return response.json();
    })       
    .then(data => { 
        data.forEach(works => {
            workContainer.innerHTML +=
            `<div class="admin-experience">
                <h3>Title:</h3>
                <p>${works.title}</p>
                <h3>Workplace:</h3>
                <p>${works.workplace}</p>
                <h3>Date</h3>
                <p>${works.startDate}  to  ${works.endDate !== '0000-00-00' ? works.endDate : "Ongoing"}</p>
                <h3>Buzzwords</h3>
                <p>${works.buzzwords !== "" ? works.buzzwords : "Inga angivna Buzzwords"}</p>
                <h3>Description</h3>
                <p>${works.description}</p>
                <button class="submit-btn" onClick="getOneWork(${works.id})">Uppdatera</button>
                <button class="submit-btn" onClick="deleteWork(${works.id})">Radera</button>
                <div id="error-div">
                    <!--Error div-->
                </div>
            </div>`
        })
    })
    //send message if error
    .catch(err => {
        console.log(err)
        workContainer.innerHTML = `<p id="errorMsg">Lägg till arbete för att se några utbildningar här</p>`;
    })   
}

//add work
function addWork() {
    //value from form
    let userId = "1"; //gör om sen
    let title = titleInput.value;
    let workplace = workplaceInput.value;
    let startDate = startDateInput.value;
    let endDate = endDateInput.value;
    let buzzwords = buzzwordsInput.value !== null ? buzzwordsInput.value : null;
    let description = descriptionInput.value;

    //create work with POST
    fetch('http://localhost/CV_project/CV_Backend/api/workApi.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'userId' : userId,
            'title' : title,
            'workplace' : workplace,
            'startDate' : startDate,
            'endDate' : endDate,
            'buzzwords' : buzzwords,
            'description' : description
        }),
    })
        .then(response => response.json())
        .then(data => {
            getWorks();
        })
        //send message if error
        .catch(err => {
            console.log(err)
            messageDiv.innerHTML = `<p id="errorMsg">Kunde inte lägga till arbetet</p>`;
        })
}

//delete work
function deleteWork($id) {
    fetch('http://localhost/CV_project/CV_Backend/api/workApi.php?id=' + $id, {
        mode: 'cors',
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        method: 'DELETE',
    })
    .then(response => response.json())
    .then (data => {
        //get works again to update
        getWorks()
    })
    .catch((err) => console.log(err));
}

function getOneWork($id) {
    fetch('http://localhost/CV_project/CV_Backend/api/workApi.php?id=' + $id, {
        mode: 'cors',
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        method: 'GET',
    })
    .then(response => response.json())
    .then(updateContainer.style.display = 'block')
    .then (data => {
        //get educations again to update
        data.forEach(work => {
            updateContainer.innerHTML +=
            `<div id="cv-admin-popup" class="cv-popup active">
                <form action="" method="get" class="update-form" id="workUpdateForm" name="workUpdateForm">
                    <label for="title">Title:</label><br>
                    <input type="text" value="${work.title}" id="work-update-title" name="title"><br>
                    <label for="Workplace">Workplace:</label><br>
                    <input type="text" value="${work.workplace}" id="work-update-workplace" name="workplace"><br>
                    <label for="startDate">Start Date:</label><br>
                    <input type="date" id="work-update-startDate" value="${work.startDate}" name="startDate"><br>
                    <label for="endDate">End Date:</label><br>
                    <input type="date" id="work-update-endDate" value="${work.endDate}" name="endDate"><br>
                    <label for="buzzwords">Buzzwords:</label><br>
                    <input type="text" id="work-update-buzzwords" value="${work.buzzwords !== "" ? work.buzzwords : ""}" name="buzzwords"><br>
                    <label for="description">Description:</label><br>
                    <input type="textarea" id="work-update-description" value="${work.description}" name="description"><br>
                    <input class="submit-btn" type="submit" id="update-work-btn" form="workUpdateForm" value="Update Work" onClick="updateWork(${work.id})">
                    <input class="submit-btn" type="submit" id="update-work-btn" form="workUpdateForm" value="Close" onClick="closeUpdateDiv()">
                    <div id="message-div">
                        <!--Message div-->
                    </div>
                </form>
            </div>
            <!--overlay for popups-->
            <div id="overlay" class="active"></div>`
        })
    })
    .catch((err) => console.log(err));
    
}
//update education
function updateWork($id) {
        
    //form data variables for update work
    let userIdUpdate = "1"; //gör om sen
    let titleUpdate = document.getElementById("work-update-title");
    let workplaceUpdate = document.getElementById("work-update-workplace");
    let buzzwordsUpdate = document.getElementById("work-update-buzzwords");
    let startDateWorkUpdate = document.getElementById("work-update-startDate");
    let endDateWorkUpdate = document.getElementById("work-update-endDate");
    let descriptionWorkUpdate = document.getElementById("work-update-description");

    //get value from form data
    titleUpdate = titleUpdate.value;
    workplaceUpdate = workplaceUpdate.value;
    buzzwordsUpdate = buzzwordsUpdate.value;
    startDateWorkUpdate = startDateWorkUpdate.value;
    endDateWorkUpdate = endDateWorkUpdate.value;
    descriptionWorkUpdate = descriptionWorkUpdate.value;

    //Update education with PUT
    fetch('http://localhost/CV_project/CV_Backend/api/workApi.php?id=' + $id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'id' : $id,
            'userId' : userIdUpdate,
            'title' : titleUpdate,
            'workplace' : workplaceUpdate,
            'startDate' : startDateWorkUpdate,
            'endDate' : endDateWorkUpdate,
            'buzzwords' : buzzwordsUpdate,
            'description' : descriptionWorkUpdate
        }),
    })
        .then(response => response.json())
        .then(data => {
            getProjects();
        })
        //send message if error
        .catch(err => {
            console.log(err)
        })
}

//close update div
function closeUpdateDiv() {
    updateContainer.style.display = 'none'
}
