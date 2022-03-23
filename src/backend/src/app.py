## This part will be changed to interact with frontend instead of hardcode

import time ##
from flask import Flask
from scraper import PDFScraper
import os

app = Flask(__name__)

dirName = os.path.dirname(__file__)
filePath = os.path.join(dirName, '../input/two_tables_word.pdf') # Changes depending on test case

p = PDFScraper()
scrapedData = p.scrape(filePath)

@app.route('/data')
def get_current_data():
    return {'scrapedData': scrapedData}



