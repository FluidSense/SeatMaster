from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy .orm import sessionmaker

engine = create_engine("postgresql://bachelor_usr:07idistudadm@localhost:5432/bachelor")

Session = sessionmaker(bind=engine)

Base = declarative_base()
