import scrapy


class CoursesSpider(scrapy.Spider):
    name = "courses_html"
    start_urls = [
        'http://www.colorado.edu/catalog/2016-17/courses?subject=CSCI'#,
        # 'http://www.colorado.edu/catalog/2016-17/courses?page=1&subject=CSCI',
        # 'http://www.colorado.edu/catalog/2016-17/courses?page=2&subject=CSCI',
        # 'http://www.colorado.edu/catalog/2016-17/courses?page=3&subject=CSCI',
        # 'http://www.colorado.edu/catalog/2016-17/courses?page=4&subject=CSCI'
    ]

    def parse(self, response):
        page = response.url
        filename = 'courses.html'
        with open(filename, 'wb') as f:
            f.write(response.body)
