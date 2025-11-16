const topOverlay = document.createElement('div');
topOverlay.className = 'page-transition-top';
const bottomOverlay = document.createElement('div');
bottomOverlay.className = 'page-transition-bottom';
document.body.appendChild(topOverlay);
document.body.appendChild(bottomOverlay);

function setOverlayPositions() {
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const viewportHeight = window.innerHeight;

    // Top overlay: starts at header top, full height
    topOverlay.style.top = `${header.offsetHeight}px`;
    topOverlay.style.height = `${(viewportHeight - header.offsetHeight)/2}px`;

    // Bottom overlay: starts at footer (if visible) or bottom of viewport
    const footerRect = footer.getBoundingClientRect();
    const footerInView = footerRect.top < viewportHeight && footerRect.bottom >= 0;
    const bottomStart = footerInView ? viewportHeight - footerRect.top : 0;

    bottomOverlay.style.bottom = `${bottomStart}px`;
    bottomOverlay.style.height = `${(viewportHeight - header.offsetHeight)/2}px`;
}

// Animate close (for link navigation)
function closeTransition(callback) {
    const header = document.querySelector('header');
    const viewportHeight = window.innerHeight;
    const targetHeight = (viewportHeight - header.offsetHeight) / 2;

    topOverlay.style.transition = 'height 0.6s ease';
    bottomOverlay.style.transition = 'height 0.6s ease';

    topOverlay.style.height = `${targetHeight}px`;
    bottomOverlay.style.height = `${targetHeight}px`;

    setTimeout(() => {
        if (callback) callback();
    }, 600);
}

// Animate open (page load)
window.addEventListener('DOMContentLoaded', () => {
    setOverlayPositions();

    // Force browser to recognize initial heights
    topOverlay.style.transition = 'none';
    bottomOverlay.style.transition = 'none';

    requestAnimationFrame(() => {
        topOverlay.style.transition = 'height 0.6s ease';
        bottomOverlay.style.transition = 'height 0.6s ease';

        // Animate to 0 to "open up"
        topOverlay.style.height = '0px';
        bottomOverlay.style.height = '0px';
    });
});

document.querySelectorAll('a').forEach(link => {
    if (link.target === '_blank' || link.href.startsWith('mailto:')) return;
    link.addEventListener('click', e => {
        e.preventDefault();
        closeTransition(() => window.location.href = link.href);
    });
});

window.addEventListener('resize', setOverlayPositions);
