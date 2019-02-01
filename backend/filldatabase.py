from models import ApplicationSeason, Showcase, User, Application
from database import Session, engine, Base
from datetime import datetime, timedelta

Base.metadata.create_all(engine)

session = Session()

some_showcase = Showcase("Yes")
the_annoying_user = User("usrnam")
session.add(the_annoying_user)
session.commit()
test_user = session.query(User).filter_by(username="usrnam").first()
print("got test user:", test_user)
a_test_application = Application("Submitted", "Lorem Ipsum", test_user)
session.add(a_test_application)

starttime = datetime.now() + timedelta(days=+5)
endtime = starttime + timedelta(days=+150)
acceptstart = starttime
acceptend = starttime + timedelta(days=+7)

some_showcase = Showcase("Yes")
some_applicationseason = ApplicationSeason(starttime, endtime, acceptstart, acceptend)


session.add(some_showcase)
session.add(some_applicationseason)
session.commit()
print("All applications users: ", [u.user for u in session.query(Application).all()])
session.close()
