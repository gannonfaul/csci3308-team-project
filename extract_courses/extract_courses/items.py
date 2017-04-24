# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html

import scrapy
from scrapy.item import Item, Field

class ExtractCoursesItem(Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    department = Field()
    number = Field()
    credits = Field()
    name = Field()
    prerequisites = Field()
    description = Field()
    pass
