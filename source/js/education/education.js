'use strict'
//variables for education
let educationContainer = document.getElementById("admin-show-education"); // container where educations show
let courseEL = document.getElementById("course"); 
let errorDiv = document.getElementById("error-div");
let messageDiv = document.getElementById("message-div");
let addEducationBtn = document.getElementById("add-education-btn");
let updateContainer = document.getElementById("update-div"); // container where educations show


//form data variables for education
let educationInput = document.getElementById("education-form-education");
let schoolInput = document.getElementById("education-form-school");
let startDateEducationInput = document.getElementById("education-form-startDate");
let endDateEducationInput = document.getElementById("education-form-endDate");
let descriptionEducationInput = document.getElementById("education-form-description");

//Event listeners for education
window.addEventListener('load', getEducations, false);

if (addEducationBtn) {
    addEducationBtn.addEventListener('click', addEducation);

} 

//functions
//Show Educations
function getEducations() {
    educationContainer.innerHTML = '';
    //show education with GET
    fetch('http://localhost/CV_project/CV_Backend/api/educationApi.php', {
        method: 'GET',
    })
    .then(response => {
        if (response.status === 404) {
            throw response;
        } 
            return response.json();
    })       
    .then(data => { 
        data.forEach(educations => {
            educationContainer.innerHTML +=
            `<div class="admin-experience">
                <h3>Name of Education:</h3>
                <p>${educations.education}</p>
                <h3>Name of School:</h3>
                <p>${educations.school}</p>
                <h3>Date</h3>
                <p>${educations.startDate}  -  ${educations.endDate !== '0000-00-00' ? educations.endDate : "Ongoing"}</p>
                <h3>Description</h3>
                <p>${educations.description}</p>
                <button class="submit-btn" onClick="getOneEducation(${educations.id})">Uppdatera</button>
                <button class="submit-btn" onClick="deleteEducation(${educations.id})">Radera</button>
                <div id="error-div">
                    <!--Error div-->
                </div>
            </div>`
        })
    })
    //send message if error
    .catch(err => {
        console.log(err)
        educationContainer.innerHTML = `<p id="errorMsg">Lägg till utbildning för att se några utbildningar här</p>`;
    })   
}

//add Education
function addEducation() {
    //value from form
    let userId = "1"; //gör om sen
    let education = educationInput.value;
    let school = schoolInput.value;
    let startDate = startDateEducationInput.value;
    let endDate = endDateEducationInput.value;
    let description = descriptionEducationInput.value;
    
    //create Education with POST
    fetch('http://localhost/CV_project/CV_Backend/api/educationApi.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'userId' : userId,
            'education' : education,
            'school' : school,
            'startDate' : startDate,
            'endDate' : endDate,
            'description' : description
        }),
    })
        .then(response => response.json())
        .then(data => {
            getEducations();
        })
        //send message if error
        .catch(err => {
            console.log(err)
            messageDiv.innerHTML = `<p id="errorMsg">Kunde inte lägga till utbildningen</p>`;
        })
}

//delete Education
function deleteEducation($id) {
    fetch('http://localhost/CV_project/CV_Backend/api/educationApi.php?id=' + $id, {
        mode: 'cors',
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        method: 'DELETE',
    })
    .then(response => response.json())
    .then (data => {
        //get educations again to update
        getEducations()
    })
    .catch((err) => console.log(err));
}

function getOneEducation($id) {
    fetch('http://localhost/CV_project/CV_Backend/api/educationApi.php?id=' + $id, {
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
        data.forEach(education => {
            updateContainer.innerHTML +=
            `<div id="cv-admin-popup" class="cv-popup active">
                <form action="" method="get" class="update-form" id="educationUpdateForm" name="educationUpdateForm">
                    <label for="education">Name of Education:</label><br>
                    <input type="text" name="education" value="${education.education}" id="education-update-education"><br>
                    <label for="school">Name of School:</label><br>
                    <input type="text" name="school" value="${education.school}" id="education-update-school"><br>
                    <label for="startDate">Start Date:</label><br>
                    <input type="date" name="startDate" value="${education.startDate} "id="education-update-startDate"><br>
                    <label for="endDate">End Date:</label><br>
                    <input type="date" value="${education.endDate}" name="endDate" id="education-update-endDate"><br>
                    <label for="description">Description:</label><br>
                    <input type="textarea" value="${education.description}" name="description" id="education-update-description"><br>
                    <input class="submit-btn" type="submit" id="update-education-btn" form="educationUpdateForm" value="Update Education" onClick="updateEducation(${education.id})">
                    <input class="submit-btn" type="submit" id="update-education-btn" form="educationUpdateForm" value="Close" onClick="closeUpdateDiv()">
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
function updateEducation($id) {
        
    //form data variables for update education
    let userIdUpdate = "1"; //gör om sen
    let educationUpdate = document.getElementById("education-update-education");
    let schoolUpdate = document.getElementById("education-update-school");
    let startDateEducationUpdate = document.getElementById("education-update-startDate");
    let endDateEducationUpdate = document.getElementById("education-update-endDate");
    let descriptionEducationUpdate = document.getElementById("education-update-description");

    educationUpdate = educationUpdate.value;
    schoolUpdate = schoolUpdate.value;
    startDateEducationUpdate = startDateEducationUpdate.value;
    endDateEducationUpdate = endDateEducationUpdate.value;
    descriptionEducationUpdate = descriptionEducationUpdate.value;

    //Update education with PUT
    fetch('http://localhost/CV_project/CV_Backend/api/educationApi.php?id=' + $id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'id' : $id,
            'userId' : userIdUpdate,
            'education' : educationUpdate,
            'school' : schoolUpdate,
            'startDate' : startDateEducationUpdate,
            'endDate' : endDateEducationUpdate,
            'description' : descriptionEducationUpdate
        }),
    })
        .then(response => response.json())
        .then(data => {
            getEducations();
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