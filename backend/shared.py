from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv

load_dotenv(verbose=True)
db = SQLAlchemy()
