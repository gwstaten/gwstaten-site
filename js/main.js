document.addEventListener("DOMContentLoaded", () => {
  loadProjects();
  loadProjectPage();
});

/* =========================
   Load Projects (Home Page)
========================= */
function loadProjects() {
  const grid = document.getElementById("projectGrid");
  if (!grid) return;

  fetch("data/projects.json")
    .then(res => res.json())
    .then(projects => {
      renderProjects(projects);
      enableMobileTapBehavior();
    })
    .catch(err => console.error("Failed to load projects:", err));
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
   Mobile Tap Logic
========================= */
function enableMobileTapBehavior() {
  if (!("ontouchstart" in window)) return;

  document.querySelectorAll(".project-card").forEach(card => {
    let armed = false;

    card.addEventListener("click", e => {
      if (!armed) {
        e.preventDefault();

        // Close other cards
        document.querySelectorAll(".project-card.active")
          .forEach(c => c.classList.remove("active"));

        card.classList.add("active");
        armed = true;

        setTimeout(() => {
          armed = false;
        }, 1500);
      }
    });
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
  if (!projectId) return;

  fetch("data/projects.json")
    .then(res => res.json())
    .then(projects => {
      const project = projects.find(p => p.id === projectId);
      if (!project) {
        container.innerHTML = "<p>Project not found.</p>";
        return;
      }

      container.innerHTML = `
        <h2>${project.title}</h2>
        <img src="${project.image}" style="max-width:100%; border-radius:12px; margin-bottom:16px;">
        <p>${project.description}</p>

        ${project.tags ? `
          <h3>Tags</h3>
          <p>${project.tags.join(", ")}</p>
        ` : ""}

        <p>
          <a href="${project.link}" target="_blank">Project Link</a>
        </p>
      `;
    });
}
