import scrapy
import re


class CoursesSpider(scrapy.Spider):
    name = "courses"
    start_urls = [
        'http://www.colorado.edu/catalog/2016-17/courses?page=0&subject=CSCI',
        'http://www.colorado.edu/catalog/2016-17/courses?page=1&subject=CSCI',
        'http://www.colorado.edu/catalog/2016-17/courses?page=2&subject=CSCI',
        'http://www.colorado.edu/catalog/2016-17/courses?page=3&subject=CSCI',
        'http://www.colorado.edu/catalog/2016-17/courses?page=4&subject=CSCI'
    ]

    def parse(self, response):
        page = re.findall('page=.{1}',response.url)[0]
        counter = 0
        for course in response.xpath('//h2[@class="node-title"]/a/text()'):
            yield {
                'page' : page,
                'counter' : counter,
                'department' : course.re("^[A-Z]{4}"),
                'course_number' : course.re("[0-9]{4}"),
                'credits' : course.re("\([0-9]\)"),
                'title' : course.re("\).*"),
            }
            counter+=1
        counter = 0
        for descriptions in response.xpath('//div[@class="field-items"]/div/text()'):
            yield {
                'page' : page,
                'counter': counter,
                'prerequisites' : descriptions.re("Requisites:.*"),
                'description' : descriptions.extract()
            }
            counter+=1
