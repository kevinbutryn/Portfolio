# importing the requests library 
import requests 
  
# api-endpoint 
URL = "http://maps.googleapis.com/maps/api/geocode/json"
URL = "https://api.tradestation.com/v2/data/symbol/AMZN?access_token=1JUjFiNFFGWEdDM"
  
# location given here 
location = "delhi technological university"
  
# defining a params dict for the parameters to be sent to the API 
# PARAMS = {'address':location} 
  
# sending get request and saving the response as response object 
# r = requests.get(url = URL, params = PARAMS) 
r = requests.get(url = URL) 

# extracting data in json format 
data = r.json() 

print(data)
  
  
# # extracting latitude, longitude and formatted address  
# # of the first matching location 
# latitude = data['results'][0]['geometry']['location']['lat'] 
# longitude = data['results'][0]['geometry']['location']['lng'] 
# formatted_address = data['results'][0]['formatted_address'] 
  
# # printing the output 
# print("Latitude:%s\nLongitude:%s\nFormatted Address:%s"
#       %(latitude, longitude,formatted_address)) 