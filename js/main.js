document.addEventListener("DOMContentLoaded", () => {
  fetch("data/projects.json")
    .then(res => res.json())
    .then(projects => renderProjects(projects))
    .catch(err => console.error("Failed to load projects:", err));
});

function renderProjects(projects) {
  const grid = document.getElementById("projectGrid");
  if (!grid) return;

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

    // Open external links in new tab
    if (project.link.startsWith("http")) {
      card.target = "_blank";
      card.rel = "noopener noreferrer";
    }

    grid.appendChild(card);
  });
}
