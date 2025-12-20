/**
 * Video Content Configuration and Renderer
 */

// Configuration Array - Edit this to add/remove videos
const VIDEO_CONTENT = [
    {
        id: 'dQw4w9WgXcQ',
        title: 'Video Katering 1',
        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg' // Optional: Can be auto-generated if needed
    },
    {
        id: 'LxR_7cbb100',
        title: 'Video Katering 2',
        thumbnail: 'https://img.youtube.com/vi/LxR_7cbb100/maxresdefault.jpg'
    },
    {
        id: '9d8wWcJLnFI',
        title: 'Video Katering 3',
        thumbnail: 'https://img.youtube.com/vi/9d8wWcJLnFI/maxresdefault.jpg'
    }
];

// Function to render the video grid
window.initVideoGrid = function () {
    const gridContainer = document.querySelector('#videos .video-grid');

    if (!gridContainer) {
        // If content isn't loaded yet? Although this should be called after loadSection
        return;
    }

    // Clear existing content just in case
    gridContainer.innerHTML = '';

    VIDEO_CONTENT.forEach(video => {
        const videoItem = document.createElement('div');
        videoItem.className = 'video-item wow animate__animated animate__fadeInUp';
        videoItem.setAttribute('onclick', `openVideoModal('${video.id}')`);

        // Use provided thumbnail or fallback to YouTube default
        const thumbUrl = video.thumbnail || `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`;

        videoItem.innerHTML = `
            <img src="${thumbUrl}" alt="${video.title}" loading="lazy">
            <div class="play-button"><span>▶</span></div>
        `;

        gridContainer.appendChild(videoItem);
    });
};
