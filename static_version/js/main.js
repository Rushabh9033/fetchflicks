// FetchFlicks Static Version - Client-Side JavaScript
// Note: This is a limited client-side implementation for shared hosting

document.addEventListener('DOMContentLoaded', function() {
    
    // YouTube form handler
    const youtubeForm = document.getElementById('youtube-form');
    if (youtubeForm) {
        youtubeForm.addEventListener('submit', handleYouTubeSubmit);
    }

    // Handle YouTube video info fetching
    async function handleYouTubeSubmit(e) {
        e.preventDefault();
        
        const urlInput = document.getElementById('youtube-url');
        const videoUrl = urlInput.value.trim();
        
        if (!videoUrl) {
            showError('Please enter a YouTube video URL');
            return;
        }

        if (!isValidYouTubeUrl(videoUrl)) {
            showError('Please enter a valid YouTube video URL');
            return;
        }

        try {
            showLoading(true);
            
            // Extract video ID from URL
            const videoId = extractYouTubeVideoId(videoUrl);
            if (!videoId) {
                throw new Error('Could not extract video ID from URL');
            }

            // Fetch video information using YouTube API (requires API key)
            await fetchYouTubeVideoInfo(videoId);
            
        } catch (error) {
            console.error('Error:', error);
            showError('Unable to fetch video information. This may be due to API limitations in client-side applications.');
            showAlternativeOptions();
        } finally {
            showLoading(false);
        }
    }

    // Extract YouTube video ID from URL
    function extractYouTubeVideoId(url) {
        const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }

    // Validate YouTube URL
    function isValidYouTubeUrl(url) {
        const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
        return youtubeRegex.test(url);
    }

    // Fetch YouTube video information
    async function fetchYouTubeVideoInfo(videoId) {
        try {
            // Note: This requires a YouTube API key which should be configured
            // For demo purposes, we'll show a placeholder
            
            const apiKey = 'YOUR_YOUTUBE_API_KEY'; // You need to get this from Google Cloud Console
            
            if (apiKey === 'YOUR_YOUTUBE_API_KEY') {
                throw new Error('YouTube API key not configured');
            }

            const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet,contentDetails,statistics`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch video information');
            }

            const data = await response.json();
            
            if (data.items && data.items.length > 0) {
                displayVideoInfo(data.items[0]);
            } else {
                throw new Error('Video not found');
            }

        } catch (error) {
            throw error;
        }
    }

    // Display video information
    function displayVideoInfo(videoData) {
        const videoInfo = document.getElementById('video-info');
        const thumbnail = document.getElementById('video-thumbnail');
        const title = document.getElementById('video-title');
        const author = document.getElementById('video-author');
        const duration = document.getElementById('video-duration');
        const downloadLinks = document.getElementById('download-links');

        // Set video information
        thumbnail.src = videoData.snippet.thumbnails.medium.url;
        title.textContent = videoData.snippet.title;
        author.textContent = `By: ${videoData.snippet.channelTitle}`;
        duration.textContent = `Duration: ${formatDuration(videoData.contentDetails.duration)}`;

        // Create download options (limited in client-side)
        downloadLinks.innerHTML = `
            <div class="download-note">
                <p><strong>Download Options:</strong></p>
                <p>Due to browser security restrictions, direct video downloading is not available in this client-side version.</p>
                <div class="alternative-options">
                    <h5>Alternative Options:</h5>
                    <ul>
                        <li>Use our server-based application (recommended)</li>
                        <li>Install a browser extension like "Video DownloadHelper"</li>
                        <li>Use online tools like yt-dlp or youtube-dl</li>
                        <li>Try services like SaveFrom.net or Y2Mate</li>
                    </ul>
                </div>
                <div class="external-tools">
                    <a href="https://github.com/yt-dlp/yt-dlp" target="_blank" class="tool-link">yt-dlp (Command Line Tool)</a>
                    <a href="https://savefrom.net/" target="_blank" class="tool-link">SaveFrom.net</a>
                    <a href="https://www.y2mate.com/" target="_blank" class="tool-link">Y2Mate</a>
                </div>
            </div>
        `;

        videoInfo.style.display = 'block';
    }

    // Format YouTube duration
    function formatDuration(duration) {
        const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
        const hours = (match[1] || '').replace('H', '');
        const minutes = (match[2] || '').replace('M', '');
        const seconds = (match[3] || '').replace('S', '');

        const h = hours ? parseInt(hours) : 0;
        const m = minutes ? parseInt(minutes) : 0;
        const s = seconds ? parseInt(seconds) : 0;

        if (h > 0) {
            return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        } else {
            return `${m}:${s.toString().padStart(2, '0')}`;
        }
    }

    // Show loading state
    function showLoading(isLoading) {
        const submitBtn = document.querySelector('.submit-btn');
        if (isLoading) {
            submitBtn.textContent = 'Fetching video info...';
            submitBtn.disabled = true;
        } else {
            submitBtn.textContent = 'Get Video Info';
            submitBtn.disabled = false;
        }
    }

    // Show error message
    function showError(message) {
        const errorDiv = document.getElementById('error-message') || createErrorDiv();
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        
        // Hide error after 5 seconds
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 5000);
    }

    // Create error div if it doesn't exist
    function createErrorDiv() {
        const errorDiv = document.createElement('div');
        errorDiv.id = 'error-message';
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = `
            background-color: #f44336;
            color: white;
            padding: 12px;
            border-radius: 4px;
            margin: 10px 0;
            display: none;
        `;
        
        const form = document.getElementById('youtube-form');
        form.parentNode.insertBefore(errorDiv, form.nextSibling);
        
        return errorDiv;
    }

    // Show alternative options when API fails
    function showAlternativeOptions() {
        const videoInfo = document.getElementById('video-info');
        const downloadLinks = document.getElementById('download-links');
        
        downloadLinks.innerHTML = `
            <div class="alternative-solutions">
                <h4>🚀 Recommended Solutions for Video Downloading:</h4>
                
                <div class="solution-card">
                    <h5>1. Deploy on Free Cloud Hosting</h5>
                    <p>Deploy your Flask application on free cloud platforms:</p>
                    <ul>
                        <li><strong>Vercel:</strong> Free hosting with Python support</li>
                        <li><strong>Railway:</strong> Free tier for small applications</li>
                        <li><strong>Render:</strong> Free web service hosting</li>
                        <li><strong>PythonAnywhere:</strong> Free Python hosting</li>
                    </ul>
                </div>
                
                <div class="solution-card">
                    <h5>2. Browser Extensions</h5>
                    <p>Use browser extensions for video downloading:</p>
                    <ul>
                        <li>Video DownloadHelper (Firefox/Chrome)</li>
                        <li>Flash Video Downloader (Chrome)</li>
                        <li>Video Downloader Plus (Chrome)</li>
                    </ul>
                </div>
                
                <div class="solution-card">
                    <h5>3. Desktop Applications</h5>
                    <p>Install desktop software for video downloading:</p>
                    <ul>
                        <li><strong>yt-dlp:</strong> Command-line tool (most powerful)</li>
                        <li><strong>4K Video Downloader:</strong> GUI application</li>
                        <li><strong>JDownloader:</strong> Multi-platform downloader</li>
                    </ul>
                </div>
                
                <div class="solution-card">
                    <h5>4. Online Services</h5>
                    <p>Use trusted online video downloaders:</p>
                    <ul>
                        <li>SaveFrom.net</li>
                        <li>Y2Mate.com</li>
                        <li>KeepVid.com</li>
                    </ul>
                </div>
            </div>
        `;
        
        videoInfo.style.display = 'block';
    }

    // Platform navigation
    const platformCards = document.querySelectorAll('.platform-card');
    platformCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.querySelector('.platform-name').textContent;
            alert(`${platform} downloader is not available in this static version. Please use our server-based application for full functionality.`);
        });
    });

});

// CSS for dynamic elements
const style = document.createElement('style');
style.textContent = `
    .video-info {
        margin-top: 20px;
        padding: 20px;
        border: 1px solid var(--dark-gray);
        border-radius: 8px;
        background-color: var(--secondary-black);
    }
    
    .video-preview {
        display: flex;
        gap: 15px;
        margin-bottom: 20px;
    }
    
    .video-thumbnail {
        width: 160px;
        height: 90px;
        object-fit: cover;
        border-radius: 8px;
    }
    
    .video-details h3 {
        margin: 0 0 8px 0;
        color: var(--white);
        font-size: 1.1em;
    }
    
    .video-details p {
        margin: 4px 0;
        color: var(--gray);
        font-size: 0.9em;
    }
    
    .platform-navigation {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 15px;
        margin: 30px 0;
    }
    
    .platform-card {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 15px;
        background-color: var(--accent-black);
        border: 2px solid var(--dark-gray);
        border-radius: 8px;
        text-decoration: none;
        color: var(--light-gray);
        transition: var(--transition);
    }
    
    .platform-card:hover {
        border-color: var(--white);
        background-color: var(--secondary-black);
        color: var(--white);
    }
    
    .platform-icon {
        font-size: 1.5em;
    }
    
    .platform-name {
        font-weight: 500;
    }
    
    .disclaimer {
        margin-top: 30px;
        padding: 20px;
        background-color: var(--accent-black);
        border-left: 4px solid var(--white);
        border-radius: 0 8px 8px 0;
    }
    
    .disclaimer p {
        margin: 8px 0;
        color: var(--gray);
        font-size: 0.9em;
    }
    
    .disclaimer strong {
        color: var(--white);
    }
    
    .alternative-solutions {
        margin-top: 20px;
    }
    
    .solution-card {
        margin: 15px 0;
        padding: 15px;
        background-color: var(--accent-black);
        border-radius: 8px;
        border-left: 4px solid var(--white);
    }
    
    .solution-card h5 {
        margin: 0 0 10px 0;
        color: var(--white);
    }
    
    .solution-card p {
        margin: 8px 0;
        color: var(--gray);
    }
    
    .solution-card ul {
        margin: 8px 0;
        padding-left: 20px;
    }
    
    .solution-card li {
        margin: 4px 0;
        color: var(--light-gray);
    }
    
    .solution-card strong {
        color: var(--white);
    }
    
    .download-note {
        padding: 20px;
        background-color: var(--accent-black);
        border-radius: 8px;
        border: 1px solid var(--dark-gray);
    }
    
    .external-tools {
        margin-top: 15px;
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
    }
    
    .tool-link {
        display: inline-block;
        padding: 8px 16px;
        background-color: var(--secondary-black);
        border: 1px solid var(--dark-gray);
        border-radius: 4px;
        color: var(--light-gray);
        text-decoration: none;
        font-size: 0.9em;
        transition: var(--transition);
    }
    
    .tool-link:hover {
        border-color: var(--white);
        color: var(--white);
    }
    
    .error-message {
        animation: slideIn 0.3s ease-out;
    }
    
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
