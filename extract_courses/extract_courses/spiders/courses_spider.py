import scrapy


class CoursesSpider(scrapy.Spider):
    name = "courses"
    start_urls = [
        'http://www.colorado.edu/catalog/2016-17/courses?subject=CSCI',
        'http://www.colorado.edu/catalog/2016-17/courses?page=1&subject=CSCI',
        'http://www.colorado.edu/catalog/2016-17/courses?page=2&subject=CSCI',
        'http://www.colorado.edu/catalog/2016-17/courses?page=3&subject=CSCI',
        'http://www.colorado.edu/catalog/2016-17/courses?page=4&subject=CSCI'
    ]

    def parse(self, response):
        for course in response.xpath('//h2[@class="node-title"]/a/text()'):
            yield {
                'department' : course.re("^[A-Z]{4}"),
                'course_number' : course.re("[0-9]{4}"),
                'credits' : course.re("\([0-9]\)"),
                'title' : course.re("\).*"),
            }
        for descriptions in response.xpath('//div[@class="field-items"]/div/text()'):
            yield {
                'prerequisites' : descriptions.re("Requisites:.*"),
                'description' : descriptions.re(".*Requisites")
            }
