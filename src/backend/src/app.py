## This part will be changed to interact with frontend instead of hardcode

import time ##
from flask import Flask, jsonify, request
from schema import Schema
from scraper import PDFScraper
import os

app = Flask(__name__)

dirName = os.path.dirname(__file__)
#dirName = "D:\\Desktop\\School\\Classes_Winter_22\\SFWRENG 3XA3\\se3xa3_l03_g17\\src\\backend\\input\\"
filePath = os.path.join(dirName, '../input/two_tables_word.pdf') #Changes depending on test case

p = PDFScraper()
scrapedData = p.scrape(filePath)

@app.route('/data')
def get_current_data():
    return {'scrapedData': scrapedData}

if __name__ == "__main__":
    app.run()
