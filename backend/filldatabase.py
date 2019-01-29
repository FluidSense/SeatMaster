from models import *
from database import Session, engine, Base
from datetime import datetime, timedelta

Base.metadata.create_all(engine)

session = Session()

starttime = datetime.now() + timedelta(days=+5)
endtime = starttime + timedelta(days=+150)
acceptstart = starttime
acceptend = starttime + timedelta(days=+7)

some_showcase = Showcase("Yes")
some_applicationseason = ApplicationSeason(starttime, endtime, acceptstart, acceptend) 


session.add(some_showcase)
session.add(some_applicationseason)
session.commit()
session.close()
