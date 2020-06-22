import requests

apikey = "brk4o8vrh5r9g3otirag"



def API_quote(symbol):
    r = requests.get('https://finnhub.io/api/v1/quote?symbol=' + symbol + '&token=' + apikey)
    return r.json()

# o = Open price of the day
# h = High price of the day
# l = Low price of the day
# c = Current price
# pc = Previous close price

company = "AAPL"

json_info = API_quote(company)

open_price_of_the_day = json_info['o']
high_price_of_the_day = json_info['h']
low_price_of_the_day = json_info['l']
current_price = json_info['c']
previous_close_price = json_info['pc']


print(json_info)
print(json_info['c'])

