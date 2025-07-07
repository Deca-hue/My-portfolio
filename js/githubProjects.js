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
    // Optionally remove the load button from the DOM
    if (this.loadButton) {
        this.loadButton.style.display = 'none';
    }
    // Automatically load projects on initialization
    await this.loadProjects();
}
    
   async fetchProjects() {
    try {
        const username = 'Deca-hue';
        let allRepos = [];
        let page = 1;
        let perPage = 100; // GitHub allows up to 100 per page
        let hasMore = true;

        while (hasMore) {
            const response = await fetch(`https://api.github.com/users/${username}/repos?page=${page}&per_page=${perPage}`);
            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.status}`);
            }
            const repos = await response.json();
            allRepos = allRepos.concat(repos);
            if (repos.length < perPage) {
                hasMore = false;
            } else {
                page++;
            }
        }
        return allRepos;
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
            this.loadButton.textContent = '';
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
        //this.currentPage++;
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
                <a href="https://github.com/Deca-hue" target="_blank" 
                   class="inline-block bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300">
                    Visit GitHub <i class="fas fa-external-link-alt ml-1"></i>
                </a>
            </div>
        `;
        
        if (this.loadButton) {
            this.loadButton.innerHTML = '<i class="fas fa-redo mr-2"></i> Try Again';
            this.loadButton.disabled = false;
            // Remove previous event listeners to avoid stacking
            const newButton = this.loadButton.cloneNode(true);
            this.loadButton.parentNode.replaceChild(newButton, this.loadButton);
            this.loadButton = newButton;
        }
    }

    showPagination() {
    const totalPages = Math.ceil(this.totalProjects / this.projectsPerPage);

    // Remove any existing pagination
    const existingPagination = this.projectsContainer.parentNode.querySelector('.pagination');
    if (existingPagination) {
        existingPagination.remove();
    }

    const paginationContainer = document.createElement('div');
    paginationContainer.className = 'pagination flex justify-center gap-4 mt-6';

    // Previous button
    const prevButton = document.createElement('button');
    prevButton.textContent = 'Previous';
    prevButton.className = 'page-link px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 font-medium';
    prevButton.disabled = this.currentPage === 1;
    prevButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (this.currentPage > 1) {
            this.currentPage--;
            this.loadProjects();
        }
    });
    paginationContainer.appendChild(prevButton);

    // Page info
    const pageInfo = document.createElement('span');
    pageInfo.textContent = `Page ${this.currentPage} of ${totalPages}`;
    pageInfo.className = 'text-gray-600 font-medium';
    paginationContainer.appendChild(pageInfo);

    // Next button
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.className = 'page-link px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 font-medium';
    nextButton.disabled = this.currentPage === totalPages;
    nextButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (this.currentPage < totalPages) {
            this.currentPage++;
            this.loadProjects();
        }
    });
    paginationContainer.appendChild(nextButton);

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