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
        var size = slides.childElementCount;

        // Compute the new slide index
        var scrollRatio = slides.scrollLeft / slides.scrollWidth;
        var slideIndex = Math.round(scrollRatio * size) + 1;

        // Get the corresponding radio for the slide index
        var targetRadio = document.getElementById(`radio_${slider.id}_slide${slideIndex}`);

        // If already active, skip the update
        if (targetRadio.checked) {
            return;
        }

        // Update radio state and toggle arrow visibility
        targetRadio.checked = true;
        slider.querySelector('.previous').style.visibility = (slideIndex === 1) ? "hidden" : "visible";
        slider.querySelector('.next').style.visibility = (slideIndex === size) ? "hidden" : "visible";
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