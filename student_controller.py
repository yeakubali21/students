from fastapi import APIRouter, Depends, status
from database import get_db
from student_service import StudentService
from schema import StudentResponse, StudentUpdateRequest, StudentCreateRequet
from sqlalchemy.orm import Session


routers = APIRouter(prefix="/students",tags=["Student"])

@routers.get("/")
def get_all(db: Session = Depends(get_db)):
     service = StudentService()
     return service.get_all_students(db=db)

@routers.get("/{roll}", status_code= status.HTTP_200_OK)
def get_student_by_roll(roll: str, db:Session = Depends(get_db)):
    service = StudentService()
    return service.get_student_by_roll(db, roll)

@routers.post("/create", status_code= status.HTTP_201_CREATED)
def create_student(student_payload : StudentCreateRequet, db:Session = Depends(get_db)):
     service = StudentService()
     return service.create_student(db, student_payload)

@routers.patch("/update/{roll}", status_code= status.HTTP_202_ACCEPTED)
def update_student(roll: str, update_student: StudentUpdateRequest, db:Session =Depends(get_db)):
     service = StudentService()
     return service.update_student(db, update_student, roll)

@routers.delete("/{roll}")
def delete_student(roll: str, db: Session = Depends(get_db)):
     service = StudentService()
     service.delete_student(roll, db)




