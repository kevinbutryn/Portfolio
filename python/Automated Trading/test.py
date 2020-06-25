import requests

apikey = "brk4o8vrh5r9g3otirag"

# get stock quotes
r = requests.get('https://finnhub.io/api/v1/stock/symbol?exchange=US&token=')
print(r.json())

# get general news
r = requests.get('https://finnhub.io/api/v1/news?category=general&token=')
print(r.json())

# get company news
r = requests.get('https://finnhub.io/api/v1/company-news?symbol=AAPL&from=2020-04-30&to=2020-05-01&token=')
print(r.json())

# news sentiment
r = requests.get('https://finnhub.io/api/v1/news-sentiment?symbol=V&token=')
print(r.json())

# get peers?
r = requests.get('https://finnhub.io/api/v1/stock/peers?symbol=AAPL&token=')
print(r.json())

# basic financials 
r = requests.get('https://finnhub.io/api/v1/stock/metric?symbol=AAPL&metric=all&token=')
print(r.json())

# recommendation trends
r = requests.get('https://finnhub.io/api/v1/stock/recommendation?symbol=AAPL&token=')
print(r.json())

# price target
r = requests.get('https://finnhub.io/api/v1/stock/price-target?symbol=NFLX&token=')
print(r.json())

# earnings calculator
r = requests.get('https://finnhub.io/api/v1/calendar/earnings?from=2020-03-12&to=2020-03-15&token=')
print(r.json())

# pattern recognition?
r = requests.get('https://finnhub.io/api/v1/scan/pattern?symbol=AAPL&resolution=D&token=')
print(r.json())

# resistance levels
r = requests.get('https://finnhub.io/api/v1/scan/support-resistance?symbol=IBM&resolution=D&token=')
print(r.json())

# aggregate indicators
r = requests.get('https://finnhub.io/api/v1/scan/technical-indicator?symbol=AAPL&resolution=D&token=')
print(r.json())

# technical indicators
r = requests.get('https://finnhub.io/api/v1/indicator?symbol=AAPL&resolution=D&from=1583098857&to=1584308457&indicator=sma&timeperiod=3&token=')
print(r.json())

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

