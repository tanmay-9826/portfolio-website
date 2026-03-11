// 1. Grab all the buttons and all the sections
const navButtons = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('section');

// 2. Loop through every button
navButtons.forEach(button => {
    
    // 3. Listen for a 'click' on each button
    button.addEventListener('click', () => {
        
        // Remove 'active' class from ALL buttons
        navButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add 'active' class to the button we just clicked
        button.classList.add('active');

        // Hide ALL sections
        sections.forEach(section => section.classList.remove('active-section'));

        // Find the target section from our button's "data-target" and show it!
        const targetId = button.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active-section');
    });
});

// Cursor Glow Effect
const cursorGlow = document.querySelector('.cursor-glow');

document.addEventListener('mousemove', (e) => {
    // Update the position of the glow to match the mouse coordinates
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});