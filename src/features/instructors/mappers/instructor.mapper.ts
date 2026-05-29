import type { Instructor } from "../entities/instructor.entity";
import type { InstructorResponse } from "../types/get-instructors-response.interface";

export class InstructorMapper {
    static fromResponseToEntity(response: InstructorResponse): Instructor {
        return {
            id: response.id,
            name: response.name,
            lastName: response.lastName,
            email: response.email,
            photo: response.photo,
            specialty: response.specialty,
            isActive: response.isActive,
            createdAt: new Date(response.createdAt),
        };
    }
}
