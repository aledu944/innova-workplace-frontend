import { z } from 'zod';

export const dataTableSearchSchema = z.object({
    page: z.coerce.number().int().positive().catch(1),
    limit: z.coerce.number().int().positive().max(100).catch(10),
    search: z.string().catch(''),
    isActive: z.enum(['true', 'false']).optional().catch(undefined),
});

export type DataTableSearch = z.infer<typeof dataTableSearchSchema>;