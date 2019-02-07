from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy .orm import sessionmaker
from main import app

engine = create_engine(app.config["SQLALCHEMY_DATABASE_URI"])

Session = sessionmaker(bind=engine)

Base = declarative_base()
