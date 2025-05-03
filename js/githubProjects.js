class GitHubProjects {
    constructor() {
        this.projectsContainer = document.getElementById('github-projects');
        this.loadButton = document.getElementById('load-projects');
        this.currentPage = 1;
        this.projectsPerPage = 6;
        this.totalProjects = 0;
        this.allProjects = [];
        
        this.init();
    }
    
    async init() {
        if (this.loadButton) {
            this.loadButton.addEventListener('click', () => this.loadProjects());
        }
    }
    
    async fetchProjects() {
        try {
            // Replace with your GitHub username
            const username = 'Deca-hue';
            const response = await fetch(`https://api.github.com/users/${username}/repos`);
            
            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error fetching GitHub projects:', error);
            return null;
        }
    }
    
    async loadProjects() {
        // Show loading state
        this.showLoading();
        
        // Fetch projects if not already loaded
        if (this.allProjects.length === 0) {
            this.allProjects = await this.fetchProjects();
            if (!this.allProjects) {
                this.showError();
                return;
            }
            this.totalProjects = this.allProjects.length;
        }
        
        // Display current page
        this.displayProjects();
        
        // Update button text
        if (this.loadButton) {
            this.loadButton.textContent = 'Load More Projects';
        }
    }
    
    displayProjects() {
        // Calculate projects to show
        const startIndex = (this.currentPage - 1) * this.projectsPerPage;
        const endIndex = startIndex + this.projectsPerPage;
        const projectsToShow = this.allProjects.slice(startIndex, endIndex);
        
        // Create project cards
        projectsToShow.forEach(project => {
            const projectCard = this.createProjectCard(project);
            this.projectsContainer.appendChild(projectCard);
        });
        
        // Show pagination if there are more projects
        if (endIndex < this.totalProjects) {
            this.showPagination();
        } else if (this.loadButton) {
            this.loadButton.style.display = 'none';
        }
        
        // Increment page for next load
        this.currentPage++;
    }
    
    createProjectCard(project) {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        
        projectCard.innerHTML = `
            <div class="p-6 h-full flex flex-col">
                <h3 class="text-xl font-bold mb-2 text-indigo-600">${project.name}</h3>
                <p class="text-gray-600 mb-4 flex-grow">${project.description || 'No description available'}</p>
                
                ${project.topics && project.topics.length > 0 ? `
                <div class="flex flex-wrap gap-2 mb-4">
                    ${project.topics.slice(0, 5).map(topic => 
                        `<span class="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">${topic}</span>`
                    ).join('')}
                </div>
                ` : ''}
                
                <div class="flex justify-between items-center mt-auto">
                    <a href="${project.html_url}" target="_blank" rel="noopener noreferrer" 
                       class="text-indigo-600 hover:text-indigo-800 font-medium">
                        View Project <i class="fas fa-external-link-alt ml-1"></i>
                    </a>
                    <div class="flex items-center space-x-3">
                        <span class="text-sm text-gray-500">
                            <i class="fas fa-star mr-1"></i> ${project.stargazers_count}
                        </span>
                        <span class="text-sm text-gray-500">
                            <i class="fas fa-code-branch mr-1"></i> ${project.forks_count}
                        </span>
                    </div>
                </div>
            </div>
        `;
        
        return projectCard;
    }
    
    showLoading() {
        // Clear previous content
        this.projectsContainer.innerHTML = '';
       
        
        if (this.loadButton) {
            this.loadButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Loading...';
            this.loadButton.disabled = true;
        }
    }
    
    showError() {
        this.projectsContainer.innerHTML = `
            <div class="col-span-full text-center py-8">
                <i class="fas fa-exclamation-triangle text-4xl text-yellow-500 mb-4"></i>
                <h3 class="text-xl font-medium text-gray-700 mb-2">Failed to load projects</h3>
                <p class="text-gray-600 mb-4">Please try again later or check my GitHub profile directly.</p>
                <a href="https://github.com/your-github-username" target="_blank" 
                   class="inline-block bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300">
                    Visit GitHub <i class="fas fa-external-link-alt ml-1"></i>
                </a>
            </div>
        `;
        
        if (this.loadButton) {
            this.loadButton.innerHTML = '<i class="fas fa-redo mr-2"></i> Try Again';
            this.loadButton.disabled = false;
            this.loadButton.addEventListener('click', () => this.loadProjects());
        }
    }
    
    showPagination() {
        const totalPages = Math.ceil(this.totalProjects / this.projectsPerPage);
        
        const paginationContainer = document.createElement('div');
        paginationContainer.className = 'pagination';
        
        if (this.currentPage > 2) {
            paginationContainer.appendChild(this.createPageItem(1, '<<'));
        }
        
        for (let i = this.currentPage; i <= Math.min(this.currentPage + 2, totalPages); i++) {
            paginationContainer.appendChild(this.createPageItem(i));
        }
        
        if (this.currentPage + 2 < totalPages) {
            paginationContainer.appendChild(this.createPageItem(totalPages, '>>'));
        }
        
        this.projectsContainer.parentNode.insertBefore(paginationContainer, this.projectsContainer.nextSibling);
    }
    
    createPageItem(pageNumber, label = null) {
        const pageItem = document.createElement('div');
        pageItem.className = 'page-item';
        
        const pageLink = document.createElement('a');
        pageLink.href = '#projects';
        pageLink.className = 'page-link';
        pageLink.textContent = label || pageNumber;
        
        if (pageNumber === this.currentPage) {
            pageLink.classList.add('active');
        }
        
        pageLink.addEventListener('click', (e) => {
            e.preventDefault();
            this.currentPage = pageNumber;
            this.loadProjects();
        });
        
        pageItem.appendChild(pageLink);
        return pageItem;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new GitHubProjects();
});