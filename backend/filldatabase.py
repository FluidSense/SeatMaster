from models.application import Application
from models.applicationSeason import ApplicationSeason
from models.user import User
from models.room import Room
from services import applicationService
from datetime import datetime, timedelta
from shared import db
from main import app
from utils.enums import Rank

with app.app_context():
    starttime = datetime.now() + timedelta(days=+5)
    endtime = starttime + timedelta(days=+150)
    acceptstart = starttime
    acceptend = starttime + timedelta(days=+7)

    some_applicationseason = ApplicationSeason(starttime, endtime, acceptstart, acceptend)
    db.session.add(some_applicationseason)
    db.session.commit()
    the_annoying_user = User("usrnam", "sub1", "email@epost.no", "lening glenin")
    the_annoyinger_user = User("putnam", "sub2", "email@epost.no", "putnin mutnin")
    db.session.add(the_annoying_user)
    db.session.add(the_annoyinger_user)
    db.session.commit()
    test_user = db.session.query(User).filter_by(username="usrnam").first()

    db.session.add(some_applicationseason)
    db.session.commit()
    the_annoying_user = User("usrnam", "sub1", "email@epost.no", "lening glenin")
    the_annoyinger_user = User("putnam", "sub2", "email@epost.no", "putnin mutnin")
    db.session.add(the_annoying_user)
    db.session.add(the_annoyinger_user)
    db.session.commit()
    test_user = db.session.query(User).filter_by(username="usrnam").first()

    application1 = applicationService.registerApplication(
        user=the_annoying_user,
        partnerUsername=the_annoyinger_user.username,
        comments='comments',
        needs='needs',
        preferredRoom="no",
        seatRollover=False,
        rank=Rank.OTHER,
    )
    application2 = applicationService.registerApplication(
        user=the_annoyinger_user,
        partnerUsername=the_annoying_user.username,
        comments='comments',
        needs='needs',
        preferredRoom="someroom",
        seatRollover=False,
        rank=Rank.OTHER,
    )

    room1 = Room("Space Commaner", "Is very big and nice, though the screen doesn't always work")
    room2 = Room("Shit room", "Its pretty shit")
    db.session.add(room1)
    db.session.add(room2)
    db.session.commit()
    print("All applications users: ", [u.user for u in db.session.query(Application).all()])
    db.session.close()
