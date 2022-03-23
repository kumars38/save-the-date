## @file scraper.py
#  @author Samarth Kumar (kumars38)
#  @brief Contains a class for scraping a course PDF file and determining the tasks and deadlines
#  @date Mar. 15th, 2022

# Imports
from datetime import date
import tabula as tb
import pandas as pd
import re

## @brief This class handles a PDF file and determines the tasks and deadlines
#  @details The file being scraped must have the .pdf extension
class PDFScraper():

    ## @brief This function is a constructor for insantiating a PDFScraper object
    #  @details The dateStrings variable is a list of strings that are typically used as headers for date columns in a table
    #  @details The dates and tasks variables are lists that are appended to after scraping is performed
    #  @details There should only be one instance of the PDFScraper class (singleton) 
    def __init__(self):
        # Constants
        self.dateStrings = ['dates','deadlines','week of']

        # Variables
        self.dates = []
        self.tasks = []

    ## @brief This function sets the scraper's file path
    #  @param filePath A string representing the path to the PDF file
    #  @throws ValueError if the file path does not end in .pdf
    def importFile(self, filePath):
        n = len(filePath)
        if filePath[n-4:n] != '.pdf':
            raise ValueError('Invalid file path (must point to a .pdf file)')
        else:
            self.filePath = filePath

    ## @brief This function determines whether a header is a relevant identifier for dates
    #  @details A relevant identifier is determined by comparing to the dateStrings constant
    #  @param heading A string representing a table column heading
    #  @return True if the heading is a date identifier, False otherwise
    def isDateHeading(self, heading):
        for keyword in self.dateStrings:
            if heading.lower() in keyword:
                return True
        return False

    ## @brief This function reads the PDF file and returns the structured data in the form of data frames
    #  (from the pandas library)
    #  @details If no start or end pages are provided, all pages are scraped
    #  @details If only one page is provided, it is assumed to be the starting page and the document is
    #  scraped from that page to the end
    #  @param startPage Integer representing the first PDF page number to begin scraping from
    #  @param endPage Integer representing the last PDF page number to scrape
    #  @return List of DataFrame objects representing the scraped structured data from the currently imported PDF, with
    #  each index representing a separate table
    #  @throws ValueError if startPage comes after endPage or page numbers less than 1 are provided
    def getDataFrames(self, startPage=None, endPage=None):
        pagesToScrape = 'all'
        # Entire page range provided
        if startPage!=None and endPage!=None:
            if startPage < 1 or startPage > endPage:
                raise ValueError('Invalid scraping page range provided')
            pagesToScrape = str(startPage)+'-'+str(endPage)
        # Only starting page is provided
        elif startPage!=None:
            if startPage < 1:
                raise ValueError('Invalid scraping page range provided')
            pagesToScrape = str(startPage)+'-'
        # No page range provided (scrape entire PDF)
        else:
            dfs = tb.read_pdf(self.filePath, pages = pagesToScrape) # Returns tables as a list of dataframes
            return dfs

    ## @brief This function finds the deadlines and corresponding tasks from DataFrame objects
    #  @details This function iterates through all data frames (tables) and further iterates the column headings and rows
    #  to create deadline/task tuples
    #  @details The 'dates' and 'tasks' state variables are updated accordingly as found
    #  @param dfs List of DataFrame objects
    #  @return Integer value representing how many tables in the PDF were found that included deadline information
    # Combine dates and tasks lists for output 2D list
    def getDeadlines(self, dfs):
        numDateTables = 0

        # Iterate through all tables found in the pdf
        for df in dfs:
            dateTable = False           # Boolean representing whether the table has relevant date/deadline info
                                        # False by default until a date is found
            firstSetOfTasks = True      # Boolean representing whether tasks list has already been appended to
            counted = False             # Boolean representing whether this table has been marked as a relevant table yet

            # Iterate through columns of current table
            for heading, rows in df.items():
                #print(f'label: {heading}')
                #print(f'content: {rows}', sep='\n')

                if dateTable:
                    if not counted:
                        counted = True
                        numDateTables += 1
                    if firstSetOfTasks:
                        for i in range(len(rows)):
                            self.tasks.append(rows[i])
                        firstSetOfTasks = False
                    else:
                        for i in range(len(rows)):
                            self.tasks[i] = self.tasks[i]+", "+rows[i]

                # Identifies current table as containing date/task info
                if self.isDateHeading(heading):
                    dateTable = True
                    for row in rows:
                        self.dates.append(row)
        return numDateTables

    ## @brief This function generates final output based on DataFrame objects and the number of date tables found
    #  @details This function reports the total number of tables and found and how many of those included relevant information
    #  @param dfs List of DataFrame objects
    #  @param numDateTables Integer value representing how many tables in the PDF include deadline information
    #  @return 2D List representing deadlines and their corresponding tasks in the form of 
    #  [(date1, task1), (date2, task2), ...]
    def generateOutput(self, dfs, numDateTables):
        outList = []
        numDates = len(self.dates)
        #print(str(len(dfs))+" total tables found.")
        #print(str(numDates)+" date/task entries found across "+str(numDateTables)+" tables.")
        for i in range(numDates):
            outList.append([self.dates[i],self.tasks[i]])
            #print(outList[i]) # For display only
        return outList

    ## @brief This function drives the scraping function by connecting the other class functions together
    #  @details This is the only PDFScraper function that is called publicly to scrape the file
    #  @details This function allows the frontend to communicate with the backend
    #  @param filePath A string representing the path to the PDF file
    #  @param startPage Integer representing the first PDF page number to begin scraping from
    #  @param endPage Integer representing the last PDF page number to scrape
    #  @return 2D List representing deadlines and their corresponding tasks in the form of 
    #  [(date1, task1), (date2, task2), ...]
    def scrape(self, filePath, startPage=None, endPage=None):
        self.importFile(filePath)
        dfs = self.getDataFrames(startPage, endPage)
        #data = tb.read_pdf(file, area = (300, 0, 600, 800), pages = '1')
        
        # Get deadlines 
        numDateTables = self.getDeadlines(dfs)

        # Get outputs -> outList
        outList = self.generateOutput(dfs, numDateTables)

        # Then Export outList -> React frontend
        return outList
