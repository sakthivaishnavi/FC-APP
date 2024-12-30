from flask import *
from utils import *
from models import *
import os;
from dotenv import load_dotenv
load_dotenv()

auth_bp=Blueprint('auth',__name__)


@auth_bp.route('/register',methods=['POST'])
def register():
    data=request.get_json()
    username=data.get('username')   
    password=data.get('password')
    if not username or not password:
        return jsonify({'message':'Invalid data!'}),400
    else:
        new_user=user(username=username,password=hash_password(password))
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message':'User added successfully!'}),200

@auth_bp.route('/login',methods=['POST'])
def login():
    data=request.get_json()
    username=data.get('username')
    password=data.get('password')
    if not username or not password:
        return jsonify({'message':'Invalid data!'}),400
    else:
        user_data=user.query.filter_by(username=username).first()
        if user_data:
            print(user_data.password)
            if check_password(password,user_data.password):
                token=create_token(username)
                return jsonify({'message':'Success','token':token})
            else:
                return jsonify({'message':'Invalid password!'}),400
        else:
            return jsonify({'message':'User not found!'}),404



@auth_bp.route('/adminLogin',methods=['POST'])
def admin_login():
    data=request.get_json()
    username=data.get('email')
    password=data.get('password')
    print(data)
    if username==os.getenv('ADMIN_USERNAME') and password==os.getenv('ADMIN_PASSWORD'):
        token=create_token(username)
        return jsonify({'message':'Success','token':token})
    else:
        return jsonify({'message':'Invalid credentials!'}),400