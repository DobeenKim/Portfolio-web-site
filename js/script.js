let openButton = document.querySelector(".menu__icon");
let closeButton = document.querySelector(".close_icon");
let openedMenu = document.querySelector(".opened_menu ");

openButton.addEventListener("click",() => {
  openedMenu.classList.add("on")
  document.body.style.overflow = `hidden`;
});

closeButton.addEventListener("click",() => {
openedMenu.classList.remove("on")
document.body.style.overflow = `auto`
});


// move to section
let contactBtn = document.querySelector(".contactBtn")
let aboutBtn = document.querySelector(".aboutBtn")
let viewBtn = document.querySelector(".experience_button")

function scrollToSection(e, target) {
  const section = document.querySelector(target);
  const menuPage = document.querySelector(".opened_menu");

  if (menuPage) {
    menuPage.classList.remove("on");
    document.body.style.overflow = "auto";
  }

  if (section) {
    e.preventDefault();
    let goTo = section.offsetTop;
    window.scroll({
      top : goTo,
      behavior :`smooth`
    });
  } else {

    if(target === "#projects_section") {
      window.location.href = `project.html${target}`;
    } else {
      window.location.href = `index.html${target}`
    }
  } 
}
if (aboutBtn) aboutBtn.onclick = (e) => scrollToSection(e, "#about__section");
if (contactBtn) contactBtn.onclick = (e) => scrollToSection(e, "#contact");
if (viewBtn) viewBtn.onclick = (e) => scrollToSection(e, "#projects_section");



// skill section icon animation
gsap.registerPlugin(ScrollTrigger);

let mm = gsap.matchMedia();

mm.add({
  isMobile: "(max-width: 767px)",
  isTablet: "(min-width: 768px)",
  isLaptop : "(min-width : 1024px)",
  isWideLaptop : "(min-width : 1440px)",
  isSuperwideLaptop : "(min-width : 1920px)"

}, (context) => {
  let { isMobile, isTablet, isLaptop, isWideLaptop, isSuperwideLaptop} = context.conditions;

  gsap.to(".skill_icon_box p", {
    scrollTrigger: {
      trigger: ".coading_Dobeen_img",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
    opacity: 1,
    scale: 1,

    y: (i) => {
      if(isSuperwideLaptop) return [-480, -350, -600, -430, -670, -320][i] //isSuperwideLaptop
      if(isWideLaptop) return [-580, -450, -700, -530, -670, -420][i]; //isWideLaptop
      if(isLaptop) return [-540, -400, -640, -540, -620, -470][i]; //isLaptop
      if(isTablet) return [-500, -450, -600, -450, -500, -450][i]; // isTablet 
      return [-150, -100, -210, -170, -250, -125][i]; // ismobile
    },
    x: (i) => {
      if(isWideLaptop) return [-430, -230, -180, 80, 280, 380][i]; //isWideLaptop
      if(isLaptop) return [-300, -150, -200, 50, 250, 300][i]; // isLaptop 
      if(isTablet) return [-300, -180, -100, 0, 150, 250][i]; // isTablet
      return [-120, -55, -70, 10, 70, 100][i]; // ismobile
    },
    duration: 1,
    stagger: 0.1
  });
});

// moving animation
const elements = document.querySelectorAll(`.moveImg`);

const items = Array.from(elements).map(() =>({
  posX : Math.random() * 40,
  posY : Math.random() * 50,
  dirX : Math.random() > 0.5 ? 1 : -1,
  dirY : Math.random() > 0.5 ? 1 : -1,
  speedX : 0.001 + Math.random() * 0.07,
  speedY : 0.001 + Math.random() * 0.07
}));

const floatAmountX = 50;
const floatAmountY = 50;

function animate() {
  elements.forEach((el, index) => {
    const item = items[index];

    item.posX += item.dirX * item.speedX;
    if (item.posX >= floatAmountX || item.posX <= 0) {
      item.dirX *= -1;
    }

    item.posY += item.dirY * item.speedY;
    if (item.posY >= floatAmountY || item.posY <= 0) {
      item.dirY *= -1;
    }

    el.style.transform = `translate(${item.posX}px, ${item.posY}px)`;
  });

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate)

// API
const username = `DobeenKim`
const url = `https://api.github.com/users/${username}/repos?sort=updated`;

const container = document.getElementById("projects_section")

const fetchData = async() => {

  try {
    const fetchWord = await fetch(url)

    if (!fetchWord.ok) {
      throw new Error("no network")
    }

    const jsonData = await fetchWord.json()

    jsonData.forEach((repo) => {
      container.innerHTML += `
        <div class="container">
          <p class="project_img">
            <img src="./img/${repo.name}.svg" alt="${repo.name}" width="300px" height="auto">
          </p>
          <div class= "text_box"> 
            <h2 class ="name">${repo.name}</h2>
            ${repo.homepage ? `
            <p class ="viewBtn"><a href="${repo.homepage}" target="_blank" rel="noopener">View Project</a><p>
            ` : '<span>No Link</span>'}
            ${repo.description ?`
            <p class = "description">${repo.description} </p>` : `No description`}
          </div>
        </div>
      `;
    })

  displayResults(jsonData)
  } catch(error) {
    console.log(error)
  }
}
fetchData()



// typing animation (scrolla)
gsap.registerPlugin(ScrollTrigger);

const text = new SplitType('.about_text p', { types: 'chars' });

gsap.from(text.chars, {
  scrollTrigger: {
    trigger: ".about_text", 
    start: "top 85%",       
    end: "bottom 100%",      
    scrub: 1,                        
  },
  opacity: 0,             
  stagger: 0.5,             
  duration: 1
});

