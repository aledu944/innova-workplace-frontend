import { createServerFn } from "@tanstack/react-start";

import apiClient from "@/shared/lib/api-client";
import { handleServerFunctionError } from "@/shared/helpers";

export const downloadCertificate = createServerFn({ method: 'POST' })
    .inputValidator((certificateId: string) => certificateId)
    .handler(
        async ({ data: certificateId }) => {
            try {
                const { data } = await apiClient.get<ArrayBuffer>(
                    `/certificates/generate/${certificateId}`,
                    { responseType: 'arraybuffer' },
                );

                return {
                    data: Buffer.from(data).toString('base64'),
                    error: null,
                };

            } catch (error) {
                return handleServerFunctionError(error);
            }
        }
    );
