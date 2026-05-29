import type { Student } from "../entities/student.entity";
import type { StudentResponse } from "../types/get-students-response.interface";


export class StudentMapper {


    static fromResponseToEntity(response: StudentResponse): Student {
        return {
            id: response.id,
            name: response.name,
            email: response.email,
            lastName: response.lastName,
            nationality: response.nationality,
            phone: response.phone,
            createdAt: response.createdAt,
            updatedAt: response.updatedAt,
        }
    }

}