
import os
import html
import resend

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr, Field

app = FastAPI()

# Email service configuration
resend.api_key = os.environ.get("RESEND_API_KEY")

RECEIVER_EMAIL = os.environ.get("RECEIVER_EMAIL")
SENDER_EMAIL = os.environ.get("SENDER_EMAIL")
GMAIL_ONLY = os.environ.get("GMAIL_ONLY", "false").lower() == "true"


class ContactForm(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    message: str = Field(min_length=5, max_length=5000)


@app.get("/api/health")
def health():
    return {"status": "Contact API is running"}


@app.post("/api/contact")
def send_contact(data: ContactForm):

    if not resend.api_key or not RECEIVER_EMAIL or not SENDER_EMAIL:
        raise HTTPException(
            status_code=500,
            detail="Email service is not configured."
        )

    visitor_email = str(data.email).strip()

    # Optional Gmail-only restriction
    if GMAIL_ONLY and not visitor_email.lower().endswith("@gmail.com"):
        raise HTTPException(
            status_code=400,
            detail="Please enter a Gmail address."
        )

    name = html.escape(data.name.strip())
    message = html.escape(data.message.strip())

    if len(name) < 2 or len(message) < 5:
        raise HTTPException(
            status_code=400,
            detail="Please enter valid details."
        )

    try:
        result = resend.Emails.send({
            "from": SENDER_EMAIL,
            "to": [RECEIVER_EMAIL],
            "reply_to": visitor_email,
            "subject": f"Portfolio Contact: {data.name}",
            "html": f"""
                <h2>New Portfolio Message</h2>
                <p><b>Name:</b> {name}</p>
                <p><b>Email:</b> {html.escape(visitor_email)}</p>
                <p><b>Message:</b></p>
                <p>{message.replace(chr(10), '<br>')}</p>
            """,
            "text": (
                f"Name: {data.name}\n"
                f"Email: {visitor_email}\n\n"
                f"Message:\n{data.message}"
            )
        })

        return {
            "success": True,
            "message": "Your message has been sent successfully!"
        }

    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Unable to send your message. Please try again later."
        )
