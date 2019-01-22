from sqlalchemy import Column, Integer, String

from database import Base

class Showcase(Base):
    __tablename__ = 'showcase_table'

    id = Column('student_id', Integer, primary_key = True)
    name = Column(String(100))

    def __init__(self, name):
        self.name = name
