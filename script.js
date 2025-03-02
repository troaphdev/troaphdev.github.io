const blobsContainer = document.querySelector('.blobs-container');
const numBlobs = 4; // total of 4 blobs: 2 on the left, 2 on the right

for (let i = 0; i < numBlobs; i++) {
  const blob = document.createElement('div');
  blob.className = 'blob';
  
  // Random size between 200px and 500px
  const size = Math.floor(Math.random() * 300) + 200;
  blob.style.width = size + 'px';
  blob.style.height = size + 'px';
  
  // Set initial left position based on index
  if (i < 2) {
    // Left half: x between 0% and 50%
    blob.style.left = Math.random() * 50 + '%';
  } else {
    // Right half: x between 50% and 100%
    blob.style.left = (50 + Math.random() * 50) + '%';
  }
  
  // Top position is random across full height
  blob.style.top = Math.random() * 100 + '%';
  
  // Random pastel-like color with alpha
  blob.style.background = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`;
  
  blobsContainer.appendChild(blob);
  
  // Animate blob position every 4 seconds within its respective half
  setInterval(() => {
    if (i < 2) {
      blob.style.left = Math.random() * 50 + '%';
    } else {
      blob.style.left = (50 + Math.random() * 50) + '%';
    }
    blob.style.top = Math.random() * 100 + '%';
  }, 4000);
}
