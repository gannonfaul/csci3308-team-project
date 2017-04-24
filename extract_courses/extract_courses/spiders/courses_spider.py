from scrapy.spider import BaseSpider
from scrapy.selector import HtmlXPathSelector
from scrapy.contrib.loader import XPathItemLoader
from scrapy.contrib.loader.processor import Join, MapCompose
import re
from extract_courses.items import ExtractCoursesItem

class CoursesSpider(BaseSpider):
    name = "courses"
    start_urls = [
        'http://www.colorado.edu/catalog/2016-17/courses?page=0&subject=CSCI',
        'http://www.colorado.edu/catalog/2016-17/courses?page=1&subject=CSCI',
        'http://www.colorado.edu/catalog/2016-17/courses?page=2&subject=CSCI',
        'http://www.colorado.edu/catalog/2016-17/courses?page=3&subject=CSCI',
        'http://www.colorado.edu/catalog/2016-17/courses?page=4&subject=CSCI'
    ]

    courses_list_xpath = '//*[starts-with(@id, "node-course-")]'
    item_fields = {
        'department' : "[A-Z]{4}",
        'number' : "[0-9]{4}",
        'credits' : "\([0-9]\)|\([0-9]\-[0-9]+\)",
        'name' : "\).*",
        'prerequisites' : "Requisites:.*",
        'description' : '[A-Za-z].*'
    }

    def parse(self, response):
        selector = HtmlXPathSelector(response)

        # iterate over deals
        for course in selector.select(self.courses_list_xpath):
            loader = XPathItemLoader(ExtractCoursesItem(), selector=course)

            # define processors
            loader.default_input_processor = MapCompose(unicode.strip)
            loader.default_output_processor = Join()

            # iterate over fields and add xpaths to the loader
            for field, regex in self.item_fields.iteritems():
                if field == 'department' or field == 'credits' or field == 'name' or field == 'number':
                    xpath = './/div/h2/a/text()'
                else:
                    xpath = './/div/text()'
                loader.add_xpath(field, xpath, re=regex)
            yield loader.load_item()

# class CoursesSpider(scrapy.Spider):
#     name = "courses"
#     start_urls = [
#         'http://www.colorado.edu/catalog/2016-17/courses?page=0&subject=CSCI',
#         'http://www.colorado.edu/catalog/2016-17/courses?page=1&subject=CSCI',
#         'http://www.colorado.edu/catalog/2016-17/courses?page=2&subject=CSCI',
#         'http://www.colorado.edu/catalog/2016-17/courses?page=3&subject=CSCI',
#         'http://www.colorado.edu/catalog/2016-17/courses?page=4&subject=CSCI'
#     ]
#
#     def parse(self, response):
#         for course in response.xpath('//*[starts-with(@id, "node-course-")]'):
#             yield {
#                 'department' : course.css('a::text').re('[A-Z]{4}'),
#                 'number' : course.css('a::text').re("[0-9]{4}"),
#                 'credits' : course.css('a::text').re("\([0-9]\)|\([0-9]\-[0-9]+\)"),
#                 'title' : course.css('a::text').re("\).*"),
#                 'prerequisites' : course.css('div::text').re("Requisites:.*"),
#                 'description' : course.css('div::text').re('[A-Za-z].*')
#             }
