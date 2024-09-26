document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent form from submitting the traditional way

    const name = document.getElementById('name').value;
    const number = document.getElementById('number').value;

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, number })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Login Success:', data);
        alert('Login successful!');

        // Clear the form fields
        document.getElementById('name').value = '';
        document.getElementById('number').value = '';

        // Launch the camera
        launchCamera();
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Login failed. Please try again.');
    });
});

function launchCamera() {
    const video = document.getElementById('video');

    // Access the camera
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            video.srcObject = stream;
            video.style.display = 'block';
        })
        .catch((err) => {
            console.error('Error accessing camera: ', err);
        });
}
