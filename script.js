const BLOB_COUNT = 5;
const BLOB_MIN_SIZE = 200;
const BLOB_MAX_SIZE = 500;
const INTERVAL_MS = 4000;
const MAX_MOVE = 200;
const MAX_SIZE_SHIFT = 100;
const MAX_COLOR_SHIFT = 40;
const blobsState = [];
function clamp(value, min, max) {
  return Math.max(min, Math.min(value, max));
}
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randFloat(min, max) {
  return Math.random() * (max - min) + min;
}
function createBlob() {
  const div = document.createElement('div');
  div.className = 'blob';
  return div;
}
function initialBlobState() {
  const size = randInt(BLOB_MIN_SIZE, BLOB_MAX_SIZE);
  return {
    x: randInt(0, window.innerWidth),
    y: randInt(0, window.innerHeight),
    size: size,
    r: randInt(80, 255),
    g: randInt(80, 255),
    b: randInt(80, 255),
    a: randFloat(0.3, 0.7)
  };
}
function updateBlobState(state) {
  state.x = clamp(state.x + randInt(-MAX_MOVE, MAX_MOVE), 0, window.innerWidth);
  state.y = clamp(state.y + randInt(-MAX_MOVE, MAX_MOVE), 0, window.innerHeight);
  state.size = clamp(state.size + randInt(-MAX_SIZE_SHIFT, MAX_SIZE_SHIFT), BLOB_MIN_SIZE, BLOB_MAX_SIZE);
  state.r = clamp(state.r + randInt(-MAX_COLOR_SHIFT, MAX_COLOR_SHIFT), 80, 255);
  state.g = clamp(state.g + randInt(-MAX_COLOR_SHIFT, MAX_COLOR_SHIFT), 80, 255);
  state.b = clamp(state.b + randInt(-MAX_COLOR_SHIFT, MAX_COLOR_SHIFT), 80, 255);
  state.a = clamp(state.a + (Math.random() - 0.5) * 0.2, 0.3, 0.7);
}
function applyBlobStyle(blob, state) {
  const half = state.size / 2;
  blob.style.width = state.size + 'px';
  blob.style.height = state.size + 'px';
  blob.style.left = (state.x - half) + 'px';
  blob.style.top = (state.y - half) + 'px';
  blob.style.background = `
    radial-gradient(circle at 50% 50%,
      rgba(${state.r}, ${state.g}, ${state.b}, ${state.a}) 0%,
      transparent 70%
    )
  `;
}
const container = document.getElementById('blobsContainer');
for (let i = 0; i < BLOB_COUNT; i++) {
  const blobDiv = createBlob();
  container.appendChild(blobDiv);
  const state = initialBlobState();
  blobsState.push({ element: blobDiv, state });
  applyBlobStyle(blobDiv, state);
}
setInterval(() => {
  for (const { element, state } of blobsState) {
    updateBlobState(state);
    applyBlobStyle(element, state);
  }
}, INTERVAL_MS);
const runButton = document.getElementById("runButton");
const htmlCode = document.getElementById("htmlCode");
const cssCode = document.getElementById("cssCode");
const jsCode = document.getElementById("jsCode");
const previewFrame = document.getElementById("previewFrame");
const mainContent = document.getElementById("mainContent");
const leftColumn = document.getElementById("leftColumn");
const rightColumn = document.getElementById("rightColumn");
const verticalSplitter = document.getElementById("verticalSplitter");
const horizontalSplitter = document.getElementById("horizontalSplitter");
const cssPanel = document.getElementById("cssPanel");
runButton.addEventListener("click", () => {
  const combinedCode = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <style>
    ${cssCode.value}
  </style>
</head>
<body>
  ${htmlCode.value}
  <script>
    ${jsCode.value}
  <\/script>
</body>
</html>
  `;
  previewFrame.srcdoc = combinedCode;
});
window.addEventListener("DOMContentLoaded", () => {
  runButton.click();
});
let isDraggingVertical = false;
let isDraggingHorizontal = false;
let mainRect;
let startX = 0;
let startY = 0;
let startLeftWidth = 0;
let startCssPanelHeight = 0;
const minLeftWidth = 150;
const minRightWidth = 150;
verticalSplitter.addEventListener("mousedown", e => {
  e.preventDefault();
  isDraggingVertical = true;
  mainRect = mainContent.getBoundingClientRect();
  startX = e.clientX;
  startLeftWidth = leftColumn.getBoundingClientRect().width;
});
horizontalSplitter.addEventListener("mousedown", e => {
  e.preventDefault();
  isDraggingHorizontal = true;
  mainRect = rightColumn.getBoundingClientRect();
  startY = e.clientY;
  startCssPanelHeight = cssPanel.getBoundingClientRect().height;
});
document.addEventListener("mousemove", e => {
  if (isDraggingVertical) {
    const dx = e.clientX - startX;
    let newLeftWidth = Math.min(Math.max(startLeftWidth + dx, minLeftWidth), mainRect.width - minRightWidth);
    leftColumn.style.width = newLeftWidth + "px";
    rightColumn.style.width = (mainRect.width - newLeftWidth) + "px";
    verticalSplitter.style.left = (newLeftWidth - verticalSplitter.offsetWidth / 2) + "px";
  }
  if (isDraggingHorizontal) {
    const dy = e.clientY - startY;
    let newHeight = startCssPanelHeight + dy;
    const minHeight = 80;
    const maxHeight = rightColumn.clientHeight - 80;
    newHeight = Math.min(Math.max(newHeight, minHeight), maxHeight);
    cssPanel.style.height = newHeight + "px";
    horizontalSplitter.style.top = (newHeight - horizontalSplitter.offsetHeight / 2) + "px";
  }
});
document.addEventListener("mouseup", () => {
  isDraggingVertical = false;
  isDraggingHorizontal = false;
});
window.addEventListener("resize", () => {
  const currentLeftWidth = leftColumn.getBoundingClientRect().width;
  verticalSplitter.style.left = (currentLeftWidth - verticalSplitter.offsetWidth / 2) + "px";
  const currentCssHeight = cssPanel.getBoundingClientRect().height;
  horizontalSplitter.style.top = (currentCssHeight - horizontalSplitter.offsetHeight / 2) + "px";
});
window.addEventListener("load", () => {
  const currentLeftWidth = leftColumn.getBoundingClientRect().width;
  verticalSplitter.style.left = (currentLeftWidth - verticalSplitter.offsetWidth / 2) + "px";
  const currentCssHeight = cssPanel.getBoundingClientRect().height;
  horizontalSplitter.style.top = (currentCssHeight - horizontalSplitter.offsetHeight / 2) + "px";
});
