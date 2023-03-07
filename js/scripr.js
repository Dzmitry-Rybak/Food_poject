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
          modalOpen = document.querySelectorAll('[data-modal]');

    


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



    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal()
        }
    });

    // if click esc - close modal
    document.addEventListener('keydown', (e) => { 
        if(e.code === 'Escape' && window.getComputedStyle(modal).display === 'block') {
            closeModal()
        }
    });

    const modalTimerId = setTimeout(openModal, 50000);

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

    const getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error (`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    }

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price).render();
            });
        })

        // Forms  using fetch API

        const forms = document.querySelectorAll('form');
        
        const message = {
            loading: 'img/form/spinner.svg',
            success: 'Thank you, we will contact you',
            failure: 'Oops...'
        };

        forms.forEach(item => {
            bindPostData(item);
        })

        const postData = async (url, data) => {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: data
            });
            return await res.json();
        }

        function bindPostData (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                const statusMessage = document.createElement('img');
                statusMessage.src = message.loading;
                statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
                ` ;
                form.insertAdjacentElement('afterend', statusMessage);


                const formData = new FormData(form);
                
                const json = JSON.stringify(Object.fromEntries(formData.entries()));

                postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset();
                });
            });
        }

        function showThanksModal(message){
            const prevModalDialog = document.querySelector('.modal__dialog');

            prevModalDialog.style.display = 'none';
            openModal();

            const thanksModal = document.createElement('div');
            thanksModal.classList.add('modal__dialog');
            thanksModal.innerHTML = `
                <div class="modal__content">
                    <div class="modal__close" data-close>×</div>
                    <div class="modal__title">${message}</div>
                </div>
            `;
            modal.append(thanksModal);
            setTimeout( () => {
                thanksModal.remove();
                prevModalDialog.style.display = 'block';
                closeModal();
            }, 4000);
        }


    // Slider

    const prevSlider = document.querySelector('.offer__slider-prev'),
          nextSlider = document.querySelector('.offer__slider-next'),
          slides = document.querySelectorAll('.offer__slide'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          slidesField = document.querySelector('.offer__slider-inner'),
          current = document.querySelector('#current'),
          total = document.querySelector('#total'),
          width = window.getComputedStyle(slidesWrapper).width,
          slider = document.querySelector('.offer__slider');
    let   indexSlide = 1,
          offset = 0;
    
    slidesField.style.width = slides.length * 100 + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    })

    slider.style.position = 'relative';

    function numberOfSlide () {
        if (slides.length < 10) {
            total.textContent = `0${slides.length}`;
            current.textContent = `0${indexSlide}`;
        } else {
            total.textContent = slides.length;
            current.textContent = indexSlide;
        }

    }
    numberOfSlide();

    const indicators = document.createElement('ol'),
          dots = [];
    indicators.classList.add('carousel-indicators');
    slider.append(indicators); 
    
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i+1);
        dot.classList.add('dot');
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    nextSlider.addEventListener('click', () => {
        if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
        }
        
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (indexSlide === slides.length) {
            indexSlide = 1
        }  else {
            indexSlide++;
        }
        numberOfSlide();

        dots.forEach(dot => dot.style.opacity = '0.5');
        dots[indexSlide-1].style.opacity = '1';
    })

    prevSlider.addEventListener('click', () => {
        if (offset == 0) {
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (indexSlide === 1) {
            indexSlide = slides.length
        } else {
            indexSlide--;
        }
        numberOfSlide();

        dots.forEach(dot => dot.style.opacity = '0.5');
        dots[indexSlide-1].style.opacity = '1';
    })

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to')
            indexSlide = slideTo;
            offset = +width.slice(0, width.length - 2) * (slideTo - 1)
            slidesField.style.transform = `translateX(-${offset}px)`;

            dots.forEach(dot => dot.style.opacity = '0.5');
            dots[indexSlide-1].style.opacity = '1';

            numberOfSlide();
        })
    })

})