document.addEventListener("DOMContentLoaded", function () {

    function arrowClicked(event, direction) {
        var slides = event.target.parentElement.parentElement.parentElement.getElementsByClassName('slides')[0];
        slides.scrollLeft += direction * slides.scrollWidth / slides.childElementCount;
    }

    function radioChanged(event, n) {
        var radio = document.getElementById(event.target.id);
        var radioIndex = [...radio.parentElement.children].indexOf(radio);
        var slides = radio.parentElement.parentElement.parentElement.getElementsByClassName('slides')[0];
        slides.scrollLeft = radioIndex / slides.childElementCount * slides.scrollWidth;
    }

    function scrolled(event) {
        var id = event.target.parentElement.id;
        var slides = document.getElementById(id).getElementsByClassName('slides')[0];
        var scrollRatio = slides.scrollLeft / slides.scrollWidth;

        var radioId = 'radio_' + id + '_slide';
        var size = slides.childElementCount;

        for (let i = 1; i <= size; i++) {
            if (scrollRatio + 0.5 / size < i / size) {
                document.getElementById(radioId + i).checked = true;

                if (i == 1) {
                    document.getElementById(id).getElementsByClassName('previous')[0].style.visibility = "hidden";
                } else {
                    document.getElementById(id).getElementsByClassName('previous')[0].style.visibility = "visible";
                }

                if (i == size) {
                    document.getElementById(id).getElementsByClassName('next')[0].style.visibility = "hidden";
                } else {
                    document.getElementById(id).getElementsByClassName('next')[0].style.visibility = "visible";
                }

                break;
            }
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