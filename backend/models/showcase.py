from shared import db

class Showcase(db.Model):
    __tablename__ = 'showcase_table'
    id = db.Column('student_id', db.Integer, primary_key = True)
    name = db.Column(db.String(100))

    def __init__(self, name):
        self.name = name
