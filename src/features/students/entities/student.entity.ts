export interface Student {
    id:             string;
    name:           string;
    lastName:       string;
    email:          string;
    nationality:    string;
    phone:          string | null;
    
    createdAt:      Date;
    updatedAt:      Date;
}