from sqlalchemy.orm import Session
from student_model import Student


class StudentRepository:

    def create_student(self, db:Session, student: Student):
        db.add(student)
        db.commit()
        db.refresh(student)
        return student

    def get_student_by_roll(self, db: Session, roll: str):
        return db.query(Student).filter(Student.roll == roll).first()

    def update_student(self, db: Session, student: Student):
        db.merge(student)
        db.commit()
        db.refresh(student)
        return student

    def get_all(self, db: Session):
        return db.query(Student).all()

    def delete_student(self, db: Session, roll: str):
        student = db.query(Student).filter(Student.roll == roll).first()
        if student:
            db.delete(student)
            db.commit()
