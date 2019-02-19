from models.application import Application
from models.applicationSeason import ApplicationSeason
from models.user import User
from models.room import Room
from services import applicationService
from datetime import datetime, timedelta
from shared import db
from main import app

with app.app_context():
    the_annoying_user = User("usrnam")
    the_annoyinger_user = User("putnam")
    db.session.add(the_annoying_user)
    db.session.add(the_annoyinger_user)
    db.session.commit()
    test_user = db.session.query(User).filter_by(username="usrnam").first()

    starttime = datetime.now() + timedelta(days=+5)
    endtime = starttime + timedelta(days=+150)
    acceptstart = starttime
    acceptend = starttime + timedelta(days=+7)

    some_applicationseason = ApplicationSeason(starttime, endtime, acceptstart, acceptend)

    application1 = applicationService.registerApplication(
        "sadsda", the_annoying_user.username, the_annoyinger_user.username)
    application2 = applicationService.registerApplication(
        "sadsda", the_annoyinger_user.username, the_annoying_user.username)

    db.session.add(some_applicationseason)
    db.session.commit()

    room1 = Room("Space Commaner", "Is very big and nice, though the screen doesn't always work")
    room2 = Room("Shit room", "Its pretty shit")
    db.session.add(room1)
    db.session.add(room2)
    db.session.commit()
    print("All applications users: ", [u.user for u in db.session.query(Application).all()])
    db.session.close()
