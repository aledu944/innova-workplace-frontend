import { isAxiosError } from "axios";



export const handleServerFunctionError = (error: unknown) => {
    if( isAxiosError(error) ) {
        if (error.response?.data.message ) {
            return {
                data: null,
                error: error.response.data.message,
            };
        } else {
            return {
                data: null,
                error: "Error en la solicitud al servidor",
            };
        }
    }

    return {
        data: null,
        error: "Error desconocido",
    };
}