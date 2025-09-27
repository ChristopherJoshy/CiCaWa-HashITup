# IMPORTANT: KEEP THIS COMMENT
# Follow these instructions when using this blueprint:
# - Note that the newest Gemini model series is "gemini-2.5-flash" or gemini-2.5-pro"
#   - do not change this unless explicitly requested by the user
# - Sometimes the google genai SDK has occasional type errors. You might need to run to validate, at time.  
# The SDK was recently renamed from google-generativeai to google-genai. This file reflects the new name and the new APIs.

import json
import logging
import os
from typing import Dict, Any
from google import genai
from google.genai import types
from pydantic import BaseModel
from database import WasteType

# This API key is from Gemini Developer API Key, not vertex AI API Key
_client: genai.Client | None = None


def get_client() -> genai.Client:
    global _client
    if _client is not None:
        return _client

    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        raise RuntimeError("Gemini API key not configured")

    _client = genai.Client(api_key=api_key)
    return _client

class WasteClassification(BaseModel):
    waste_type: str
    confidence: float
    quantity_estimate: float
    reasoning: str

class ChatResponse(BaseModel):
    response: str
    helpful: bool

def classify_waste(description: str, image_data: bytes | None = None) -> Dict[str, Any]:
    """
    Classify waste type from description and optionally image data.
    Returns deterministic JSON with confidence threshold validation.
    """
    try:
        # Create system prompt for waste classification
        system_prompt = (
            "You are a waste classification expert. Analyze the provided description "
            "(and image if available) to classify waste into one of these categories: "
            f"{', '.join([wt.value for wt in WasteType])}. "
            "Provide a confidence score (0-1), quantity estimate in kg, and reasoning. "
            "Only classify if confidence is above 0.7. "
            "Respond with JSON: {'waste_type': 'category', 'confidence': number, "
            "'quantity_estimate': number, 'reasoning': 'explanation'}"
        )

        # Prepare content parts
        content_parts = [types.Part(text=description)]
        
        # Add image if provided
        if image_data:
            content_parts.append(
                types.Part.from_bytes(
                    data=image_data,
                    mime_type="image/jpeg",
                )
            )

        client = get_client()
        response = client.models.generate_content(
            model="gemini-2.5-pro",
            contents=[
                types.Content(role="user", parts=content_parts)
            ],
            config=types.GenerateContentConfig(
                system_instruction=system_prompt,
                response_mime_type="application/json",
                response_schema=WasteClassification,
            ),
        )

        raw_json = response.text
        logging.info(f"Waste classification raw JSON: {raw_json}")

        if raw_json:
            data = json.loads(raw_json)
            classification = WasteClassification(**data)
            
            # Validate confidence threshold
            if classification.confidence < 0.7:
                return {
                    "success": False,
                    "error": "Classification confidence too low",
                    "confidence": classification.confidence
                }
            
            # Validate waste type
            valid_types = [wt.value for wt in WasteType]
            if classification.waste_type not in valid_types:
                return {
                    "success": False,
                    "error": f"Invalid waste type: {classification.waste_type}",
                    "suggested_type": "organic"  # default fallback
                }
            
            return {
                "success": True,
                "waste_type": classification.waste_type,
                "confidence": classification.confidence,
                "quantity_estimate": classification.quantity_estimate,
                "reasoning": classification.reasoning
            }
        else:
            raise ValueError("Empty response from model")

    except Exception as e:
        if isinstance(e, RuntimeError) and "Gemini API key" in str(e):
            logging.warning("Gemini API key missing; returning fallback classification")
            return {
                "success": False,
                "error": "Gemini API key not configured",
                "fallback_type": "organic"
            }
        logging.error(f"Failed to classify waste: {e}")
        return {
            "success": False,
            "error": str(e),
            "fallback_type": "organic"
        }

def chat_with_ai(message: str, context: str = "") -> Dict[str, Any]:
    """
    General AI chat for guidance and support.
    Returns deterministic responses with helpfulness validation.
    """
    try:
        system_prompt = (
            "You are CiCaWa AI assistant, helping users with waste management, "
            "recycling guidance, and marketplace questions. Provide helpful, "
            "accurate, and concise responses. Focus on practical advice. "
            f"Context: {context}. "
            "Respond with JSON: {'response': 'your_helpful_response', 'helpful': true/false}"
        )

        client = get_client()
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=[
                types.Content(role="user", parts=[types.Part(text=message)])
            ],
            config=types.GenerateContentConfig(
                system_instruction=system_prompt,
                response_mime_type="application/json",
                response_schema=ChatResponse,
            ),
        )

        raw_json = response.text
        logging.info(f"AI chat raw JSON: {raw_json}")

        if raw_json:
            data = json.loads(raw_json)
            chat_response = ChatResponse(**data)
            
            return {
                "success": True,
                "response": chat_response.response,
                "helpful": chat_response.helpful
            }
        else:
            raise ValueError("Empty response from model")

    except Exception as e:
        if isinstance(e, RuntimeError) and "Gemini API key" in str(e):
            logging.warning("Gemini API key missing; returning fallback chat response")
            return {
                "success": False,
                "error": "Gemini API key not configured",
                "response": "I'm sorry, I couldn't process your request right now. Please try again later."
            }
        logging.error(f"Failed to process chat: {e}")
        return {
            "success": False,
            "error": str(e),
            "response": "I'm sorry, I couldn't process your request right now. Please try again later."
        }