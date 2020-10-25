//variables
//containers to show data in
let projectContainer = document.getElementById("cv-project-container"); 
let workContainer = document.getElementById("cv-work-container"); 
let educationContainer = document.getElementById("cv-education-container"); 
let educationPopupContainer = document.getElementById("cv-education-popup-container"); 
let projectPopupContainer = document.getElementById("admin-show-project"); 

window.onload = function(){
    getProjects();
    getEducations();
    getWorks();
};

function getProjects() {
    projectContainer.innerHTML = '';
    //show project with GET
    fetch('http://localhost/CV_project/CV_Backend/api/projectApi.php', {
        method: 'GET',
    })
    .then(response => {
        if (response.status === 404) {
            throw response;
        } 
            return response.json();
    })       
    .then(data => { 
        data.forEach((projects, index) => {
            projectContainer.innerHTML +=
            `<div data-modal-target="#project-${projects.id}" class="cv-project-parent">
                <p class="cv-project-number">${index + 1 + "."}</p>
            </div>
            <!--Popup div for show project info-->
            <div id="cv-project-popup-container">
                <div class="cv-popup" id="project-${projects.id}">
                    <h3 class="cv-popup-heading">${projects.name}</h3>
                    <p class="cv-popup-text">${projects.description}</p>
                    <p class="cv-popup-techniques">${projects.techniques !== "" ? projects.techniques : ""}</p>
                    <a class="cv-popup-link" href="${projects.link !== "" ? projects.link : ""}">${projects.link !== "" ? "Link to Website" : "There is no Link to Website"}</a>
                    <button data-close-button class="close-button">&times;</button>
                </div> 
            </div>`
        })
        getPopus();
    })
    //send message if error
    .catch(err => {
        console.log(err)
        projectContainer.innerHTML = `<p id="errorMsg">Lägg till projekt för att se några projekt här</p>`;
    })   
}

//Show Educations
function getEducations() {
    educationContainer.innerHTML = "<img id='glasses-image' src='images/glasses.png' alt='Image on glasses'>";
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
            `<div class="cv-education-parent">
                <h3>${educations.education}</h3>
                <p>${educations.school},  ${educations.endDate !== '0000-00-00' ? educations.endDate : "Ongoing"}</p>
                <button data-modal-target="#education${educations.id}" class="cv-education-read-more">More Info</button>
            </div>
            <!--Popup div for show education info-->
            <div id="cv-education-popup-container">
                <div class="cv-popup" id="education${educations.id}">
                    <h3 class="cv-popup-heading">${educations.education}</h3>
                    <p class="cv-popup-text">${educations.description}</p>
                    <button data-close-button class="close-button">&times;</button>
                </div>
            </div>`
        })
        getPopus();
    })
    //send message if error
    .catch(err => {
        console.log(err)
        educationContainer.innerHTML = `<p id="errorMsg">Lägg till utbildning för att se några utbildningar här</p>`;
    })   
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
            `<div class="cv-work-parent">
                <h3>${works.title}</h3>
                <div class="cv-work-parent-wrapper">
                    <div class="cv-work-left">
                        <p class="cv-work-workplace">${works.workplace}</p>
                        <p class="cv-work-date">${works.startDate}  to  ${works.endDate !== '0000-00-00' ? works.endDate : "Ongoing"}</p>
                    </div>
                    <div class="cv-work-right">
                        <p class="cv-work-description">${works.description}</p>
                        <p class="cv-work-buzzwords">${works.buzzwords !== "" ? works.buzzwords : ""}</p>
                    </div>
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

/*Pop-up function*/
function getPopus() {
    const openButtons = document.querySelectorAll('[data-modal-target]');
    const closeButtons = document.querySelectorAll('[data-close-button]');
    const overlay = document.getElementById('overlay');
    
    //open modual button
    openButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = document.querySelector(button.dataset.modalTarget)
            openModal(modal)
        })
    })

    //close module button
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.cv-popup')
            closeModal(modal)
        })
    })

    //open modul
    function openModal(modal) {
        if (modal == null) return
        modal.classList.add('active')
        overlay.classList.add('active')
    }

    //close module
    function closeModal(modal) {
        if (modal == null) return
        modal.classList.remove('active')
        overlay.classList.remove('active')
    }
}


