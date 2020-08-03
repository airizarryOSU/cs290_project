from bs4 import BeautifulSoup
import requests

url = "https://jailbreakbrewing.com/"
html = requests.get(url)
soup = BeautifulSoup(html.text, "html5lib")
beerTable = soup.select("table",class_ = "table table-hover table-condensed table-striped volumes")[0]
print(beerTable)
