To scrape courses from catalog:
rm courses.json
scrapy crawl courses -o courses.json

Scrapy Tutorial:
https://doc.scrapy.org/en/latest/intro/tutorial.html

To practice scraping the webpage you want type this in the terminal:
scrapy shell 'http://www.colorado.edu/catalog/2015-16/courses?subject=CSCI'
