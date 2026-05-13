// NAVBAR SCROLL

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {

  if(window.scrollY > 50){
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

});


// ANIMAÇÃO DAS SECTIONS

const sections = document.querySelectorAll('.section');

function revealSections(){

  sections.forEach(section => {

    const sectionTop = section.getBoundingClientRect().top;

    if(sectionTop < window.innerHeight - 100){
      section.classList.add('show');
    }

  });

}

window.addEventListener('scroll', revealSections);

revealSections();


// SIDE NAV ATIVA

const navDots = document.querySelectorAll('.dot');

window.addEventListener('scroll', () => {

  let current = '';

  sections.forEach(section => {

    const sectionTop = section.offsetTop;

    if(scrollY >= sectionTop - 300){
      current = section.getAttribute('id');
    }

  });

  navDots.forEach(dot => {

    dot.classList.remove('active');

    if(dot.getAttribute('href') === `#${current}`){
      dot.classList.add('active');
    }

  });

});