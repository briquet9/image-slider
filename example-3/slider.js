document.addEventListener("DOMContentLoaded", function () {
    var currentIndex = 1;

    function arrowClicked(event, direction) {
        var slides = event.target.parentElement.parentElement.parentElement.getElementsByClassName('slides')[0];
        slides.scrollLeft += direction * slides.scrollWidth / slides.childElementCount;
        currentIndex += direction;
    }

    function radioChanged(event) {
        var radio = document.getElementById(event.target.id);
        var radioIndex = [...radio.parentElement.children].indexOf(radio);
        var slides = radio.parentElement.parentElement.parentElement.getElementsByClassName('slides')[0];
        slides.scrollLeft = radioIndex / slides.childElementCount * slides.scrollWidth;
        currentIndex = radioIndex + 1;
    }

    function scrolled(event) {
        var id = event.target.parentElement.id;
        var slides = document.getElementById(id).getElementsByClassName('slides')[0];
        var scrollRatio = slides.scrollLeft / slides.scrollWidth;

        var radioId = 'radio_' + id + '_slide';
        var size = slides.childElementCount;
        var position = 1 + Math.round(scrollRatio * size);

        if(position == currentIndex) {
            return;
        }
        currentIndex = position;

        document.getElementById(radioId + position).checked = true;

        if (position == 1) {
            document.getElementById(id).getElementsByClassName('previous')[0].style.visibility = "hidden";
        } else {
            document.getElementById(id).getElementsByClassName('previous')[0].style.visibility = "visible";
        }

        if (position == size) {
            document.getElementById(id).getElementsByClassName('next')[0].style.visibility = "hidden";
        } else {
            document.getElementById(id).getElementsByClassName('next')[0].style.visibility = "visible";
        }
    }

    document.querySelectorAll('.slider').forEach(
        slider => {
            slider.getElementsByClassName('previous')[0].style.visibility = "hidden";

            if (slider.childElementCount < 1) {
                slider.getElementsByClassName('next')[0].style.visibility = "hidden";
            }

            slider.querySelectorAll('.slider-arrow.previous img')[0].addEventListener(
                'click', event => arrowClicked(event, -1)
            );

            slider.querySelectorAll('.slider-arrow.next img')[0].addEventListener(
                'click', event => arrowClicked(event, 1)
            );

            slider.addEventListener(
                'change', event => { radioChanged(event); }
            );

            slider.getElementsByClassName('slides')[0].addEventListener(
                'scroll', event => scrolled(event)
            );
        }
    );
});