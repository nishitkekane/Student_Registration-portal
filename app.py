from flask import Flask, request, app, render_template, redirect
from ocrmodel import ocrHandler
from flask_cors import CORS
import cv2
import numpy as np

app = Flask(__name__)
CORS(app, origins=['http://localhost:5173'])
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response
@app.route('/', methods = ['GET', 'POST'])
def index():
    if request.method == 'POST':

        if 'file' not in request.files:
            return 'No file part', redirect('/')
    
        file = request.files['file']
        npimg = np.fromfile(file, np.uint8)
        file = cv2.imdecode(npimg, cv2.IMREAD_COLOR)
        li = ocrHandler(file)
        print(li)
        return li
        
    return render_template('index.html')

if __name__ == '__main__':
    app.run( port=5000, debug=True, threaded=True)