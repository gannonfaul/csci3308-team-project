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
        for course in response.xpath('//*[starts-with(@id, "node-course-")]'):
            yield {
                'department' : course.css('a::text').re('[A-Z]{4}'),
                'number' : course.css('a::text').re("[0-9]{4}"),
                'credits' : course.css('a::text').re("\([0-9]\)|\([0-9]\-[0-9]+\)"),
                'title' : course.css('a::text').re("\).*"),
                'prerequisites' : course.css('div::text').re("Requisites:.*"),
                'description' : course.css('div::text').re('[A-Za-z].*')
            }
