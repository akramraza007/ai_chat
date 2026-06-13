# 🤖 AI Chatbot using FastAPI and Generative AI

A modern, immersive Generative AI chatbot built using **FastAPI**, **LangChain orchestration**, and the **Mistral AI** model platform. This project provides an ultra-responsive web interface with real-time markdown streaming, custom animations, and multi-personality context switching.


## 📌 Project Overview

This project demonstrates how a stateful Generative AI assistant can be integrated into an asynchronous Python web framework. Users can dynamically adjust the behavioral tone of the bot and stream responses back over optimized asynchronous server routes.

The project was developed as part of **Beyond Curriculum Training (BCT)** to explore practical, enterprise-grade applications of Generative AI, framework orchestration, and client-side design.


## 🛠️ Technologies Used

* **Python**
* **FastAPI**
* **LangChain**
* **langchain-mistralai** (`mistral-small-2506`)
* **HTML5 & Jinja2**
* **CSS3**
* **JavaScript**

## 📂 Project Structure

The project code is modularly structured to enforce clean separation of concerns:

```text
AI-Chatbot/
│
├── main.py
├── requirements.txt
├── .env
│
├── static/
│   ├── css/
│   │   ├── landing.css
│   │   └── chatbot.css
│   └── js/
│       └── chatbot.js
│
└── templates/
    ├── landing.html
    └── chatbot.html
```
## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/akramraza007/ai_chat.git
```
```
cd ai_chat
```

### 2. Create a Virtual Environment

```bash
python -m venv venv
```

### 3. Activate the Virtual Environment

```bash
venv\Scripts\activate
```
### 4. Install Dependencies

```bash
pip install -r requirements.txt
```

---

## 🔑 Configure OpenRouter API Key

Create a `.env` file in the project root directory and add:

```env
MISTRAL_API_KEY = enter you mistral api key
```

# 🔑 Quick Guide: Get a Mistral AI API Key

Here is the easiest way to get your API key.

---

### Step 1: Sign Up or Log In
1. Go to the **[Mistral AI Console](https://console.mistral.ai/)**.
2. Sign in

### Step 2: Activate the Free Plan
1. In the left sidebar, click **Subscriptions** or **Billing**.
2. Choose the **Experiment Plan (Free)**.
3. Verify your **mobile phone number** to activate it.

### Step 3: Create the Key
1. In the left sidebar, click on **API Keys**.
2. Click the **`Create new key`** button.
3. Give your key a name and click **Create**.

### Step 4: Copy & Save
1. **Copy the key immediately**. 
2. Paste it directly into your project's `.env` file like this:

```env
MISTRAL_API_KEY = enter you mistral api key
```

> ⚠️ Never share your API key publicly or push it to GitHub.

---

## ▶️ Run the Application

Start the FastAPI server:

```bash
uvicorn main:app --reload
```

You should see output similar to:

```text
INFO: Uvicorn running on http://127.0.0.1:8000
```

Open your browser and visit:

```text
http://127.0.0.1:8000
```
---