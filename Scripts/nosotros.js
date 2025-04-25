document.addEventListener('DOMContentLoaded', function() {
    const elementsToFadeIn = document.querySelectorAll('#nosotros .container > *');

    elementsToFadeIn.forEach((element, index) => {
        element.style.opacity = 0;
        element.style.transition = 'opacity 0.8s ease-in-out';
        setTimeout(() => {
            element.style.opacity = 1;
        }, 100 * (index + 1)); // Retraso gradual para cada elemento
    });
});