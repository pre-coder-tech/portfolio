document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("scroll", function () {
    var scroll = window.scrollY || document.documentElement.scrollTop;
    var arrows = document.querySelector('.arrows');
    if (scroll >= 1) {
      arrows.classList.add('fade');
    } else {
      arrows.classList.remove('fade');
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const navigationMenu = document.getElementById('navigation-menu');

  // Hide the navigation menu initially
  navigationMenu.style.display = 'none';

  window.addEventListener('scroll', function () {
    // Check the scroll position
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;

    // Get the height of the first fold (viewport height)
    const viewportHeight = window.innerHeight;

    // Show navigation when user scrolls past the first fold
    if (scrollPosition > viewportHeight) {
      navigationMenu.style.display = 'block'; // Show navigation
    } else {
      navigationMenu.style.display = 'none'; // Hide navigation
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const navigationMenu = document.getElementById('navigation-menu');

  window.addEventListener('scroll', function () {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    const viewportHeight = window.innerHeight;

    if (scrollPosition > viewportHeight) {
      navigationMenu.classList.add('show');
    } else {
      navigationMenu.classList.remove('show');
    }
  });
});


document.addEventListener('DOMContentLoaded', function () {
  const sections = document.querySelectorAll('section'); // Select all sections
  const navLinks = document.querySelectorAll('#navigation-menu ul li a'); // Select all navigation links

  // Function to remove highlight class from all nav links
  const removeHighlight = () => {
    navLinks.forEach(link => link.classList.remove('highlight'));
  };

  // Function to add highlight class to the active nav link
  const addHighlight = id => {
    removeHighlight();
    const activeLink = document.querySelector(`#navigation-menu ul li a[href="#${id}"]`);
    if (activeLink) {
      activeLink.classList.add('highlight');
    }
  };

  // Intersection Observer options
  const observerOptions = {
    root: null, // Use the viewport as the root
    threshold: 0.2, // 50% of the section should be visible
  };

  // Intersection Observer callback
  const observerCallback = entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        addHighlight(entry.target.id);
      }
    });
  };

  // Create Intersection Observer
  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Observe each section
  sections.forEach(section => {
    if (section.id) observer.observe(section);
  });
});


document.addEventListener('DOMContentLoaded', function () {
  const iconBar = document.querySelector('.icon-bar'); // Select the icon bar
  const secondTab = document.querySelector('#about'); // Replace '#about' with the ID of your second section

  // Initially hide the icon bar using opacity and visibility
  iconBar.style.opacity = '0';
  iconBar.style.visibility = 'hidden';

  window.addEventListener('scroll', function () {
    // Get the position of the second tab
    const secondTabPosition = secondTab.offsetTop;

    // Get the current scroll position
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;

    // Show the icon bar with a smooth transition
    if (scrollPosition >= secondTabPosition) {
      iconBar.style.opacity = '1';
      iconBar.style.visibility = 'visible';
    } else {
      iconBar.style.opacity = '0';
      iconBar.style.visibility = 'hidden';
    }
  });
});

// Fetch certificates data dynamically from the JSON file
async function fetchCertificatesData() {
  try {
    const response = await fetch("https://pre-coder-tech.github.io/assets/certificates.json"); // Path to your JSON file
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching project data:", error);
    return null;
  }
};

async function createCertificateCarousel() {
  const certificates = await fetchCertificatesData();
  if (!certificates) return;

  const certificateList = document.getElementById("certificates");
  certificateList.innerHTML = ""; // Clear previous content

  Object.keys(certificates).forEach(certificateKey => {
    const certificate = certificates[certificateKey];
    const imgElement = document.createElement("img");
    imgElement.src = certificate.card_image;
    imgElement.alt = certificate.title;

    certificateList.appendChild(imgElement);
  });
}

createCertificateCarousel();

// Fetch project data dynamically from the JSON file
async function fetchProjectData() {
  try {
    const response = await fetch("https://pre-coder-tech.github.io/assets/projects.json"); // Path to your JSON file
    const data = await response.json();
    return data.projects;
  } catch (error) {
    console.error("Error fetching project data:", error);
    return null;
  }
};


async function createProjectCarousel() {
  const projects = await fetchProjectData();
  if (!projects) return;

  const projectList = document.getElementById("projectsCarousel");
  projectList.innerHTML = ""; // Clear previous content

  Object.keys(projects).forEach(projectKey => {
    const project = projects[projectKey];

    const carouselItem = document.createElement("div");
    carouselItem.className = "pro";
    carouselItem.onclick = () => openModal(projectKey);

    const imgElement = document.createElement("img");
    imgElement.src = project.card_image;
    imgElement.alt = project.title;

    const conElement = document.createElement("div");
    conElement.className = "con";
    const titleElement = document.createElement("p");
    titleElement.style.fontSize = "medium";
    titleElement.textContent = project.title;

    conElement.appendChild(titleElement);
    carouselItem.appendChild(imgElement);
    carouselItem.appendChild(conElement);
    projectList.appendChild(carouselItem);
  });
}

createProjectCarousel();

// Function to open the modal
async function openModal(projectKey) {
  const projects = await fetchProjectData();
  if (!projects || !projects[projectKey]) {
    console.error("Project not found:", projectKey);
    return;
  }

  const project = projects[projectKey];

  // Populate the slider
  const slider = document.getElementById("modalContent");
  slider.innerHTML = ""; // Clear previous content

  let count = 0;
  let totalSlides = project.videos.length + project.images.length;

  // Add videos first
  project.videos.forEach((videoUrl) => {
    const mySlidesElement = document.createElement("div")
    mySlidesElement.className = "mySlides fadeIn";
    if (count == 0) { mySlidesElement.style.display = "block"; } else { mySlidesElement.style.display = "none"; }
    const numberElement = document.createElement("div");
    numberElement.className = "numbertext";
    numberElement.innerText = `${++count} / ${totalSlides}`;
    const videoElement = document.createElement("video");
    videoElement.src = videoUrl;
    videoElement.autoplay = true;
    videoElement.muted = true;
    videoElement.loop = true;
    videoElement.className = "project-media";
    videoElement.style.width = "100%";
    videoElement.style.borderRadius = "1rem";
    mySlidesElement.appendChild(numberElement);
    mySlidesElement.appendChild(videoElement);
    slider.appendChild(mySlidesElement);
  });

  // Add images
  project.images.forEach((imageUrl) => {
    const mySlidesElement = document.createElement("div")
    mySlidesElement.className = "mySlides fadeIn";
    if (count == 0) { mySlidesElement.style.display = "block"; } else { mySlidesElement.style.display = "none"; }
    const numberElement = document.createElement("div");
    numberElement.className = "numbertext";
    numberElement.innerText = `${++count} / ${totalSlides}`;
    const imgElement = document.createElement("img");
    imgElement.src = imageUrl;
    imgElement.alt = project.title;
    imgElement.className = "project-media";
    imgElement.style.width = "100%";
    imgElement.style.borderRadius = "1rem";
    mySlidesElement.appendChild(numberElement);
    mySlidesElement.appendChild(imgElement);
    slider.appendChild(mySlidesElement);
  }); scroll

  const textContentElement = document.createElement("div");
  textContentElement.className = "text";

  const titleSpanElement = document.createElement("span");
  titleSpanElement.style.fontSize = "x-large";
  titleSpanElement.innerText = project.title;
  textContentElement.appendChild(titleSpanElement);

  textContentElement.appendChild(document.createElement("br"));

  const shortDescSpanElement = document.createElement("span");
  shortDescSpanElement.style.fontSize = "small";
  shortDescSpanElement.innerText = project.type + " | " + project.technologies;
  textContentElement.appendChild(shortDescSpanElement);

  textContentElement.appendChild(document.createElement("br"));
  textContentElement.appendChild(document.createElement("br"));

  const descriptionSpanElement = document.createElement("span");
  descriptionSpanElement.innerText = project.description;
  textContentElement.appendChild(descriptionSpanElement);

  const repoLinkElement = document.createElement("a");
  repoLinkElement.href = project.repo;
  repoLinkElement.target = "_blank";
  repoLinkElement.innerText = "Repository";
  repoLinkElement.style.display = project.repo ? "inline" : "none";
  repoLinkElement.style.textDecoration = "none";
  textContentElement.appendChild(repoLinkElement);

  slider.appendChild(textContentElement);

  const leftArrowElement = document.createElement("a");
  leftArrowElement.className = "prev";
  leftArrowElement.innerText = "❮";
  leftArrowElement.onclick = () => plusSlides(-1);
  if (totalSlides == 1) { leftArrowElement.style.display = "none"; }
  slider.appendChild(leftArrowElement);

  const rightArrowElement = document.createElement("a");
  rightArrowElement.className = "next";
  rightArrowElement.innerText = "❯";
  rightArrowElement.onclick = () => plusSlides(1);
  if (totalSlides == 1) { rightArrowElement.style.display = "none"; }
  slider.appendChild(rightArrowElement);


  // Show the modal
  document.getElementById("projectModal").style.display = "block";
}

// Function to close the modal
function closeModal() {
  document.getElementById("projectModal").style.display = "none";
}

// Close modal if clicked outside the modal content
window.onclick = function (event) {
  const modal = document.getElementById("projectModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

// Close modal when pressing the "Esc" key
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
});

let slideIndex = 1;

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "block";
}