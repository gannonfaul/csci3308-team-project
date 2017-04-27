# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html

from sqlalchemy.orm import sessionmaker
from models import Courses, db_connect, create_courses_table

class ExtractCoursesPipeline(object):
    def __init__(self):
        """
        Initialize database connection
        Creates courses table
        """
        engine = db_connect()
        create_courses_table(engine)
        self.Session = sessionmaker(bind=engine)

    def process_item(self, item, spider):
        """
        Saves Courses in the database
        This method is called for every item pipeline component
        """
        session = self.Session()
        course = Courses(**item)

        try:
            session.add(course)
            session.commit()
        except:
            session.rollback()
            raise
        finally:
            session.close()

        return item
