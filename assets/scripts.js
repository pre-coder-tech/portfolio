document.addEventListener("DOMContentLoaded", function() {
  window.addEventListener("scroll", function() {
    var scroll = window.scrollY || document.documentElement.scrollTop;
    console.log(scroll);
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

// Fetch project data dynamically from the JSON file
async function fetchProjectData() {
  try {
    const response = await fetch("assets/projects.json"); // Path to your JSON file
    const data = await response.json();
    return data.projects;
  } catch (error) {
    console.error("Error fetching project data:", error);
    return null;
  }
}

// Function to open the modal
async function openModal(projectKey) {
  const projects = await fetchProjectData();
  if (!projects || !projects[projectKey]) {
    console.error("Project not found:", projectKey);
    return;
  }

  const project = projects[projectKey];

  // Set modal content
  document.getElementById("modalTitle").innerText = project.title;
  document.getElementById("modalType").innerText = project.type;
  document.getElementById("modalTechnologies").innerText = project.technologies;
  const repoLink = document.getElementById("modalRepo");
  repoLink.href = project.repo;
  repoLink.style.display = project.repo ? "inline" : "none";

  // Populate the slider
  const slider = document.getElementById("modalSlider");
  slider.innerHTML = ""; // Clear previous content

  // Add videos first
  project.videos.forEach((videoUrl) => {
    const videoElement = document.createElement("video");
    videoElement.src = videoUrl;
    videoElement.controls = true; // Add playback controls
    videoElement.className = "slider-item";
    slider.appendChild(videoElement);
  });

  // Add images
  project.images.forEach((imageUrl) => {
    const imgElement = document.createElement("img");
    imgElement.src = imageUrl;
    imgElement.alt = project.title;
    imgElement.className = "slider-item";
    slider.appendChild(imgElement);
  });

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
