document.addEventListener("DOMContentLoaded", () => {
  loadProjects();
  loadProjectPage();
});

/* =========================
   Home Page Projects
========================= */
function loadProjects() {
  const grid = document.getElementById("projectGrid");
  if (!grid) return;

  fetch("data/projects.json")
    .then(res => res.json())
    .then(projects => {
      renderProjects(projects);
      enableMobileTapBehavior();
    });
}

function renderProjects(projects) {
  const grid = document.getElementById("projectGrid");

  projects.forEach(project => {
    const card = document.createElement("a");
    card.className = "project-card";
    card.href = project.link;

    card.innerHTML = `
      <img src="${project.image}" alt="${project.title}">
      <div class="project-overlay">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
      </div>
    `;

    if (project.link.startsWith("http")) {
      card.target = "_blank";
      card.rel = "noopener noreferrer";
    }

    grid.appendChild(card);
  });
}

/* =========================
   Mobile Tap Logic (REAL)
========================= */
function enableMobileTapBehavior() {
  if (window.matchMedia("(hover: hover)").matches) return;

  let activeCard = null;

  document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", e => {
      if (activeCard !== card) {
        e.preventDefault();

        if (activeCard) {
          activeCard.classList.remove("active");
        }

        card.classList.add("active");
        activeCard = card;
      }
      // else: second tap → allow navigation
    });
  });

  // Tap outside to close
  document.addEventListener("click", e => {
    if (!e.target.closest(".project-card") && activeCard) {
      activeCard.classList.remove("active");
      activeCard = null;
    }
  });
}

/* =========================
   Project Page Loader
========================= */
function loadProjectPage() {
  const container = document.getElementById("projectContent");
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const projectId = params.get("project");

  fetch("data/projects.json")
    .then(res => res.json())
    .then(projects => {
      const project = projects.find(p => p.id === projectId);
      if (!project) return;

      container.innerHTML = `
        <h2>${project.title}</h2>
        <img src="${project.image}" style="max-width:100%; border-radius:12px; margin-bottom:16px;">
        <p>${project.description}</p>
      `;
    });
}
