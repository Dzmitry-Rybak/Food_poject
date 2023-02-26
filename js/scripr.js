window.addEventListener('DOMContentLoaded', () => {

    //   Tabs

    let tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll ('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');
    
    function hideTabContent () {
        tabsContent.forEach(item => {
            item.style.display = 'none';
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent (i = 0) {
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');
    }
    hideTabContent();
    showTabContent();
    tabsParent.addEventListener('click', e => {
        if (e.target && e.target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if(e.target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            })
        }
    })

    //  Timer

    const deadline = '2024-02-21';

    function getTimeRemaining(endTime) {
        let days, hours, minutes, seconds;
        const t = Date.parse(endTime) - Date.parse(new Date());
        if(t <= 0){
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 *  60 * 24)),
            hours = Math.floor(t / (1000 * 60 *  60) % 24 ),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);
            
        }
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
          }
              
    }

    function setZero(num) {
        if(num >=0 && num < 10) {
            return `0${num}`;
        } else {
            return num
        }
    }

    function setClock(selector, endTime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(upDateClock, 1000);

              upDateClock()

              function upDateClock() {
                const t = getTimeRemaining(endTime);

                days.innerHTML = setZero(t.days);
                hours.innerHTML = setZero(t.hours);
                minutes.innerHTML = setZero(t.minutes);
                seconds.innerHTML = setZero(t.seconds);

                if(t.total <=0){
                    clearInterval(timeInterval);
                }
              }
    }

    setClock('.timer', deadline);

    // Modal

    const modal = document.querySelector('.modal'),
          modalOpen = document.querySelectorAll('[data-modal]'),
          modalCloseBtn = document.querySelector('[data-close]');

    


    function openModal () {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // block website  scrolling  while modal is open
        clearInterval(modalTimerId) // if user open it, don't show it again after 3sec
    }

    modalOpen.forEach(item => {
        item.addEventListener('click',openModal);
    });

    function closeModal (){
        modal.style.display = 'none';
        document.body.style.overflow = ''; // allow scrolling
    }


    modalCloseBtn.addEventListener('click', closeModal)

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal()
        }
    });

    // if click esc - close modal
    document.addEventListener('keydown', (e) => { 
        if(e.code === 'Escape' && window.getComputedStyle(modal).display === 'block') {
            closeModal()
        }
    });

    const modalTimerId = setTimeout(openModal, 3000);

    function showModalByScroll () {
        // if scrollY and screan == all wibsite hight it's means that the user scrolled to the end of the website
        //  -1px to fix bugs 
        if(window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1){
            openModal();
            window.removeEventListener('scroll', showModalByScroll);  // only once show modal
        }
    }

    window.addEventListener('scroll', showModalByScroll);


    // Add classes to cards:
    
    class MenuCard {
        constructor(src, alt, title, descr, price) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
        }
        render() {
            const element = document.createElement('div');
            element.innerHTML = `
            <div class="menu__item">
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
        </div>
        `;
        document.querySelector('.menu .container').append(element)
        }
    }

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        229
    ).render()

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        550
    ).render()

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков. ',
        430
    ).render()
})