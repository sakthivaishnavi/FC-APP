import jwt
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv

load_dotenv()

secret_key = os.getenv('SECRET_KEY')

def create_token(username):
    payload = {
        "username": username,
        "exp": datetime.utcnow() + timedelta(hours=30)  
    }
    token = jwt.encode(payload, secret_key, algorithm='HS256')
    return token

def verify_token(token):
    try:
        payload = jwt.decode(token, secret_key, algorithms=['HS256'])
        return payload.get("username")
    except Exception as e:
        return "Unauthorized"