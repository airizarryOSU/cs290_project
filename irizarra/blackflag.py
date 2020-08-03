from bs4 import BeautifulSoup
import requests

url = "https://blackflagbrewingco.com/"
html = requests.get(url)
soup = BeautifulSoup(html.text, "html5lib")
beerTable = soup.select("table",class_ = "table table-striped taplist")[1]
print(beerTable)
