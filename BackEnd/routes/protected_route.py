from flask import *
import razorpay
from datetime import datetime
from models import *
from utils import *
from razorpay import *
from dotenv import load_dotenv
import os
from datetime import datetime
load_dotenv()
protected_bp=Blueprint('protected',__name__)
data=None

client = Client(auth=(os.getenv('RAZORPAY_KEY_ID'), os.getenv('RAZORPAY_KEY_SECRET')))
@protected_bp.before_request
def check_token():
    global data
    token=None
    
    if 'Authorization' in request.headers:
        token=request.headers['Authorization'].split(" ")[1]

    if not token:
        return jsonify({'message':'Token is missing!'})
    else:
        data=verify_token(token)
        if data=="Unauthorized" or not data:
            return jsonify({'message':'Unauthorized'})  

@protected_bp.route('/verify',methods=['GET'])
def home():
    return jsonify({"message":"Authorized","username":data})



@protected_bp.route('/',methods=['PUT'])
def update_food():
    data = request.get_json()
    food = daily_food.query.filter_by(name='Chicken Biryani').first()
    if food:
        food.quantity = data['quantity']
        db.session.commit()
    return jsonify({'message': 'Items updated successfully!'})

@protected_bp.route('/',methods=['GET'])
def get_all():
    foods=daily_food.query.all()
    output=[{'name':food.name,'price':food.price,'type':food.type,'image':food.image,'quantity':food.quantity} for food in foods]
    return jsonify(output)

@protected_bp.route('/cart', methods=['POST'])
def cart_update():
    data = request.get_json()
    user = data.get('user')
    items = data.get('item')
    current_app.logger.info(request.get_json())
    if not user or not items:
        return jsonify({'message': 'Invalid data!'})

    new_cart = cart.query.filter_by(user=user).first()

    if new_cart:
        existing_items = new_cart.item
        updated_items = existing_items+items
        new_cart.item = updated_items
        message = 'Cart updated successfully!'
    else:
        new_cart = cart(user=user, item=items)
        db.session.add(new_cart)
        message = 'All items added to cart successfully!'
    db.session.commit()
    return jsonify({'message': message})
@protected_bp.route('/token', methods=['GET'])
def token():
    data = order_list.query.order_by(order_list.id.desc()).first()
    orders=[]
    
    order = {
        'id': data.id,
        'order': data.orders  # Assuming 'order' is a JSON fieldyou may need to convert it to a dictionary
    }
    orders.append(order)  # Append the formatted order to the list

    return jsonify({'orders': orders, 'success': True})

@protected_bp.route('/cart/remove', methods=['POST'])
def cart_remove():
    data = request.get_json()
    user = data.get('user')
    items = data.get('item')
    if not user or not items:
        return jsonify({'message': 'Invalid data!'})

    new_cart = cart.query.filter_by(user=user).first()

    if new_cart:
        updated_items = items
        new_cart.item = updated_items
        message = 'Cart updated successfully!'
    else:
        message='user not found'
    db.session.commit()
    return jsonify({'message': message})


@protected_bp.route('/create-order',methods=['POST'])
def create_order():
    try:
        data = request.json 
        amount = data['amount'] 
        currency = "INR"

        order = client.order.create({
            "amount": amount,
            "currency": currency,
            "payment_capture": 1  
        })

        return jsonify(order), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    


@protected_bp.route('/verify-payment',methods=['POST'])
def verify_payment():
    try:
        data = request.json

        razorpay_order_id = data['razorpay_order_id']
        razorpay_payment_id = data['razorpay_payment_id']
        razorpay_signature = data['razorpay_signature']

        client.utility.verify_payment_signature({
            'razorpay_order_id': razorpay_order_id,
            'razorpay_payment_id': razorpay_payment_id,
            'razorpay_signature': razorpay_signature
        })

        return jsonify({"status": "success"}), 200
    except razorpay.errors.SignatureVerificationError:
        return jsonify({"status": "failure", "error": "Invalid signature"}), 400
    except Exception as e:
        return jsonify({"status": "failure", "error": str(e)}), 400

@protected_bp.route('/cart/<username>',methods=['GET'])
def get_cart(username):
    current_app.logger.info("hello %s",username)
    cart_items=cart.query.filter_by(user=username).all()
    output=[{'user':item.user,'items':item.item} for item in cart_items]
    return jsonify(output)

@protected_bp.route('/cart-remove/<username>',methods=['DELETE'])
def remove_cart(username):
    cart_items=cart.query.filter_by(user=username).first()
    db.session.delete(cart_items)
    db.session.commit()
    return jsonify({'message':'Cart removed successfully!'})

@protected_bp.route('/special',methods=['GET'])
def special_food():
    data=special.query.all()
    output=[{'items':food.items,'id':food.id} for food in data]
    return jsonify(output)

@protected_bp.route('/orderlist',methods=['POST'])
def orderlist():
    data=request.get_json()
    orders=data.get('orders')
    new_order=order_list(orders=orders)
    db.session.add(new_order)
    db.session.commit()
    return jsonify({'message':'Order placed successfully!','success':True})