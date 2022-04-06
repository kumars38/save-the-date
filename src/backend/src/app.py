## This part will be changed to interact with frontend instead of hardcode

import time ##
from flask import Flask, jsonify, request
import flask
from scraper import PDFScraper
import os
from flask_mongoengine import MongoEngine

app = Flask(__name__)
app.config['MONGODB_SETTINGS'] = {
    'db': 'your_database',
    'host': 'localhost',
    'port': 27017
}
db = MongoEngine()
db.init_app(app)

class Data(db.Document):
    filepath = db.StringField()
    def to_json(self):
        return {"filepath": self.filepath}

#dirName = os.path.dirname(__file__)
dirName = "D:\\Desktop\\School\\Classes_Winter_22\\SFWRENG 3XA3\\se3xa3_l03_g17\\src\\backend\\input\\"
'''filePath = os.path.join(dirName, 'ex1.pdf') # Changes depending on test case

p = PDFScraper()
scrapedData=p.scrape(filePath)
print("Scraped data outside: ",scrapedData)'''

@app.route('/file', methods=['POST'])
def upload_file():
    d = {}
    try:
        file = request.files['file_from_react']
        filePath = os.path.join(dirName, file.filename)
        print(f"Uploading file {filePath}")
        d['status'] = 1

        #global scrapedData
        scrapedData = p.scrape(filePath)
        print("Scraped data inside: ",scrapedData)

    except Exception as e:
        print(f"Couldn't upload file {e}")
        d['status'] = 0

    return jsonify(d)

'''@app.route('/data')
def get_current_data():
    print(filePath)
    return {'scrapedData': scrapedData}'''