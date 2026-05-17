const dataSources = {
  skills: "data/skills.json",
  certifications: "data/certifications.json",
  experience: "data/experience.json",
  projects: "data/projects.json",
};

const fallbackData = {
  skills: [
    {
      name: "HTML",
      shortName: "HTML",
      image: "",
    },
    {
      name: "CSS",
      shortName: "CSS",
      image: "",
    },
    {
      name: "JavaScript",
      shortName: "JS",
      image: "",
    },
    {
      name: "React",
      shortName: "React",
      image: "",
    },
    {
      name: "Node.js",
      shortName: "Node",
      image: "",
    },
    {
      name: "MongoDB",
      shortName: "DB",
      image: "",
    },
    {
      name: "Python",
      shortName: "Py",
      image: "",
    },
    {
      name: "GitHub",
      shortName: "GH",
      image: "",
    },
    {
      name: "Git",
      shortName: "Git",
      image: "",
    },
    {
      name: "REST APIs",
      shortName: "API",
      image: "",
    },
    {
      name: "LLM Concepts",
      shortName: "AI",
      image: "",
    },
    {
      name: "Figma",
      shortName: "Fig",
      image: "",
    },
  ],
  certifications: [
    {
      title: "Meta Front-End Development Professional Certificate",
      issuer: "Coursera",
      period: "2026",
      link: "https://www.coursera.org/account/accomplishments/professional-cert/LLH5EEQR6Q2W",
      summary:
        "Mastered HTML, CSS, and JavaScript to build responsive and accessible web applications. Gained expertise in React, using components, state management, and hooks for dynamic UI development.",
    },
    {
      title: "Backend / Web Development Certification",
      issuer: "Add issuer name",
      period: "2025",
      link: "https://example.com",
      summary: "Credential covering API development, databases, deployment basics, and maintainable web applications.",
    },
  ],
  experience: [
    {
      role: "Software Engineering Intern",
      company: "yellow.ai",
      period: "May 2025 - Present | Bengaluru Remote",
      summary:
        "Working with the Global GSI Team to build intelligent, agentic AI chatbot solutions that automate enterprise workflows and improve conversational experiences across business channels.",
      highlights: [
        "Integrated ServiceNow, Salesforce, and DEX tools such as Nanoheal using REST APIs and custom JavaScript cloud functions.",
        "Built and supported chatbot and voice workflows across Microsoft Teams, WhatsApp, and IVR channels.",
        "Deployed and troubleshot scalable solutions on Azure Cloud while collaborating with partners and customers to improve reliability and performance.",
      ],
      tools: [
        "JavaScript",
        "REST APIs",
        "Azure Cloud",
        "ServiceNow",
        "Salesforce",
        "Microsoft Teams",
        "WhatsApp",
        "IVR",
        "HTML",
        "CSS",
      ],
    },
  ],
  projects: [
    {
      title: "Movie Recommendation System",
      image: "",
      period: "Sep 2024 - Nov 2024",
      description:
        "Built a content-based movie recommendation system using Python and cosine similarity on a Kaggle movie dataset. The app recommends similar movies and displays posters dynamically for a more visual discovery experience.",
      tags: ["Python", "Streamlit", "Pandas", "Scikit-learn", "Cosine Similarity", "Pickle"],
      live: "https://example.com",
      source: "https://github.com/yourusername/movie-recommendation-system",
    },
    {
      title: "Crypto-InfoSite",
      image: "",
      period: "Dec 2024 - Feb 2025",
      description:
        "Developed a dynamic cryptocurrency information web app using React and the CoinGecko API. The platform displays live prices, market trends, and historical data to help users track crypto assets effectively.",
      tags: ["React.js", "JavaScript", "HTML", "CSS", "REST APIs", "CoinGecko API"],
      live: "https://example.com",
      source: "https://github.com/yourusername/crypto-infosite",
    },
  ],
};

const themeToggle = document.querySelector(".theme-toggle");
const navToggle = document.querySelector(".nav-toggle");
const navPanel = document.querySelector(".nav-panel");
const backToTop = document.querySelector(".back-to-top");
const safeStorage = {
  get(key) {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      return null;
    }
  },
};
const storedTheme = safeStorage.get("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

const setTheme = (theme) => {
  document.documentElement.dataset.theme = theme;
  themeToggle.querySelector(".theme-icon").textContent = theme === "dark" ? "\u2600" : "\u263e";
  themeToggle.querySelector(".theme-label").textContent = theme === "dark" ? "Light" : "Dark";
};

setTheme(storedTheme || (prefersDark ? "dark" : "light"));
document.querySelector("#year").textContent = new Date().getFullYear();

themeToggle.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  setTheme(nextTheme);
  safeStorage.set("theme", nextTheme);
});

navToggle.addEventListener("click", () => {
  const isOpen = navPanel.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

navPanel.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    navPanel.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const escapeHtml = (value = "") =>
  String(value).replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return entities[char];
  });

const showLoading = (target, label) => {
  target.innerHTML = `<div class="loading">Loading ${label}...</div>`;
};

const showError = (target, label, error) => {
  const fileMessage =
    window.location.protocol === "file:"
      ? "Open this website through start-portfolio.bat or a local server so the browser can read JSON files."
      : "Check the matching JSON file and refresh.";
  const errorMessage = error ? `<small>${escapeHtml(error.message)}</small>` : "";

  target.innerHTML = `<div class="error">Could not load ${label}. ${fileMessage}${errorMessage}</div>`;
};

async function fetchJson(key) {
  const response = await fetch(`${dataSources[key]}?v=${Date.now()}`, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Failed to load ${dataSources[key]}`);
  }
  const data = await response.json();
  if (!Array.isArray(data)) {
    throw new Error(`${dataSources[key]} must contain a JSON array.`);
  }
  return data;
}

function renderSkills(skills) {
  const target = document.querySelector("#skills-list");
  target.innerHTML = skills
    .map((skill) => {
      const label = escapeHtml(skill.name);
      const fallback = escapeHtml(skill.shortName || skill.name.slice(0, 3));
      const image = skill.image
        ? `<img class="skill-logo" src="${escapeHtml(skill.image)}" alt="${label} logo" />`
        : `<span class="skill-placeholder" aria-hidden="true">${fallback}</span>`;

      return `
        <article class="skill-bubble" aria-label="${label}">
          <div class="skill-orb">
            ${image}
          </div>
          <h3>${label}</h3>
        </article>
      `;
    })
    .join("");
}

function renderCertifications(certifications) {
  const target = document.querySelector("#certifications-list");
  target.innerHTML = certifications
    .map(
      (item) => `
        <article class="certification-card">
          <div class="certification-topline">
            <span class="certification-badge">Credential</span>
            <span>${escapeHtml(item.period)}</span>
          </div>
          <h3>${escapeHtml(item.title)}</h3>
          <p class="certification-issuer">${escapeHtml(item.issuer)}</p>
          <p>${escapeHtml(item.summary)}</p>
          ${
            item.link
              ? `<a class="certificate-link" href="${escapeHtml(item.link)}" target="_blank" rel="noreferrer">View Certificate</a>`
              : ""
          }
        </article>
      `
    )
    .join("");
}

function renderExperience(experience) {
  const target = document.querySelector("#experience-list");
  target.innerHTML = experience
    .map(
      (item) => `
        <article class="timeline-item">
          <span class="timeline-date">${escapeHtml(item.period)}</span>
          <h3>${escapeHtml(item.role)} | ${escapeHtml(item.company)}</h3>
          <p>${escapeHtml(item.summary)}</p>
          ${
            item.highlights
              ? `<ul class="experience-highlights">
                  ${item.highlights.map((highlight) => `<li>${escapeHtml(highlight)}</li>`).join("")}
                </ul>`
              : ""
          }
          ${
            item.tools
              ? `<div class="experience-tools">
                  ${item.tools.map((tool) => `<span class="tag">${escapeHtml(tool)}</span>`).join("")}
                </div>`
              : ""
          }
        </article>
      `
    )
    .join("");
}

function renderProjects(projects) {
  const target = document.querySelector("#projects-list");
  target.innerHTML = projects
    .map(
      (project) => `
        <article class="project-card">
          ${
            project.image
              ? `<img class="project-image" src="${escapeHtml(project.image)}" alt="${escapeHtml(project.title)} preview" />`
              : ""
          }
          <h3>${escapeHtml(project.title)}</h3>
          ${project.period ? `<span class="project-period">${escapeHtml(project.period)}</span>` : ""}
          <p>${escapeHtml(project.description)}</p>
          <div class="project-tags">
            ${(project.tags || []).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
          </div>
          <div class="project-links">
            ${
              project.live
                ? `<a href="${escapeHtml(project.live)}" target="_blank" rel="noreferrer">Live Demo</a>`
                : ""
            }
            ${
              project.source
                ? `<a href="${escapeHtml(project.source)}" target="_blank" rel="noreferrer">Source Code</a>`
                : ""
            }
          </div>
        </article>
      `
    )
    .join("");
}

async function loadPortfolioData() {
  const sections = [
    ["skills", document.querySelector("#skills-list"), "skills", renderSkills],
    ["experience", document.querySelector("#experience-list"), "experience", renderExperience],
    ["projects", document.querySelector("#projects-list"), "projects", renderProjects],
    ["certifications", document.querySelector("#certifications-list"), "certifications", renderCertifications],
  ];

  sections.forEach(([, target, label]) => showLoading(target, label));

  await Promise.all(
    sections.map(async ([key, target, label, render]) => {
      try {
        render(await fetchJson(key));
      } catch (error) {
        console.error(error);
        showError(target, label, error);
      }
    })
  );
}

loadPortfolioData();
