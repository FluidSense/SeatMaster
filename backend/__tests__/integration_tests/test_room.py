from __tests__.conftest import Postgresql
from main import create_app
from shared import db


class TestRoom():
    def setUp(self):
        self.postgres = Postgresql()
        self.app = create_app(db_url=self.postgres.url())
        self.app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
        db.init_app(self.app)
        self.ctx = self.app.app_context()
        self.ctx.push()

    # TODO
    def add_test_here(self):
        pass

    def tearDown(self):
        self.postgres.stop()
        self.ctx.pop()
