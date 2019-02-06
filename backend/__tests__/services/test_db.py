import testing.postgresql
from sqlalchemy import create_engine

with testing.postgresql.Postgresql() as db:
  engine = create_engine(db.url())
