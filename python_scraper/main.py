from bs4 import BeautifulSoup
import requests
import time

# Define parameters provided by Brightdata  
host = 'brd.superproxy.io'  
port = 9222  
username = 'brd-customer-hl_55283af1-zone-scraping_browser2'  
password = 'vvj5auhb5b31'  
# session_id = random.random() 

# format your proxy  
proxy_url = ('http://{}-session-{}:{}@{}:{}'.format(username, session_id,password, host, port))  
  
# define your proxies in dictionary  
proxies = {'http': proxy_url, 'https': proxy_url} 

url = "https://brightdata.com/"  
response = requests.get(url, proxies=proxies) 


# print('Put some skill that you are not familiar with')
# unfamiliar_skill = input('>')
# print(f'Filtering out {unfamiliar_skill}')

# def find_jobs():
# html_text = requests.get('https://www.amazon.com/s?k=samsung+galaxy+s23+ultra&crid=9MCNTIRKHIS5&sprefix=samsung%2Caps%2C535&ref=nb_sb_ss_ts-doa-p_1_7')
html_text = requests.get('https://www.ebay.com/b/Cell-Phones-Smartphones/9355/bn_320094', )
# html_text = requests.get('https://orla.africa/')
# soup = BeautifulSoup(html_text, 'lxml')
  
print(html_text)
  # jobs = soup.find_all('li', class_ = 'gjgjgjgjgjgjj')
  # for job in jobs:
  #   published_date = job.find('span', class_ = 'jjfjfff').span.text
  #   if 'few' in published_date:
  #     company_name = job.find('h3', class_ = 'gjgjgjgj').text.replace(' ', '')
  #     skills = job.find('span', class_ = "fjgjgjgjg").text.replace(' ', '')
  #     more_info = job.header.h2.a['href']
  #     if unfamiliar_skill not in skills:
  #       print(f"Company Name: {company_name.strip()}")
  #       print(f"Required Skills: {skills.strip()}")
  #       print(f"More Info: {more_info}")
        
  #       print('')