export const COURSE_MODALITIES = ["LIVE_ONLINE", "PRESENTIAL", "PRERECORDED"] as const;
export const COURSE_LEVELS = ["BEGINNER", "INTERMEDIATE", "ADVANCED"] as const;
export const COURSE_TYPES = ["COURSE", "WORKSHOP", "WEBINAR", "BOOTCAMP", "DIPLOMA"] as const;

export const COURSE_MODALITY_LABELS: Record<(typeof COURSE_MODALITIES)[number], string> = {
    LIVE_ONLINE: "Online En Vivo",
    PRESENTIAL: "Presencial",
    PRERECORDED: "Pregrabado",
};

export const COURSE_LEVEL_LABELS: Record<(typeof COURSE_LEVELS)[number], string> = {
    BEGINNER: "Principiante",
    INTERMEDIATE: "Intermedio",
    ADVANCED: "Avanzado",
};

export const COURSE_TYPE_LABELS: Record<(typeof COURSE_TYPES)[number], string> = {
    COURSE: "Curso",
    WORKSHOP: "Workshop",
    WEBINAR: "Webinar",
    BOOTCAMP: "Bootcamp",
    DIPLOMA: "Diplomado",
};
