function calc() {
    // Calc

    const result = document.querySelector('.calculating__result span');

    let sex, ratio, height, weight, age;

    if (localStorage.getItem(sex)) {
        sex = localStorage.getItem(sex);
    } else {
        sex = 'female';
        localStorage.setItem(sex, 'female')
    }

    if (localStorage.getItem(ratio)) {
        ratio = localStorage.getItem(ratio);
    } else {
        ratio = 1.375;
        localStorage.setItem(ratio, 1.375)
    }

    function initLocalSetings (selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')){
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        })
    }
    initLocalSetings('#gender div', 'calculating__choose-item_active');
    initLocalSetings('.calculating__choose_big div', 'calculating__choose-item_active')

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____'
            return;
        }

        if (sex === 'female') {
            result.textContent = Math.round(( 447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }
    calcTotal()

    function getStaticInformation (selector, activeClass) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
                
                elements.forEach(item => item.classList.remove(activeClass));
                e.target.classList.add(activeClass);
                calcTotal();
            });
        });
    }
    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInformation (selector) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {

            elem.addEventListener('input', (e) => {
                if (elem.value.match(/\D/g)) {
                    elem.style.border = '1px solid red';
                } else {
                    elem.style.border = 'none';
                }
                if (e.target.getAttribute('id') === 'height') {
                    height = +elem.value;
                }
                if (e.target.getAttribute('id') === 'weight') {
                    weight = +elem.value;
                }
                if (e.target.getAttribute('id') === 'age') {
                    age = +elem.value;
                }
                calcTotal()
            })
        });
    }

    getDynamicInformation('.calculating__choose_medium input')

}

export default calc;