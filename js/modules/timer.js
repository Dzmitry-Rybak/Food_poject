function timer(id, deadline) {
    //  Timer

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

    setClock(id, deadline);
    
}
export default timer;