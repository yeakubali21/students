from student_repository import StudentRepository
from sqlalchemy.orm import Session
from schema import StudentUpdateRequest, StudentCreateRequet
from fastapi import HTTPException
from student_model import Student


class StudentService:
    def __init__(self):
        self.repository = StudentRepository()


    def get_student_by_roll(self, db: Session, roll: str):
        return self.repository.get_student_by_roll(db, roll)

    def update_student(self, db: Session, update_student: StudentUpdateRequest, roll: str):
        student = self.repository.get_student_by_roll(db, roll)
        if not student:
            raise HTTPException(status_code=404, detail="Item not found")
        
        student.first_name= update_student.first_name
        student.last_name = update_student.last_name
        student.department = update_student.department
        return self.repository.update_student(db, student)

    def create_student(self, db: Session, student_payload : StudentCreateRequet):
        student = Student(first_name = student_payload.first_name,
                            last_name = student_payload.last_name,
                            roll = student_payload.roll, 
                            session = student_payload.session,
                            department = student_payload.department)
        return self.repository.create_student(db,student)

    def get_all_students(self, db: Session):
        return self.repository.get_all(db=db)

    def delete_student(self, roll:str, db:Session):
        self.repository.delete_student(db, roll)


