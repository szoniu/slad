from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "sqlite:///data.db"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


class ExampleTable(Base):
    __tablename__ = 'example_table'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    value = Column(String, index=True)


Base.metadata.create_all(bind=engine)
