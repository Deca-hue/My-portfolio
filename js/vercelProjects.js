class VercelProjects {
  constructor() {
    this.projectsContainer = document.getElementById('vercel-projects');
    
    // TEST WITH THESE DEMO PROJECTS FIRST
    this.projects = [
      {
        title: "Your Project Name",
        description: "Short description",
        url: "https://nft-website-custom.vercel.app/", // MUST include https://
        githubUrl: "https://Deca-hue/your/repo",
        tags: ["React", "Tailwind"],
        featured: true // Optional
      },
      {
        title: "Example Live App",
        description: "Test project to verify live demos are working",
        url: "https://auto-photo-loader.vercel.app/", // Using Next.js site as test URL
        githubUrl: "https://Deca-hue/vercel/next.js", // Test GitHub URL
        tags: ["Test", "Demo"],
        featured: true
      },
      {
        title: "Example Coming Soon",
        description: "Test project showing coming soon state",
        url: "https//online-fitness-tracker.vercel.app/" ,
        githubUrl: "https://github.com",
        tags: ["Test", "Demo"],
        featured: true
      }
    ];
    
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

  renderProjects() {
    try {
      let html = '';
      
      this.projects.forEach(project => {
        console.log("Processing project:", project.title);
        
        html += `
        <div class="project-card live-card">
          <div class="card-image-container">
            <div class="card-image-placeholder">
              <i class="fas fa-laptop-code"></i>
            </div>
            ${project.featured ? `
              <div class="featured-badge">
                <i class="fas fa-star"></i> Featured
              </div>
            ` : ''}
            ${project.url ? `
              <div class="live-ribbon">LIVE</div>
            ` : ''}
          </div>
          
          <div class="card-content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            
            ${project.comingSoon ? `
              <div class="coming-soon-badge">
                <i class="fas fa-hourglass-half"></i> Coming Soon
              </div>
            ` : ''}
            
            <div class="project-tags">
              ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
            </div>
            
            <div class="card-actions">
              ${project.url ? `
                <a href="${project.url}" target="_blank" class="live-demo-button">
                  <i class="fas fa-rocket"></i> 
                  ${project.comingSoon ? 'Preview' : 'Launch Demo'}
                </a>
              ` : `
                <button class="coming-soon-button disabled">
                  <i class="fas fa-hourglass"></i> In Development
                </button>
              `}
              
              ${project.githubUrl ? `
                <a href="${project.githubUrl}" target="_blank" class="github-link">
                  <i class="fab fa-github"></i> View Code
                </a>
              ` : ''}
            </div>
          </div>
        </div>`;
      });
      
      this.projectsContainer.innerHTML = html;
      console.log("Projects rendered successfully");
      
    } catch (error) {
      console.error("Error rendering projects:", error);
      this.showErrorState();
    }
  }

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