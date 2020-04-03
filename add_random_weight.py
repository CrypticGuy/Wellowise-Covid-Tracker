import csv
from random import randint
import json

# Website to generate the dummypoint: http://www.geomidpoint.com/random/
# Copy the entire data seperated by commas and paste it in a file dummypointdata.csv
# Run this script and get the json in weight_dummy_data.json
# Now we will write the json script to load them as the proper data

arr = []
with open('dummypointdata.csv', newline='') as csvfile:
    spamreader = csv.reader(csvfile, delimiter=',', quotechar='|')
    for row in spamreader:
        temp = [row[1], row[3]]
        r = randint(0, 10)
        temp.append(r)
        arr.append(temp)
csvfile.close()

data = []

for i in arr:
    temp = {}
    temp['location'] = {'lat': i[0], 'lng': i[1]}
    temp['weight'] = i[2]
    data.append(temp)

#print(data)
with open('weighted_dummy_data.json', 'w') as outfile:
    json.dump(data, outfile)
