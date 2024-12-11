// Access the camera and display the video feed
const video = document.getElementById('video');
const captureBtn = document.getElementById('capture-btn');
const previewSection = document.getElementById('preview-section');
const capturedImage = document.getElementById('captured-image');
const analyzeBtn = document.getElementById('analyze-btn');
const resultText = document.getElementById('result-text');
const resultScore = document.getElementById('result-score');

// Function to start the camera
async function startCamera() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
}

// Function to capture image from the video feed
captureBtn.addEventListener('click', () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageUrl = canvas.toDataURL('image/png');
    capturedImage.src = imageUrl;

    previewSection.classList.remove('hidden');
    document.querySelector('.camera-section').classList.add('hidden');
});

// Placeholder function to simulate health analysis and return health status with percentage score
analyzeBtn.addEventListener('click', async () => {
    // Simulate sending image data to the server for analysis (replace with actual API request)
    const imageData = capturedImage.src;

    // Mocked health analysis result (this would be returned from an actual API)
    const healthStatus = analyzeHealth(imageData);

    // Display the result
    resultText.textContent = healthStatus.status;
    resultScore.textContent = `Health Score: ${healthStatus.score}%`;
});

// Mock function for health analysis (replace with actual backend analysis)
function analyzeHealth(imageData) {
    // Randomly generate a health score between 50 and 100 for simulation
    const score = Math.floor(Math.random() * 51) + 50; // Score between 50 and 100

    let status = "Neutral";
    if (score >= 80) {
        status = "Healthy";
    } else if (score < 60) {
        status = "Unhealthy";
    }

    return { status, score };
}

// Start the camera when the page loads
startCamera();
