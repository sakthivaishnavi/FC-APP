from flask_sqlalchemy import SQLAlchemy
from utils import db

class daily_food(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    name=db.Column(db.String(100))
    price=db.Column(db.Float)
    type=db.Column(db.String(100))
    image=db.Column(db.String(100))
    quantity=db.Column(db.Integer)

class cart(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    user=db.Column(db.String(150))
    item=db.Column(db.JSON)

class user(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    username=db.Column(db.String(150),unique=True)
    password=db.Column(db.String(200))

class special(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    items=db.Column(db.JSON)


class order_list(db.Model):
   
    id=db.Column(db.Integer,primary_key=True)
    orders=db.Column(db.JSON)


class order_history(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    orders=db.Column(db.JSON)
    time=db.Column(db.String(50))
    