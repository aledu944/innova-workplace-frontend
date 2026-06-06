import type { PaginatedResponse } from "@/shared/types/pagination";
import type { EnrollmentResponse } from "./enrollment.interface";


export type GetEnrollmentsResponse = PaginatedResponse<EnrollmentResponse, 'enrollments'>;