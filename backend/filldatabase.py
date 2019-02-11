from models import ApplicationSeason, User, Application
from services import applicationService
from database import Session, engine, Base
from datetime import datetime, timedelta

Base.metadata.create_all(engine)

session = Session()

the_annoying_user = User("usrnam")
the_annoyinger_user = User("putnam")
session.add(the_annoying_user)
session.add(the_annoyinger_user)
session.commit()
test_user = session.query(User).filter_by(username="usrnam").first()

starttime = datetime.now() + timedelta(days=+5)
endtime = starttime + timedelta(days=+150)
acceptstart = starttime
acceptend = starttime + timedelta(days=+7)

some_applicationseason = ApplicationSeason(starttime, endtime, acceptstart, acceptend)

application1 = applicationService.registerApplication(
    "status", "sadsda", the_annoying_user.username, the_annoyinger_user.username)
application2 = applicationService.registerApplication(
    "status", "sadsda", the_annoyinger_user.username, the_annoying_user.username)

session.add(some_applicationseason)
session.commit()
print("All applications users: ", [u.user for u in session.query(Application).all()])
session.close()
