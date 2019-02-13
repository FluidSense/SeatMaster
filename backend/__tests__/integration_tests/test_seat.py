from unittest import TestCase
from __tests__.conftest import Postgresql
from main import create_app
from shared import db
from flask import jsonify
from services import seatService
from models.room import Room

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

    def test_relations(self):
        room = Room("alke", "info")
        db.session.add(room)
        db.session.commit()
        response = seatService.createSeat("D1", room.id, "info")
        print(room.seats, "seats")
        #print(seatService.getSeatById(room.id, res))
        #assert response.status == "200 OK"
        #assert response.data == b'{}'
        print(response)
    
    
    def tearDown(self):
        self.postgres.stop()
        self.ctx.pop()