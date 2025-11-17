document.addEventListener("DOMContentLoaded", () => {

    const topOverlay = document.createElement('div');
    topOverlay.className = 'page-transition-top';
    const bottomOverlay = document.createElement('div');
    bottomOverlay.className = 'page-transition-bottom';
    document.body.appendChild(topOverlay);
    document.body.appendChild(bottomOverlay);

    function setOverlayPositions() {
        const header = document.querySelector('header');
        const footer = document.querySelector('footer');
        if (!header || !footer) return;

        const viewportHeight = window.innerHeight;
        topOverlay.style.top = `${header.offsetHeight}px`;

        const footerRect = footer.getBoundingClientRect();
        const footerInView = footerRect.top < viewportHeight && footerRect.bottom >= 0;
        const bottomStart = footerInView ? viewportHeight - footerRect.top : 0;
        bottomOverlay.style.bottom = `${bottomStart}px`;
    }

    function closeTransition(callback) {
        const header = document.querySelector('header');
        if (!header) return;

        const viewportHeight = window.innerHeight;
        const targetHeight = (viewportHeight - header.offsetHeight) / 2;

        setOverlayPositions();

        topOverlay.style.transition = 'none';
        bottomOverlay.style.transition = 'none';
        topOverlay.style.height = '0px';
        bottomOverlay.style.height = '0px';

        requestAnimationFrame(() => {
            topOverlay.style.transition = 'height 0.6s ease';
            bottomOverlay.style.transition = 'height 0.6s ease';
            topOverlay.style.height = `${targetHeight}px`;
            bottomOverlay.style.height = `${targetHeight}px`;
        });

        setTimeout(() => callback?.(), 600);
    }

    function openTransition() {
        const header = document.querySelector('header');
        if (!header) return;

        const viewportHeight = window.innerHeight;
        const targetHeight = (viewportHeight - header.offsetHeight) / 2;

        setOverlayPositions();

        topOverlay.style.transition = 'none';
        bottomOverlay.style.transition = 'none';
        topOverlay.style.height = `${targetHeight}px`;
        bottomOverlay.style.height = `${targetHeight}px`;

        requestAnimationFrame(() => {
            topOverlay.style.transition = 'height 0.6s ease';
            bottomOverlay.style.transition = 'height 0.6s ease';
            topOverlay.style.height = '0px';
            bottomOverlay.style.height = '0px';
        });
    }

    openTransition();

    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', e => {
            const url = new URL(link.href);

            if (
                link.target === '_blank' ||
                url.protocol === 'mailto:' ||
                url.hash ||
                url.host !== window.location.host
            ) return; 

            e.preventDefault();
            closeTransition(() => window.location.href = link.href);
        });
    });

    window.addEventListener('resize', setOverlayPositions);
});
