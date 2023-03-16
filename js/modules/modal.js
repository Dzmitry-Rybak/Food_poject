function openModal (modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // block website  scrolling  while modal is open

    if (modalTimerId) {
        clearInterval(modalTimerId) // if user open it, don't show it again after 3sec
    }
}

function closeModal (modalSelector){
    const modal = document.querySelector(modalSelector);
    modal.style.display = 'none';
    document.body.style.overflow = ''; // allow scrolling
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    // Modal

    const modal = document.querySelector(modalSelector),
    modalOpen = document.querySelectorAll(triggerSelector);




    modalOpen.forEach(item => {
        item.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector)
        }
    });

    // if click esc - close modal
    document.addEventListener('keydown', (e) => { 
        if(e.code === 'Escape' && window.getComputedStyle(modal).display === 'block') {
            closeModal(modalSelector)
        }
    });

    

    function showModalByScroll () {
        // if scrollY and screan == all wibsite hight it's means that the user scrolled to the end of the website
        //  -1px to fix bugs 
        if(window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1){
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);  // only once show modal
        }
    }

    window.addEventListener('scroll', showModalByScroll);

}

export default modal;
export {closeModal};
export {openModal};