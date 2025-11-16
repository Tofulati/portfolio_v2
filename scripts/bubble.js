document.addEventListener('DOMContentLoaded', () => {
    const bubble = document.createElement('div');
    bubble.id = 'cursor-bubble';
    document.body.appendChild(bubble);

    let mouseX = 0, mouseY = 0;
    let bubbleX = 0, bubbleY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        bubbleX += (mouseX - bubbleX); 
        bubbleY += (mouseY - bubbleY);
        bubble.style.transform = `translate(${bubbleX}px, ${bubbleY}px) translate(-50%, -50%)`;
        requestAnimationFrame(animate);
    }

    animate();

    document.addEventListener('mousedown', () => {
        bubble.style.width = '50px';
        bubble.style.height = '50px';
    });
    document.addEventListener('mouseup', () => {
        bubble.style.width = '30px';
        bubble.style.height = '30px';
    });
});
