/*Pop-up functions*/
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