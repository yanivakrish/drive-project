from flask import Flask, redirect, request, send_file
from pymongo import MongoClient
from bson import ObjectId, json_util
import gridfs

client = MongoClient('mongodb://localhost:27017')
db = client['drive_database']
fs = gridfs.GridFS(db, collection='fs')
files_collection = db['fs.files']

app = Flask(__name__)

GET, POST = 'GET', 'POST'


@app.route('/upload-file', methods=[POST])
def upload_file():
    uploaded_file = request.files['file']
    id = fs.put(uploaded_file,  filename=uploaded_file.filename)
    return {'message': str(id)}


@app.route('/get-files', methods=[GET])
def get_files():
    file_docs = list(files_collection.find(
        {}, projection={'_id': 1, 'filename': 1}))
    file_ids = [{"id": str(file_doc['_id']), "filename": str(
        file_doc['filename'])} for file_doc in file_docs]
    return json_util.dumps({'file_ids': file_ids})


@app.route('/download-file', methods=[POST])
def download_file():
    data = request.get_json()
    file_id = ObjectId(data['id'])
    file = fs.get(file_id=file_id)
    return send_file(file, as_attachment=True, download_name=file.filename)


if __name__ == '__main__':
    app.run(debug=True)
