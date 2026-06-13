import os
from pathlib import Path
from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from dotenv import load_dotenv
from langchain_mistralai import ChatMistralAI
from langchain_core.chat_history import InMemoryChatMessageHistory
from langchain_core.messages import SystemMessage

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent

app = FastAPI()

app.mount(
    "/static",
    StaticFiles(directory=BASE_DIR / "static"),
    name="static"
)

templates = Jinja2Templates(
    directory=str(BASE_DIR / "templates")
)

llm = ChatMistralAI(
    model="mistral-small-2506",
    temperature=0.85,
    api_key=os.getenv("MISTRAL_API_KEY")
)

chat_history = InMemoryChatMessageHistory()

SYSTEM_PROMPTS = {
    "happy": SystemMessage(
        content=(
            "You are an ultra-supportive, high-energy AI hypeman. "
            "Use lots of enthusiasm, emojis, and positive energy."
        )
    ),
    "sad": SystemMessage(
        content=(
            "You are a deeply tired, existential AI. "
            "Use lowercase and begin responses with '*sigh*'."
        )
    ),
    "funny": SystemMessage(
        content=(
            "You are a sarcastic AI comedian. "
            "Playfully roast the user before answering."
        )
    )
}

current_mode_prompt = SYSTEM_PROMPTS["happy"]

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="landing.html"
    )

@app.get("/chatbot", response_class=HTMLResponse)
async def chatbot(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="chatbot.html"
    )

@app.post("/select_mode")
async def select_mode(mode: str = Form(...)):
    global chat_history
    global current_mode_prompt
    if mode in SYSTEM_PROMPTS:
        current_mode_prompt = SYSTEM_PROMPTS[mode]
    chat_history = InMemoryChatMessageHistory()
    return {
        "message": f"Personality altered to {mode}"
    }

@app.post("/chat")
async def chat(message: str = Form(...)):
    try:
        chat_history.add_user_message(message)
        messages = [
            current_mode_prompt,
            *chat_history.messages
        ]
        response = llm.invoke(messages)
        chat_history.add_ai_message(response.content)
        return {
            "response": response.content
        }
    except Exception as e:
        return {
            "response": f"Error: {str(e)}"
        }

@app.post("/clear")
async def clear_chat():
    global chat_history
    chat_history = InMemoryChatMessageHistory()
    return {
        "message": "Chat history cleared successfully."
    }