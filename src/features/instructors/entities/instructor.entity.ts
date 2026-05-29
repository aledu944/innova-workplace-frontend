export interface Instructor {
    id: string;
    name: string;
    lastName: string;
    email: string;
    photo: string | null;
    specialty: string;
    isActive: boolean;
    createdAt: Date;
}
