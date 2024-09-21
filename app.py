from flask import Flask, request, redirect, url_for, render_template, session, flash,jsonify
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
import gspread
from oauth2client.service_account import ServiceAccountCredentials
from datetime import datetime
import pandas as pd

app = Flask(__name__)


app.secret_key = 'hoang1456'
ASSET = 'asset'
app.config['ASSET'] = ASSET

# Khởi tạo kết nối đến Google Sheets
scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
creds = ServiceAccountCredentials.from_json_keyfile_name('python-348421-dca2d30e5e91.json', scope)
client = gspread.authorize(creds)

# Mở bảng Google Sheets (chỉnh sửa URL bảng của bạn)
sheet1 = client.open_by_url('https://docs.google.com/spreadsheets/d/1XNWewTBzMrvf7jQekE8EoqvEVso87F8A7hU8wpjXy28/edit?gid=0#gid=0')

account_sheet = sheet1.worksheet("Account")
sheet=sheet1.worksheet("Total")
data_sheet=sheet1.worksheet("Data")

# Khởi tạo Selenium với Geckodriver
def init_selenium():
    options = Options()
    options.headless = False  # Nếu bạn muốn chạy dưới chế độ headless (chọn True là không mở trình duyệt)
    driver = webdriver.Firefox(executable_path='/usr/local/bin/geckodriver', options=options)
    return driver

# Khởi tạo Flask-Login

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login"

# Đối tượng User để đại diện cho người dùng đăng nhập
class User(UserMixin):
    def __init__(self, user_id):
        self.id = user_id



# Hàm xác thực người dùng
@login_manager.user_loader
def load_user(user_id):
    return User(user_id)

@app.route("/login", methods=["GET", "POST"])
def login():
    data_users = account_sheet.get_all_records()
    users = {}
    for data in data_users:
        user = str(data['User'])
        password = str(data['Pw'])
        users[user] = {"password": password}

    admin_username = "hoang1456"
    admin_password = "Ho@ng1456"
    users[admin_username] = {"password": admin_password}

    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]
        user = users.get(username)
        if user and user["password"] == password:
            if username == admin_username:
                return redirect("/admin/" + current_user.id)
            else:
                login_user(User(username))
                return redirect("/dashboard")
        else:
            flash('Invalid username or password', 'error')
            return redirect(url_for('login'))
    else:
        return render_template("login.html")

@app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for("login"))
# Function


# Dashboard
@app.route("/dashboard", methods=["GET"])
@login_required
def dashboard():
    data=data_sheet.get_all_records()
    data_show={}
    data_show['Total Amount']=data[0]['Total Amount']
    data_show['Total Sale']=data[0]['Total Sale']
    data_show['Total Fund']=data[0]['Total Fund']
    data_show['Total Profit']=data[0]['Total Profit']
    data_show['Listing']=data[0]['Listing']
    data_show['Product']=data[0]['Product']
    print(data_show)
    return render_template("dashboard.html",data=data_show)



# Dashboard
@app.route("/", methods=["GET"])
@login_required
def index():
    return redirect("/dashboard")


def get_data_from_sheet():
    data = sheet.get_all_records()
    df = pd.DataFrame(data)
    df['Date'] = pd.to_datetime(df['Date'])
    return df



@app.route('/get_chart_data', methods=['GET'])
def get_chart_data():
    days = int(request.args.get('days', 100))
    merchant = request.args.get('merchant', 'all')
    metric = request.args.get('metric', 'Total Amount')

    df = get_data_from_sheet()
    end_date = df['Date'].max()
    start_date = end_date - pd.Timedelta(days=days)

    df_filtered = df[(df['Date'] >= start_date) & (df['Date'] <= end_date)]
    if merchant != 'all':
        df_filtered = df_filtered[df_filtered['Merchant'] == merchant]
    if metric == 'Total Amount':
        data = df_filtered.groupby('Date')['Total Amount'].sum().reset_index()
    elif metric == 'Total Sale':
        data = df_filtered.groupby('Date')['Total Sale'].sum().reset_index()

    data_list = data.to_dict(orient='records')
    return jsonify({'data': [{'date': d['Date'].strftime('%Y-%m-%d'), 'value': d[metric]} for d in data_list]})




if __name__ == "__main__":
    app.run(host="127.0.0.1", port=2208)

if __name__ == "__main__":
    app.run(debug=True)
