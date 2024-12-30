from flask import *
from models import *
from utils import *
import os;
from dotenv import load_dotenv
load_dotenv()


admin_bp=Blueprint('admin',__name__)
# @admin_bp.before_request
# def check_token():
#     token=None
#     if 'Authorization' in request.headers:
#         token=request.headers['Authorization'].split(" ")[1]

#     if not token:
#         return jsonify({'message':'Token is missing!'})
#     else:
#         data=verify_token(token)
#         if data=="Unauthorized" or not data:
#             return jsonify({'message':'Unauthorized'})

@admin_bp.route('/add', methods=['POST'])
def add_food():
    data = request.get_json()

    try:
        new_food=special( items=data['items'])
        db.session.add(new_food)
        db.session.commit()

        return jsonify({'message': 'Item added successfully!'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to add item', 'details': str(e)}), 500


@admin_bp.route('/update',methods=['PUT'])
def update_food():
    data = request.get_json()
    food = daily_food.query.get(data['id'])
    if food:
        food.name = data.get('name', food.name)
        food.price = data.get('price', food.price)
        food.type = data.get('type', food.type)
        food.image = data.get('image', food.image)
        db.session.commit()
        return jsonify({'message': 'Item updated successfully!'})
    else:
        return jsonify({'message': 'Item not found!'}), 404
    
@admin_bp.route('/orders',methods=['GET'])
def orderList():
    data = order_list.query.all()
    orders = []  # Initialize as a list to store the orders
    for i in data:
        order = {
            'id': i.id,
            'order': i.orders  # Assuming 'order' is a JSON field, you may need to convert it to a dictionary
        }
        orders.append(order)  # Append the formatted order to the list

    return jsonify({'orders': orders, 'success': True})



@admin_bp.route('/history',methods=['GET'])
def orderHistory():
    data=order_history.query.all()
    orders=[]
    for i in data:
        orders.append({
            'orders':i.orders,
            'time':i.time
        })
    return jsonify({'orders':orders,'success':True})    


@admin_bp.route('/add-history',methods=['POST'])
def addHistory():
    data=request.get_json()
    new_order=order_history(orders=data['orders'],time=data['time'])
    db.session.add(new_order)
    db.session.commit()
    return jsonify({'message':'Order added successfully!'}),200
