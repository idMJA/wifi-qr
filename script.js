document.addEventListener('DOMContentLoaded', function() {
    // Update timestamp
    function updateTimestamp() {
        const now = new Date();
        const formatted = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
        document.getElementById('timestamp').textContent = formatted;
    }
    
    updateTimestamp();
    setInterval(updateTimestamp, 1000);

    // Password visibility toggle
    const togglePassword = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('password');
    
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.querySelector('i').classList.toggle('fa-eye');
        this.querySelector('i').classList.toggle('fa-eye-slash');
    });

    // QR Code generation
    let qrcode = null;
    
    document.getElementById('wifi-form').addEventListener('submit', function(e) {
        e.preventDefault();

        const ssid = document.getElementById('ssid').value;
        const password = document.getElementById('password').value;
        const encryption = document.getElementById('encryption').value;
        
        // Clear previous QR code if exists
        if (qrcode) {
            qrcode.clear();
        }

        // Generate WiFi connection string
        const wifiString = `WIFI:T:${encryption};S:${ssid};P:${password};;`;

        // Create new QR code
        qrcode = new QRCode(document.getElementById("qrcode"), {
            text: wifiString,
            width: 256,
            height: 256,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

        // Show download button
        document.getElementById('download-btn').style.display = 'block';
    });

    // Download QR Code
    document.getElementById('download-btn').addEventListener('click', function() {
        const canvas = document.querySelector('#qrcode canvas');
        if (!canvas) return;

        const link = document.createElement('a');
        link.download = `wifi-qr-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    });

    // Form input validation
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            this.value = this.value.trim();
        });
    });
});