'use strict'
//variables for education
let educationContainer = document.getElementById("admin-show-education"); // container where educations show
let courseEL = document.getElementById("course"); 
let errorDiv = document.getElementById("error-div");
let messageDiv = document.getElementById("message-div");
let addEducationBtn = document.getElementById("add-education-btn");

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
                <button class="submit-btn" onClick="updateEducation(${educations.id})">Uppdatera</button>
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