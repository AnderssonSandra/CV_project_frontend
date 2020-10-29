//containers to show data in
let projectContainer = document.getElementById("cv-project-container"); 
let workContainer = document.getElementById("cv-work-container"); 
let educationContainer = document.getElementById("cv-education-container"); 
let educationPopupContainer = document.getElementById("cv-education-popup-container"); 
let projectPopupContainer = document.getElementById("admin-show-project"); 
let headerInfoContainer =document.getElementById("cv-header-info");
let aboutTextContainer =document.getElementById("cv-about-text");
let footerContainer =document.getElementById("cv-footer-parent");
let menuContainer =document.getElementById("cv-main-nav");

//call on functions when window loads
window.onload = function(){
    getProjects();
    getEducations();
    getWorks();
    getInfo();
};

//Get all projects
function getProjects() {
    projectContainer.innerHTML = '';
    //show project with GET
    fetch('http://studenter.miun.se/~saan1906/writeable/dt173g/CV_project/CV_Backend/api/projectApi.php', {
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
                    <a class="cv-popup-link" target="_blank" href="//${projects.link !== "" ? projects.link : ""}">${projects.link !== "" ? "Link to Website" : "There is no Link to Website"}</a>
                    <a class="cv-popup-link" target="_blank" href="//${projects.github !== "" ? projects.github : ""}">${projects.github !== "" ? "Link to Github Repo" : "There is no Link to Github Repo"}</a>
                    <button data-close-button class="close-button">&times;</button>
                </div> 
            </div>`
        })
        //Get popups for projects info
        getPopus();
    })
    //send message if there is no projects
    .catch(err => {
        console.log(err)
        projectContainer.innerHTML = `<p id="errorMsg">Lägg till projekt för att se några projekt här</p>`;
    })   
}

//Get Educations
function getEducations() {
    educationContainer.innerHTML = "<img id='glasses-image' src='images/glasses.png' alt='Image on glasses'>";
    //show education with GET
    fetch('http://studenter.miun.se/~saan1906/writeable/dt173g/CV_project/CV_Backend/api/educationApi.php', {
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
                <p>${educations.school},  ${educations.endDate !== null ? educations.endDate : "Ongoing"}</p>
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
        //Get popups for education info
        getPopus();
    })
    //send message if there is no educations
    .catch(err => {
        console.log(err)
        educationContainer.innerHTML = `<p id="errorMsg">Lägg till utbildning för att se några utbildningar här</p>`;
    })   
}

//Get works
function getWorks() {
    workContainer.innerHTML = '';
    //show work with GET
    fetch('http://studenter.miun.se/~saan1906/writeable/dt173g/CV_project/CV_Backend/api/workApi.php', {
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
                        <p class="cv-work-date">${works.startDate}  -  ${works.endDate !== null ? works.endDate : ""}</p>
                    </div>
                    <div class="cv-work-right">
                        <p class="cv-work-description">${works.description}</p>
                        <p class="cv-work-buzzwords">${works.buzzwords !== "" ? works.buzzwords : ""}</p>
                    </div>
                </div>
            </div>`
        })
})
//send message if there is no works
    .catch(err => {
        console.log(err)
        workContainer.innerHTML = `<p id="errorMsg">Lägg till arbetslivserfarenheter för att se dem här</p>`;
    })   
}

//get info
function getInfo() {
    headerInfoContainer.innerHTML = '';
    aboutTextContainer.innerHTML = '';
    footerContainer.innerHTML = '';
    menuContainer.innerHTML = '';
    //show info with GET
    fetch('http://studenter.miun.se/~saan1906/writeable/dt173g/CV_project/CV_Backend/api/infoApi.php', {
        method: 'GET',
    })
    .then(response => {
        if (response.status === 404) {
            throw response;
        } 
            return response.json();
    })       
    .then(data => {
        //show information in header 
        data.forEach(info => {
            headerInfoContainer.innerHTML +=
            `<h1 id="cv-header-name">${info.name} ${info.lastname}</h1>
            <p id="cv-header-text">${info.introduction}</p>`
        })
        //show main nav
        data.forEach(info => {
            menuContainer.innerHTML +=
            `
            <ul>
                <li><a href="#cv-about">1. Who is ${info.name}?</a></li>
                <li><a href="#cv-work">2. Work Experiences.</a></li>
                <li><a href="#cv-education">3. Education.</a></li>
                <li><a href="#cv-projects">4. Projects.</a></li>
                <li><a href="#cv-footer">5. Contact Info.</a></li>
            </ul>
            `
        })
        //show info in about section
        data.forEach(info => {
            aboutTextContainer.innerHTML +=
            `<h2>1. Who is ${info.name}?</h2>
            <p>${info.description}</p>`
        })
        //show information in footer
        data.forEach(info => {
            footerContainer.innerHTML +=
            `<p>${info.phone}</p> 
            <a href="mailto:${info.email}">${info.email}</a><br>
            <a target="_blank" href="//${info.linkedin}">${info.linkedin}</a>
            `
        })
    })
    //send message if there is no info about me
    .catch(err => {
        console.log(err)
        headerInfoContainer.innerHTML = `<p id="errorMsg">Lägg till information om dig för att visa det här</p>`;
        aboutTextContainer.innerHTML = `<p id="errorMsg">Lägg till information om dig för att visa det här</p>`;
        footerContainer.innerHTML = `<p id="errorMsg">Lägg till kontaktinformation för att visa det här</p>`;

    })   
}

//Pop-up function
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