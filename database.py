from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


# DATABASE_URL ="mysql+pymysql://root:root@localhost:3306/training_db"
DATABASE_URL = "postgresql+psycopg2://student_database_0gl4_user:Nn561D2CevLttIN1YCzqtOY3ETcU0nUS@dpg-dbdeqqpsrm7s73bgkslg-a.oregon-postgres.render.com/student_database_0gl4"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()