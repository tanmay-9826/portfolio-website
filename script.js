// --- 1. SIDEBAR NAVIGATION LOGIC ---
const menuToggle = document.getElementById('menuToggle');
const sideNav = document.getElementById('sideNav');
const closeNav = document.getElementById('closeNav');

// Open sidebar
menuToggle.addEventListener('click', () => {
    sideNav.classList.add('open');
});

// Close sidebar
closeNav.addEventListener('click', () => {
    sideNav.classList.remove('open');
});


// --- 2. PAGE SWAPPING LOGIC (Bottom Nav & Sidebar Links) ---
// Grab BOTH the bottom buttons and the sidebar buttons
const allNavButtons = document.querySelectorAll('.nav-btn, .side-link');
const sections = document.querySelectorAll('section');

allNavButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-target');
        
        // 1. Remove active state from ALL buttons
        allNavButtons.forEach(btn => btn.classList.remove('active'));
        
        // 2. Add active state to the clicked button 
        // (Note: we only apply the dark background visual to bottom nav buttons)
        if (button.classList.contains('nav-btn')) {
            button.classList.add('active');
        }

        // 3. Hide all sections
        sections.forEach(section => section.classList.remove('active-section'));

        // 4. Show the target section
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active-section');
        }

        // 5. Close the sidebar automatically after clicking a link
        sideNav.classList.remove('open');
    });
});


// --- 3. INSTANT CURSOR TRACKING LOGIC ---
const cursorGlow = document.querySelector('.cursor-glow');

document.addEventListener('mousemove', (e) => {
    // requestAnimationFrame forces the browser to update the cursor 
    // position before the next screen repaint, removing the lag!
    requestAnimationFrame(() => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });
});

// --- 4. CINEMATIC PRELOADER LOGIC (V3 - Slide & Fade) ---
const preloader = document.getElementById('preloader');
const loaderText = document.getElementById('loader-text');
const circle = document.querySelector('.progress-ring__circle');
const avatarImg = document.querySelector('.loader-avatar-img');

// Math for the 85px radius
const radius = circle.r.baseVal.value;
const circumference = radius * 2 * Math.PI;

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = circumference;

let progress = 0;
const speed = 0.55; // Perfect 3-second boot-up speed

function setProgress(percent) {
    const offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;
    loaderText.innerText = Math.floor(percent) + '%';
}

function simulateLoading() {
    progress += speed;
    
    if (progress <= 100) {
        setProgress(progress);
        requestAnimationFrame(simulateLoading); 
    } else {
        setProgress(100);
        
        // Sequence 1: Fade out ring and text, pop the Avatar
        setTimeout(() => {
            loaderText.style.opacity = '0';
            circle.style.opacity = '0'; 
            
            avatarImg.style.opacity = '1';
            avatarImg.style.transform = 'scale(1)';
            
            // Sequence 2: Hold for a beat, calculate the target, and SLIDE
            setTimeout(() => {
                // Find exactly where the main page avatar is
                const targetAvatar = document.querySelector('.avatar');
                const targetRect = targetAvatar.getBoundingClientRect();
                const loaderRect = avatarImg.getBoundingClientRect();
                
                // Calculate the exact pixel distance to travel
                const moveX = targetRect.left - loaderRect.left;
                const moveY = targetRect.top - loaderRect.top;
                
                // Swap the animation style to a smooth slide
                avatarImg.style.transition = 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
                avatarImg.style.transform = `translate(${moveX}px, ${moveY}px) scale(1)`;
                
                // Fade out the stars while the avatar is moving
                const stars = document.querySelector('.stars-container');
                stars.style.transition = 'opacity 0.5s ease';
                stars.style.opacity = '0';
                
                // Sequence 3: Once the slide finishes, melt the black screen away
                setTimeout(() => {
                    preloader.style.opacity = '0';
                    
                    // Remove from DOM safely
                    setTimeout(() => {
                        preloader.style.visibility = 'hidden';
                    }, 800);
                }, 800); // This 800ms perfectly matches the slide animation duration
                
            }, 700); // 700ms pause to let the user see the avatar before it moves
            
        }, 300); 
    }
}

window.addEventListener('load', () => {
    simulateLoading();
});