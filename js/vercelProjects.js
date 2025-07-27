class VercelProjects {
  constructor() {
    this.projectsContainer = document.getElementById('vercel-projects');
    
    
    
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
    this.init()
  }
  init() {
    if (!this.projectsContainer) return;
    this.renderProjects();
  }
  renderProjects() {
    try {
      const html = this.projects.map(project => `
        <div class="project-card bg-white rounded-lg shadow p-5 flex flex-col gap-4">
          <div class="relative">
            ${project.image ? `
              <img src="${project.image}" alt="${project.title}" class="rounded mb-2">
            ` : `
              <div class="h-40 bg-gray-100 flex items-center justify-center rounded">
                <i class="fas fa-laptop-code text-3xl text-gray-400"></i>
              </div>
            `}
            ${project.featured ? `
              <span class="absolute top-2 left-2 bg-yellow-400 text-xs text-white px-2 py-1 rounded">★ Featured</span>
            ` : ''}
          </div>
          <h3 class="text-lg font-semibold text-indigo-600">${project.title}</h3>
          <p class="text-gray-600">${project.description}</p>
          <div class="flex flex-wrap gap-2">
            ${project.tags.map(tag => `<span class="bg-gray-200 text-xs px-2 py-1 rounded">${tag}</span>`).join('')}
          </div>
          <div class="mt-auto flex gap-3 pt-4">
            ${project.url ? `<a href="${project.url}" target="_blank" class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm">Launch</a>` : ''}
            ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" class="bg-gray-900 text-white px-3 py-1 rounded hover:bg-gray-800 text-sm">Code</a>` : ''}
          </div>
        </div>
      `).join('');
      this.projectsContainer.innerHTML = html;
    } catch (e) {
      this.projectsContainer.innerHTML = `<p class="text-red-600">Failed to load projects.</p>`;
    }
  }
}

// Make it available globally
window.VercelProjects = VercelProjects;