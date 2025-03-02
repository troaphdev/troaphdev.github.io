const blobsContainer = document.querySelector('.blobs-container');
const numBlobs = 4; // total of 4 blobs: 2 on the left, 2 on the right

for (let i = 0; i < numBlobs; i++) {
  const blob = document.createElement('div');
  blob.className = 'blob';
  
  // Random size between 200px and 500px
  const size = Math.floor(Math.random() * 300) + 200;
  blob.style.width = size + 'px';
  blob.style.height = size + 'px';
  
  // Position left half or right half
  if (i < 2) {
    blob.style.left = Math.random() * 50 + '%'; // 0%-50%
  } else {
    blob.style.left = (50 + Math.random() * 50) + '%'; // 50%-100%
  }
  blob.style.top = Math.random() * 100 + '%';
  
  // Random pastel color w/ alpha
  blob.style.background = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`;
  
  blobsContainer.appendChild(blob);
  
  // Animate position every 4 seconds
  setInterval(() => {
    if (i < 2) {
      blob.style.left = Math.random() * 50 + '%';
    } else {
      blob.style.left = (50 + Math.random() * 50) + '%';
    }
    blob.style.top = Math.random() * 100 + '%';
  }, 4000);
}

// Sidebar expand/collapse
const expandBtn = document.querySelector('.expand-sidebar-btn');
const sidebar = document.querySelector('.sidebar');

expandBtn.addEventListener('click', () => {
  sidebar.classList.toggle('expanded');
});
