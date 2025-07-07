class VercelProjects {
  constructor() {
    this.projectsContainer = document.getElementById('vercel-projects');
    
    
    // TEST WITH THESE DEMO PROJECTS FIRST
    this.projects = [
      {
        title: "NFT Website",
        description: "custom made NFT website",
        url: "https://nft-website-custom.vercel.app/", // MUST include https://
        githubUrl: "https://Deca-hue/your/repo",
        tags: ["React", "Tailwind"],
        featured: true, // Optional
        image: "projects.screenshots/nft.png" // Optional image URL
      },
      {
        title: "AUTO PHOTO LOADER",
        description: "Test project showing live state",
        url: "https://auto-photo-loader.vercel.app/", // Using Next.js site as test URL
        githubUrl: "https://Deca-hue/vercel/next.js", // Test GitHub URL
        tags: ["html", "tailwind", "javascript"],
        featured: true,
        image: "projects.screenshots/gallery.png" // Optional image URL
      },

      {
        title: "Online Fitness Tracker",
        description: "A fitness tracker app",
        url: "https://online-fitness-tracker.vercel.app/" ,
        githubUrl: "https://github.com",
        tags: ["html", "tailwind", "javascript"],
        featured: true,
        image: "projects.screenshots/fitnessapp.png" // Optional image URL
      }
    // Add more projects as needed
    ];
    
    this.currentIndex = 0; // Track which project is shown
    this.init();
  }

  init() {
    if (!this.projectsContainer) {
      console.error("Container #vercel-projects not found!");
      return;
    }
    
    console.log("Initializing VercelProjects with:", this.projects);
    this.renderProjects();
  }

  /**rendering projects */
 renderProjects() {
  try {
    const projectsPerPage = 3;
    const start = this.currentIndex;
    const end = Math.min(start + projectsPerPage, this.projects.length);
    const visibleProjects = this.projects.slice(start, end);

    let html = `
      <div class="relative flex items-center">
    
        <div class="flex-1 flex justify-center gap-8 mx-20">
          ${visibleProjects.map(project => `
            <div class="project-card live-card bg-white rounded-lg shadow-md p-6 flex flex-col gap-4 w-80">
              <div class="card-image-container mb-4 relative">
                ${project.image ? `
                  <img src="${project.image}" alt="${project.title} preview" class="project-preview-image rounded-md mb-2" />
                ` : `
                  <div class="card-image-placeholder flex items-center justify-center h-32 bg-gray-100 rounded mb-2">
                    <i class="fas fa-laptop-code text-3xl text-gray-400"></i>
                  </div>
                `}
                ${project.featured ? `
                  <div class="featured-badge absolute top-2 left-2 bg-yellow-400 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                    <i class="fas fa-star"></i> Featured
                  </div>
                ` : ''}
                ${project.url ? `
                  <div class="live-ribbon absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs">LIVE</div>
                ` : ''}
              </div>
              <div class="card-content flex flex-col gap-2">
                <h3 class="text-xl font-bold mb-1 text-indigo-600">${project.title}</h3>
                <p class="text-gray-600 mb-2">${project.description}</p>
                ${project.comingSoon ? `
                  <div class="coming-soon-badge bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs mb-2 flex items-center gap-1">
                    <i class="fas fa-hourglass-half"></i> Coming Soon
                  </div>
                ` : ''}
                <div class="project-tags flex flex-wrap gap-2 mb-2">
                  ${project.tags.map(tag => `<span class="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">${tag}</span>`).join('')}
                </div>
                <div class="card-actions flex gap-3 mt-2">
                  ${project.url ? `
                    <a href="${project.url}" target="_blank" class="live-demo-button bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition">
                      <i class="fas fa-rocket"></i> 
                      ${project.comingSoon ? 'Preview' : 'Launch Demo'}
                    </a>
                  ` : `
                    <button class="coming-soon-button disabled bg-gray-300 text-gray-500 px-4 py-2 rounded">
                      <i class="fas fa-hourglass"></i> In Development
                    </button>
                  `}
                  ${project.githubUrl ? `
                    <a href="${project.githubUrl}" target="_blank" class="github-link bg-gray-900 hover:bg-gray-900 text-white px-4 py-2 rounded transition">
                      <i class="fab fa-github"></i> View Code
                    </a>
                  ` : ''}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
  
      </div>
      <div class="text-center text-sm text-gray-500 mt-2">
        Showing ${start + 1}–${end} of ${this.projects.length} projects
      </div>
    `;
    this.projectsContainer.innerHTML = html;

    // Navigation logic
    const prevBtn = document.getElementById('prev-project');
    const nextBtn = document.getElementById('next-project');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (this.currentIndex > 0) {
          this.currentIndex = Math.max(0, this.currentIndex - projectsPerPage);
          this.renderProjects();
        }
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if ((this.currentIndex + projectsPerPage) < this.projects.length) {
          this.currentIndex = Math.min(this.projects.length - projectsPerPage, this.currentIndex + projectsPerPage);
          this.renderProjects();
        }
      });
    }
    console.log("Projects rendered successfully");
  } catch (error) {
    console.error("Error rendering projects:", error);
    this.showErrorState();
  }
  }

  
  /** Show an error state if projects fail to load */
  showErrorState() {
    this.projectsContainer.innerHTML = `
      <div class="error-state">
        <i class="fas fa-exclamation-triangle text-3xl text-yellow-500"></i>
        <h3>Unable to load live projects</h3>
        <p>Please refresh the page or try again later</p>
        <button onclick="location.reload()" class="retry-button">
          <i class="fas fa-sync-alt"></i> Retry
        </button>
      </div>
    `;
  }
}

// Initialize only if the container exists
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('vercel-projects')) {
    new VercelProjects();
  } else {
    console.warn("Vercel projects container not found on this page");
  }
});