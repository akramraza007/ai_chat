const chatForm = document.getElementById("chatForm");
const chatbox = document.getElementById("chatbox");
const typingIndicator = document.getElementById("typingIndicator");
const modeSelector = document.getElementById("modeSelector");

function scrollToBottom() {
    chatbox.scrollTop = chatbox.scrollHeight;
}

function typeOutBotResponse(targetElement, fullHtmlContent) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = fullHtmlContent;
    const words = tempDiv.innerHTML.split(/(\s+)/);
    let currentWordIndex = 0;
    let visibleText = "";
    targetElement.innerHTML = "";
    const typingInterval = setInterval(() => {
        if (currentWordIndex < words.length) {
            visibleText += words[currentWordIndex];
            targetElement.innerHTML = visibleText;
            currentWordIndex++;
            scrollToBottom();
        } else {
            clearInterval(typingInterval);
        }
    }, 25);
}

function addMessage(content, sender) {
    const msgDiv = document.createElement("div");
    msgDiv.className = `message ${sender}`;
    if (sender === "bot") {
        chatbox.appendChild(msgDiv);
        const parsedHtml = marked.parse(content);
        typeOutBotResponse(msgDiv, parsedHtml);
    } else {
        msgDiv.textContent = content;
        chatbox.appendChild(msgDiv);
        gsap.fromTo(msgDiv, 
            { scale: 0.4, opacity: 0, y: 20 },
            { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.5)" }
        );
    }
    scrollToBottom();
}

modeSelector.addEventListener("change", async (e) => {
    const selectedMode = e.target.value;    
    try {
        const formData = new FormData();
        formData.append("mode", selectedMode);
        await fetch("/select_mode", {
            method: "POST",
            body: formData
        });
        
        let introGreeting = "";
        if (selectedMode === "happy") {
            introGreeting = "LETTT'S GOOO! I'm hyped to chat! What are we cooking up today? 🙌🔥";
        } else if (selectedMode === "sad") {
            introGreeting = "*sigh* hi... what do you want to talk about. encoding data or whatever i guess... 💀";
        } else if (selectedMode === "funny") {
            introGreeting = "Oh great, you clicked me. What ground-breaking query do you have for me to roast today? 🌶️🤖";
        }
        chatbox.innerHTML = `
            <div class="message bot">
                ${introGreeting}
            </div>
        `;
        
    } catch (error) {
        console.error("Failed to alter mood profiles:", error);
    }
});

chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const messageInput = document.getElementById("message");
    const message = messageInput.value.trim();
    if (!message) return;
    addMessage(message, "user");
    messageInput.value = "";
    typingIndicator.style.display = "block";
    gsap.fromTo(typingIndicator, { opacity: 0 }, { opacity: 1, duration: 0.2 });
    try {
        const formData = new FormData();
        formData.append("message", message);
        const response = await fetch("/chat", {
            method: "POST",
            body: formData
        });
        const data = await response.json();
        typingIndicator.style.display = "none";
        addMessage(data.response, "bot");
    } catch (error) {
        typingIndicator.style.display = "none";
        addMessage("Error connecting to server.", "bot");
    }
});