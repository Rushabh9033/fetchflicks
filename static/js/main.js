// Professional Futuristic Black & White Theme JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Handle resolution card selection
    const resolutionCards = document.querySelectorAll('.resolution-card');
    resolutionCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove selected class from all cards
            resolutionCards.forEach(c => c.classList.remove('selected'));
            
            // Add selected class to clicked card
            this.classList.add('selected');
            
            // Check the corresponding radio button
            const radio = this.querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = true;
            }
            
            // Update download button text based on selection
            const downloadBtn = document.querySelector('.submit-btn');
            const streamType = this.getAttribute('data-type');
            if (downloadBtn) {
                if (streamType === 'audio') {
                    downloadBtn.textContent = 'Download Audio';
                } else {
                    downloadBtn.textContent = 'Download Video';
                }
            }
        });
    });
    
    // Handle form submission with loading state and progress bar
    const downloadForm = document.getElementById('download-form');
    if (downloadForm) {
        downloadForm.addEventListener('submit', function() {
            const submitBtn = document.querySelector('.submit-btn[type="submit"]');
            const progressContainer = document.getElementById('progress-container');
            const progressFill = document.getElementById('progress-fill');
            const progressPercentage = document.getElementById('progress-percentage');
            
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Processing...';
                submitBtn.style.opacity = '0.7';
            }
            
            // Show progress bar
            if (progressContainer) {
                progressContainer.style.display = 'block';
            }
            
            // Track real progress from server
            const interval = setInterval(() => {
                fetch('/progress')
                    .then(response => response.json())
                    .then(data => {
                        const progress = data.percentage || 0;
                        
                        if (progressFill) {
                            progressFill.style.width = progress + '%';
                        }
                        
                        if (progressPercentage) {
                            progressPercentage.textContent = progress + '%';
                        }
                        
                        // Stop tracking when download is complete
                        if (progress >= 100) {
                            clearInterval(interval);
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching progress:', error);
                    });
            }, 500);
        });
    }
    
    // Copy to clipboard functionality
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const textToCopy = this.getAttribute('data-copy');
            if (textToCopy) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    // Show feedback
                    const originalText = this.textContent;
                    this.textContent = '✓ Copied!';
                    this.style.backgroundColor = '#4CAF50';
                    this.style.borderColor = '#4CAF50';
                    
                    setTimeout(() => {
                        this.textContent = originalText;
                        this.style.backgroundColor = '';
                        this.style.borderColor = '';
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy: ', err);
                    this.textContent = 'Error';
                    this.style.backgroundColor = '#f44336';
                    this.style.borderColor = '#f44336';
                    
                    setTimeout(() => {
                        this.textContent = 'Copy';
                        this.style.backgroundColor = '';
                        this.style.borderColor = '';
                    }, 2000);
                });
            }
        });
    });
    
    // Video preview functionality
    const previewButton = document.getElementById('preview-btn');
    if (previewButton) {
        previewButton.addEventListener('click', function(e) {
            e.preventDefault();
            const videoUrl = this.getAttribute('data-video-url');
            if (videoUrl) {
                // Open in a new tab with noreferrer for security
                window.open(videoUrl, '_blank', 'noopener,noreferrer');
            }
        });
    }
    
    // Theme toggle functionality (in case we want to add a light theme later)
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('light-theme');
        });
    }
});
