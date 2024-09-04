/*==================== OPEN AND CLOSE MENU (MOBILE) ====================*/
// Defining constant variables:
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    })
}

/*==================== CLOSE MENU WHEN SELECT A NAV (MOBILE) ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SKILLS TABS ====================*/
const skillsContent = document.getElementsByClassName('skills__content'),
      skillsHeader = document.querySelectorAll('.skills__header')

function toggleSkills() {
    let itemClass = this.parentNode.className

    // For loop to iterate through all elements with 'skill__content' class
    // Close all the skills
    // for (i = 0; i < skillsContent.length; i++) {
    //     skillsContent[i].className = 'skills__content skills__close'
    // }
    
    // Open/close only the selected skill
    if (itemClass === 'skills__content skills__close') {
        this.parentNode.className = 'skills__content skills__open'
    }
    else if (itemClass === 'skills__content skills__open') {
        this.parentNode.className = 'skills__content skills__close'
    }
}

// forEach so that will apply to ALL elements with '.skills__header' selector
skillsHeader.forEach((el) => {
    el.addEventListener('click', toggleSkills)
})

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]')

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target)

        tabContents.forEach(tabContent => {
            tabContent.classList.remove('qualification__active')
        })
        target.classList.add('qualification__active')

        tabs.forEach(tab => {
            tab.classList.remove('qualification__active')
        })
        tab.classList.add('qualification__active')
    })
})

/*==================== SERVICES MODAL ====================*/
const modalViews = document.querySelectorAll('.services__modal'),
      modalBtns = document.querySelectorAll('.services__button'),
      modalCloses = document.querySelectorAll('.services__modal-close')

let openModal = function(modalClick) {
    modalViews[modalClick].classList.add('active-modal')
}

let closeModal = function(modalClick) {
    modalViews[modalClick].classList.remove('active-modal')
}

modalBtns.forEach((modalBtn, i) => {
    modalBtn.addEventListener('click', () => {
        openModal(i)    // perform the above function 'modal' when clicked
    })
})

// modalCloses.forEach((modalClose, i) => {
//     modalClose.addEventListener('click', () => {
//         closeModal(i)
//     })
// })

modalCloses.forEach((modalClose) => {
    modalClose.addEventListener('click', () => {
        modalViews.forEach((modalView) => {
            modalView.classList.remove('active-modal')
        })
    })
})

/*==================== PORTFOLIO SWIPER  ====================*/
let swiperPortfolio = new Swiper(".portfolio__container", {
    cssMode: true,

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
});

/*==================== TESTIMONIAL ====================*/
let swiperTestimonial = new Swiper(".testimonial__container", {
    loop: true,
    grabCursor: true,
    spaceBetween: 48,

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    breakpoints: {
        568: {
            slidesPerView: 1,
        }
    }
});

/*==================== CONTACT ====================*/
// Set hyperlink tag as a submit button.
document.getElementById("contact-submit").onclick = function(e) {
    document.getElementById("contact-form").submit();
    document.getElementById("contact-form").reset();
    // To prevent the page from scrolling to top
    e.preventDefault();
}

// Default submit button action
document.getElementById("contact-form").action = "mailto:jasonchn18@gmail.com";

// If there is input in the Subject field:
let subject = document.getElementById("contact-form-subject");

document.getElementById("contact-form-subject").onchange = function() {
    subject = document.getElementById("contact-form-subject");
    document.getElementById("contact-form").action = "mailto:yechengofficial@gmail.com?Subject="+subject.value;
}

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
    // const scrollY = window.pageYOffset   //pageYOffset is deprecated, legacy alias of scrollY
    const scrollY = window.scrollY

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }
        else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}

window.addEventListener('scroll', scrollActive)

/*==================== CHANGE BACKGROUND HEADER ====================*/ 
function scrollHeader() {
    const nav = document.getElementById('header')
    // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
    if (this.scrollY >= 80) { nav.classList.add('scroll-header'); }
    else { nav.classList.remove('scroll-header') }
}

window.addEventListener('scroll', scrollHeader)

/*==================== SHOW SCROLL UP ====================*/ 
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 560 viewport height, 
        // add the show-scroll class to the a tag with the scroll-top id
    if (this.scrollY >= 560) { scrollUp.classList.add('show-scroll'); }
    else { scrollUp.classList.remove('show-scroll') }
}

window.addEventListener('scroll', scrollUp)

/*==================== HIDE SCROLL DOWN ====================*/ 
function homeScroll() {
    const homeScroll = document.getElementById('home-scroll');
    // When the scroll is higher than 200 viewport height, 
        // add the hide-home-scroll class to the a tag with the home-scroll id
    if (this.scrollY >= 250) { homeScroll.classList.add('hide-home-scroll'); }
    else { homeScroll.classList.remove('hide-home-scroll') }
}

window.addEventListener('scroll', homeScroll)

/*==================== DARK LIGHT THEME ====================*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'

// Previously selected theme (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// Obtain the current theme that the interface has, by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

// Validate if user previously chose a theme
if (selectedTheme) {
    // If true, check whether to activate or deactivate the dark theme
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate/deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add/remove the dark/icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // Save the theme and current icon chosen by user
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})