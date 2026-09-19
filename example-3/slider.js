document.addEventListener("DOMContentLoaded", function () {

    function arrowClicked(event, direction) {
        var slides = event.target.closest('.slider').querySelector('.slides');
        slides.scrollLeft += direction * slides.scrollWidth / slides.childElementCount;
    }

    function radioChanged(event) {
        var radio = event.target;
        var radioIndex = [...radio.parentElement.children].indexOf(radio);
        var slides = radio.closest('.slider').querySelector('.slides');
        slides.scrollLeft = radioIndex / slides.childElementCount * slides.scrollWidth;
    }

    function scrolled(event) {
        var slides = event.target;
        var slider = slides.closest('.slider');
        var scrollRatio = slides.scrollLeft / slides.scrollWidth;

        var radioId = 'radio_' + slider.id + '_slide';
        var size = slides.childElementCount;

        for (let i = 1; i <= size; i++) {
            if (scrollRatio + 0.5 / size < i / size) {
                document.getElementById(radioId + i).checked = true;

                if (i == 1) {
                    slider.querySelector('.previous').style.visibility = "hidden";
                } else {
                    slider.querySelector('.previous').style.visibility = "visible";
                }

                if (i == size) {
                    slider.querySelector('.next').style.visibility = "hidden";
                } else {
                    slider.querySelector('.next').style.visibility = "visible";
                }

                break;
            }
        }
    }

    document.querySelectorAll('.slider').forEach(
        slider => {
            slider.querySelector('.previous').style.visibility = "hidden";

            if (slider.childElementCount < 1) {
                slider.querySelector('.next').style.visibility = "hidden";
            }

            slider.querySelectorAll('.slider-arrow.previous img')[0].addEventListener(
                'click', event => arrowClicked(event, -1)
            );

            slider.querySelectorAll('.slider-arrow.next img')[0].addEventListener(
                'click', event => arrowClicked(event, 1)
            );

            slider.addEventListener(
                'change', event => {
                    radioChanged(event);
                }
            );

            slider.querySelector('.slides').addEventListener(
                'scroll', event => scrolled(event)
            );
        }
    );
});