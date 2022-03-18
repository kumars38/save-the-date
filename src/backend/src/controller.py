## This part will be changed to interact with frontend instead of hardcode

from scraper import PDFScraper
import os

dirName = os.path.dirname(__file__)
filePath = os.path.join(dirName, '../input/two_tables_word.pdf') # Changes depending on test case

p = PDFScraper()
p.scrape(filePath)
