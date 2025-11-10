document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.querySelector('.intro-overlay');

    const introShown = localStorage.getItem('introShown');

    if (introShown) {
        overlay.style.display = 'none';
    } else {
        overlay.style.display = 'flex';

        const animationDuration = 7300; 

        setTimeout(() => {
            overlay.style.display = 'none';
            localStorage.setItem('introShown', 'true');
            localStorage.setItem('introLastShown', Date.now()); // optional: track timestamp
        }, animationDuration);
    }
});
