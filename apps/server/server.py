from flask import Flask, redirect, request
from pymongo import MongoClient
import gridfs

db = MongoClient('mongodb://localhost:27017').drive_database
fs = gridfs.GridFS(db)

app = Flask(__name__)

GET, POST = 'GET', 'POST'


@app.route('/upload-file', methods=[POST])
def upload_file():
    uploaded_file = request.files['file']
    id = fs.put(uploaded_file)
    return {'message': str(id)}


@app.route('/get-files', methods=[GET])
def get_files():
    return db['fs.files'].find()


if __name__ == '__main__':
    app.run(debug=True)
