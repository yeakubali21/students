
from pydantic import BaseModel, ConfigDict


class StudentCreateRequest(BaseModel):
    first_name: str
    last_name: str
    roll: str
    session: int
    department: str


class StudentUpdateRequest(BaseModel):
    first_name: str
    last_name: str
    roll: str
    session: int
    department: str


class StudentResponse(BaseModel):
    id: int
    first_name: str
    last_name: str
    roll: str
    session: int
    department: str

    model_config = ConfigDict(from_attributes=True)