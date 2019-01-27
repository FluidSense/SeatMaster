from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy .orm import sessionmaker

engine = create_engine("postgresql://testusr:password@postgres:5432/testdb")

Session = sessionmaker(bind=engine)

Base = declarative_base()
