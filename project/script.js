/* =============================================
   FitLife Gym - JavaScript
   Dynamic Functionality & Interactions
   ============================================= */

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Initialize page-specific functionality
    if (document.getElementById('classesContainer')) {
        initializeClassesPage();
    }
    
    if (document.getElementById('contactForm')) {
        initializeContactForm();
    }

    // Smooth scroll for anchor links
    initializeSmoothScroll();
});

/* =============================================
   Classes Data
   ============================================= */

const classes = [
    {
        id: 1,
        name: 'Yoga Flow',
        category: 'flexibility',
        time: '6:00 AM - 7:00 AM',
        duration: '60 min',
        trainer: 'Lisa Rodriguez',
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop',
        description: 'Improve flexibility and mindfulness with our relaxing yoga sessions.'
    },
    {
        id: 2,
        name: 'HIIT Bootcamp',
        category: 'cardio',
        time: '7:00 AM - 8:00 AM',
        duration: '45 min',
        trainer: 'Marcus Johnson',
        image: 'https://images.pexels.com/photos/3775164/pexels-photo-3775164.jpeg?w=400&h=300&fit=crop',
        description: 'High-intensity interval training for maximum calorie burn.'
    },
    {
        id: 3,
        name: 'CrossFit',
        category: 'strength',
        time: '8:00 AM - 9:00 AM',
        duration: '60 min',
        trainer: 'Marcus Johnson',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop',
        description: 'Functional fitness combining weightlifting, gymnastics, and cardio.'
    },
    {
        id: 4,
        name: 'Zumba Party',
        category: 'cardio',
        time: '5:00 PM - 6:00 PM',
        duration: '50 min',
        trainer: 'Emma Wilson',
        image: 'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=400&h=300&fit=crop',
        description: 'Dance your way to fitness with energetic Latin-inspired moves.'
    },
    {
        id: 5,
        name: 'Boxing Basics',
        category: 'cardio',
        time: '6:00 PM - 7:00 PM',
        duration: '55 min',
        trainer: 'Alex Chen',
        image: 'https://images.pexels.com/photos/8810062/pexels-photo-8810062.jpeg?w=400&h=300&fit=cropfit=crop',
        description: 'Learn boxing techniques while getting an amazing cardio workout.'
    },
    {
        id: 6,
        name: 'Pilates Core',
        category: 'flexibility',
        time: '4:00 PM - 5:00 PM',
        duration: '50 min',
        trainer: 'Lisa Rodriguez',
        image: 'https://images.pexels.com/photos/13849152/pexels-photo-13849152.jpeg?w=400&h=300&fit=crop',
        description: 'Strengthen your core and improve posture with controlled movements.'
    },
    {
        id: 7,
        name: 'Weight Training',
        category: 'strength',
        time: '7:00 AM - 8:30 AM',
        duration: '90 min',
        trainer: 'Alex Chen',
        image: 'https://images.pexels.com/photos/5327487/pexels-photo-5327487.jpeg?w=400&h=300&fit=crop',
        description: 'Build muscle and strength with expert guidance on proper form.'
    },
    {
        id: 8,
        name: 'Spin Class',
        category: 'cardio',
        time: '6:30 AM - 7:30 AM',
        duration: '45 min',
        trainer: 'Emma Wilson',
        image: 'https://images.pexels.com/photos/4162582/pexels-photo-4162582.jpeg?w=400&h=300&fit=cropfit=crop',
        description: 'Indoor cycling class with motivating music and high energy.'
    }
];

/* =============================================
   Classes Page Functionality
   ============================================= */

function initializeClassesPage() {
    renderClasses(classes);
    setupFilterButtons();
    setupSearchInput();
}

function renderClasses(classesToRender) {
    const container = document.getElementById('classesContainer');
    container.innerHTML = '';

    classesToRender.forEach((fitnessClass, index) => {
        const classCard = document.createElement('div');
        classCard.className = 'col-lg-4 col-md-6 class-card-wrapper';
        classCard.setAttribute('data-aos', 'fade-up');
        classCard.setAttribute('data-aos-delay', (index * 100).toString());

        classCard.innerHTML = `
            <div class="class-card" data-category="${fitnessClass.category}">
                <div class="class-image">
                    <img src="${fitnessClass.image}" alt="${fitnessClass.name}">
                </div>
                <div class="class-info">
                    <span class="class-category">${capitalizeFirstLetter(fitnessClass.category)}</span>
                    <h4>${fitnessClass.name}</h4>
                    <div class="class-details">
                        <span><i class="fas fa-clock"></i> ${fitnessClass.duration}</span>
                        <span><i class="fas fa-user"></i> ${fitnessClass.trainer}</span>
                    </div>
                    <p class="class-description">${fitnessClass.description}</p>
                    <div class="class-details">
                        <span><i class="fas fa-calendar"></i> ${fitnessClass.time}</span>
                    </div>
                    <button class="class-btn" onclick="showEnrollmentModal()">Enroll Now</button>
                </div>
            </div>
        `;

        container.appendChild(classCard);
    });

    // Reinitialize AOS for new elements
    AOS.refresh();
}

function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter classes
            filterClasses(filterValue);
        });
    });
}

function filterClasses(category) {
    const cards = document.querySelectorAll('.class-card');
    
    cards.forEach(card => {
        if (category === 'all') {
            card.parentElement.style.display = 'block';
            card.parentElement.classList.remove('hidden');
        } else {
            if (card.getAttribute('data-category') === category) {
                card.parentElement.style.display = 'block';
                card.parentElement.classList.remove('hidden');
            } else {
                card.parentElement.style.display = 'none';
                card.parentElement.classList.add('hidden');
            }
        }
    });
}

function setupSearchInput() {
    const searchInput = document.getElementById('searchInput');
    
    if (searchInput) {
        searchInput.addEventListener('keyup', function() {
            const searchTerm = this.value.toLowerCase();
            const cards = document.querySelectorAll('.class-card');
            
            cards.forEach(card => {
                const className = card.querySelector('h4').textContent.toLowerCase();
                const trainerName = card.querySelector('.class-details:nth-of-type(1) span:nth-child(2)').textContent.toLowerCase();
                const description = card.querySelector('.class-description').textContent.toLowerCase();
                
                if (className.includes(searchTerm) || trainerName.includes(searchTerm) || description.includes(searchTerm)) {
                    card.parentElement.style.display = 'block';
                    card.parentElement.classList.remove('hidden');
                } else {
                    card.parentElement.style.display = 'none';
                    card.parentElement.classList.add('hidden');
                }
            });
        });
    }
}

function showEnrollmentModal() {
    const enrollmentModal = new bootstrap.Modal(document.getElementById('enrollmentModal'));
    enrollmentModal.show();
}

/* =============================================
   Contact Form Validation
   ============================================= */

function initializeContactForm() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous errors
        clearErrors();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const goal = document.getElementById('goal').value;
        
        // Validate form
        let isValid = true;
        
        // Validate name
        if (name === '') {
            showError('name', 'Name cannot be empty');
            isValid = false;
        }
        
        // Validate email
        if (!isValidEmail(email)) {
            showError('email', 'Please enter a valid email');
            isValid = false;
        }
        
        // Validate phone
        if (!isValidPhone(phone)) {
            showError('phone', 'Please enter a valid phone number');
            isValid = false;
        }
        
        // Validate goal
        if (goal === '') {
            showError('goal', 'Please select a membership goal');
            isValid = false;
        }
        
        // If valid, show success message
        if (isValid) {
            showSuccessAlert();
            form.reset();
            
            // Clear success message after 5 seconds
            setTimeout(() => {
                document.getElementById('alertContainer').innerHTML = '';
            }, 5000);
        }
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    // Remove common phone formatting characters
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    // Check if it's at least 10 digits
    return /^\d{10,}$/.test(cleanPhone);
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + 'Error');
    
    field.classList.add('is-invalid');
    errorElement.classList.remove('d-none');
    errorElement.textContent = message;
}

function clearErrors() {
    const fields = ['name', 'email', 'phone', 'goal'];
    
    fields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(fieldId + 'Error');
        
        field.classList.remove('is-invalid');
        errorElement.classList.add('d-none');
    });
}

function showSuccessAlert() {
    const alertContainer = document.getElementById('alertContainer');
    
    const alert = document.createElement('div');
    alert.className = 'alert alert-success';
    alert.innerHTML = `
        <i class="fas fa-check-circle"></i> 
        <strong>Success!</strong> Your inquiry has been sent. We'll contact you soon!
    `;
    
    alertContainer.innerHTML = '';
    alertContainer.appendChild(alert);
}

/* =============================================
   Smooth Scroll for Anchor Links
   ============================================= */

function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                
                const target = document.querySelector(href);
                const offsetTop = target.offsetTop - 80; // Account for sticky navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* =============================================
   Utility Functions
   ============================================= */

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/* =============================================
   Navbar Background on Scroll
   ============================================= */

window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15)';
    }
});

/* =============================================
   Mobile Menu Close on Link Click
   ============================================= */

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                    toggle: false
                });
                bsCollapse.hide();
            }
        });
    });
});
