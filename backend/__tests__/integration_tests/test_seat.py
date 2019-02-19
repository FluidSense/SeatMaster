from unittest import TestCase
from __tests__.conftest import Postgresql
from main import create_app
from shared import db

# Class-based test to keep test db alive during all tests,
# else testing.postgresql takes it down.


class TestSeat(TestCase):
    def setUp(self):
        self.postgres = Postgresql()
        self.app = create_app(db_url=self.postgres.url())
        self.app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
        db.init_app(self.app)
        self.ctx = self.app.app_context()
        self.ctx.push()

    def tearDown(self):
        self.postgres.stop()
        self.ctx.pop()
