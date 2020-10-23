'use strict'
//variables for work
let workContainer = document.getElementById("admin-show-work"); // container where work show
let errorDiv = document.getElementById("error-div");
let messageDiv = document.getElementById("message-div");
let addWorkBtn = document.getElementById("add-work-btn");

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
                <p>${works.buzzwords}</p>
                <h3>Description</h3>
                <p>${works.description}</p>
                <button class="submit-btn" onClick="updateWork(${works.id})">Uppdatera</button>
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
    let buzzwords = buzzwordsInput.value;
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

