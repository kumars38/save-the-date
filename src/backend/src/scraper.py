from datetime import date
import tabula as tb
import pandas as pd
import re
import os

# Takes in a string and checks whether it is a relevant identifier for dates
def isDateHeading(s):
    for keyword in dateStrings:
        if s.lower() in keyword:
            return True
    return False

## Setup
dirname = os.path.dirname(__file__)
filename = os.path.join(dirname, '../input/two_tables_word.pdf')

dateStrings = ['dates','deadlines','week of']
numDateTables = 0
dates = []
tasks = []
outList = []

## Scrape (only structured data)
dfs = tb.read_pdf(filename, pages = 'all') # Returns all tables as a list of dataframes
#data = tb.read_pdf(file, area = (300, 0, 600, 800), pages = '1')

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
                    tasks.append(rows[i])
                firstSetOfTasks = False
            else:
                for i in range(len(rows)):
                    tasks[i] = tasks[i]+", "+rows[i]

        # Identifies current table as containing date/task info
        if isDateHeading(heading):
            dateTable = True
            for row in rows:
                dates.append(row)

# Combine dates and tasks lists for output 2D list
numDates = len(dates)
print(str(len(dfs))+" total tables found.")
print(str(numDates)+" date/task entries found across "+str(numDateTables)+" tables.")
for i in range(numDates):
    outList.append([dates[i],tasks[i]])
    print(outList[i])

# Export outList -> frontend
