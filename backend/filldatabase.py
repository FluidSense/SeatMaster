from models import showcase
from database import Session, engine, Base

Base.metadata.create_all(engine)

session = Session()

some_showcase = showcase.Showcase("Yes")

session.add(some_showcase)
session.commit()
session.close()
