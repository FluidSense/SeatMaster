from enum import Enum


class Rank(Enum):
    WRITING_MASTER = 1
    PROJECT_ASSIGNMENT = 2
    MASTER_STUDENT = 3
    BACHELOR_STUDENT = 4
    OTHER = 5


class ApplicationStatus(Enum):
    SUBMITTED = 1
    APPROVED = 2
    DECLINED = 3
    WAITING_LIST = 4
