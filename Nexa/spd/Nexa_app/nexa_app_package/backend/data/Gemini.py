import google.generativeai as genai
import os
from typing import List, Dict, Optional
import datetime

class GeminiService:
    def __init__(self):
        """Initialize the Gemini AI service with API key from environment."""
        self.api_key = os.getenv("GEMINI_API_KEY", "AIzaSyAMpxteAJo7No3yme2h1-O_KuYp10cI0Ow")
        genai.configure(api_key=self.api_key)
        self.model = genai.GenerativeModel("gemini-2.0-flash")
        self.chat_sessions = {}  # Store chat sessions by user_id
        
    def start_chat(self, user_id: str) -> str:
        """Start a new chat session for a user."""
        chat = self.model.start_chat()
        self.chat_sessions[user_id] = chat
        return f"Chat session started for user {user_id}"
    
    def send_message(self, user_id: str, message: str) -> Dict[str, str]:
        """Send a message to the AI and get response."""
        try:
            if user_id not in self.chat_sessions:
                self.start_chat(user_id)
            
            chat = self.chat_sessions[user_id]
            response = chat.send_message(message)
            
            return {
                "success": True,
                "message": message,
                "response": response.text,
                "user_id": user_id,
                "timestamp": str(datetime.datetime.now())
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e),
                "user_id": user_id,
                "timestamp": str(datetime.datetime.now())
            }
    
    def get_chat_history(self, user_id: str) -> List[Dict[str, str]]:
        """Get the chat history for a user."""
        if user_id not in self.chat_sessions:
            return []
        
        chat = self.chat_sessions[user_id]
        history = []
        
        try:
            # Get the history from the chat session
            for message in chat.history:
                history.append({
                    "role": "user" if message.role == "user" else "assistant",
                    "content": message.parts[0].text if message.parts else "",
                    "timestamp": str(datetime.datetime.now())
                })
        except Exception as e:
            print(f"Error getting chat history: {e}")
            
        return history
    
    def clear_chat(self, user_id: str) -> Dict[str, str]:
        """Clear the chat history for a user."""
        if user_id in self.chat_sessions:
            del self.chat_sessions[user_id]
            return {
                "success": True,
                "message": "Chat history cleared",
                "user_id": user_id
            }
        return {
            "success": False,
            "error": "No chat session found",
            "user_id": user_id
        }
    
    def get_available_models(self) -> List[str]:
        """Get list of available Gemini models."""
        try:
            models = [m.name for m in genai.list_models()]
            return models
        except Exception as e:
            return [f"Error fetching models: {str(e)}"]

# Create a singleton instance
gemini_service = GeminiService()
