/*Pop-up functions*/
const openButtons = document.querySelectorAll('[data-modal-target]');
const closeButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');

//open modual button
openButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openEducation(modal)
    })
})

//close module button
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.cv-popup')
        closeEducation(modal)
    })
})

//open modul
function openEducation(modal) {
    if (modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}

//close module
function closeEducation(modal) {
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}