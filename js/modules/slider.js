function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    // Slider

    let   indexSlide = 1,
          offset = 0;

    const prevSlider = document.querySelector(prevArrow),
          nextSlider = document.querySelector(nextArrow),
          slides = document.querySelectorAll(slide),
          slidesWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
          current = document.querySelector(currentCounter),
          total = document.querySelector(totalCounter),
          width = window.getComputedStyle(slidesWrapper).width,
          slider = document.querySelector(container);

    
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

    function delateNotDigits (str) {
        return +str.replace(/\D/g, '');  // delate all not digits
    }

    nextSlider.addEventListener('click', () => {
        if (offset == (delateNotDigits(width) * (slides.length - 1))) { 
            offset = 0;
        } else {
            offset += delateNotDigits(width);
        }
        
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (indexSlide == slides.length) {
            indexSlide = 1;
        }  else {
            indexSlide++;
        }
        numberOfSlide();

        dots.forEach(dot => dot.style.opacity = '0.5');
        dots[indexSlide-1].style.opacity = 1;
    })

    prevSlider.addEventListener('click', () => {
        if (offset == 0) {
            offset = delateNotDigits(width) * (slides.length - 1);
        } else {
            offset -= delateNotDigits(width)
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (indexSlide == 1) {
            indexSlide = slides.length;
        } else {
            indexSlide--;
        }
        numberOfSlide();

        dots.forEach(dot => dot.style.opacity = '0.5');
        dots[indexSlide-1].style.opacity = 1;
    })

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to')
            indexSlide = slideTo;
            offset = delateNotDigits(width) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;

            dots.forEach(dot => dot.style.opacity = '0.5');
            dots[indexSlide-1].style.opacity = 1;

            numberOfSlide();
        })
    })

}

export default slider;