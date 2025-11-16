// create overlays once
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

    // top overlay: below header
    topOverlay.style.top = `${header.offsetHeight}px`;

    // bottom overlay: start at footer if visible, else bottom of viewport
    const footerRect = footer.getBoundingClientRect();
    const footerInView = footerRect.top < viewportHeight && footerRect.bottom >= 0;
    const bottomStart = footerInView ? viewportHeight - footerRect.top : 0;
    bottomOverlay.style.bottom = `${bottomStart}px`;
}

// Animate "closing" transition for page navigation
function closeTransition(callback) {
    const header = document.querySelector('header');
    const viewportHeight = window.innerHeight;
    const targetHeight = (viewportHeight - header.offsetHeight) / 2;

    setOverlayPositions();

    // start from height 0
    topOverlay.style.transition = 'none';
    bottomOverlay.style.transition = 'none';
    topOverlay.style.height = '0px';
    bottomOverlay.style.height = '0px';

    // Force browser to register initial height
    requestAnimationFrame(() => {
        topOverlay.style.transition = 'height 0.6s ease';
        bottomOverlay.style.transition = 'height 0.6s ease';
        topOverlay.style.height = `${targetHeight}px`;
        bottomOverlay.style.height = `${targetHeight}px`;
    });

    setTimeout(() => {
        if (callback) callback();
    }, 600);
}

// Animate "opening" transition on page load (bars collapse outward)
function openTransition() {
    const header = document.querySelector('header');
    const viewportHeight = window.innerHeight;
    const targetHeight = (viewportHeight - header.offsetHeight) / 2;

    setOverlayPositions();

    // start overlays at full height
    topOverlay.style.height = `${targetHeight}px`;
    bottomOverlay.style.height = `${targetHeight}px`;
    topOverlay.style.transition = 'none';
    bottomOverlay.style.transition = 'none';

    // Animate open to 0
    requestAnimationFrame(() => {
        topOverlay.style.transition = 'height 0.6s ease';
        bottomOverlay.style.transition = 'height 0.6s ease';
        topOverlay.style.height = '0px';
        bottomOverlay.style.height = '0px';
    });
}

// Trigger open animation on page load
window.addEventListener('DOMContentLoaded', openTransition);

// Attach close transition to links
document.querySelectorAll('a').forEach(link => {
    if (link.target === '_blank' || link.href.startsWith('mailto:')) return;

    link.addEventListener('click', e => {
        e.preventDefault();
        closeTransition(() => window.location.href = link.href);
    });
});

// Update overlay positions on resize
window.addEventListener('resize', setOverlayPositions);
