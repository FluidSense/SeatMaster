from models import showcase
<<<<<<< HEAD

=======
>>>>>>> 70a0072e82b5c12cfaa730043fdbfd191aa9b61a
from database import Session, engine, Base

Base.metadata.create_all(engine)

session = Session()

some_showcase = showcase.Showcase("Yes")

session.add(some_showcase)
session.commit()
session.close()
