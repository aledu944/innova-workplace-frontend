import { StudentCombobox } from "@/features/students/components/student-combobox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog";
import { useEnrollment } from "../hooks/use-enrollment";
import { Button } from "@/shared/components/ui/button";
import { CourseCombobox } from "@/features/courses/components/course-combobox";


export const CreateEnrollmentDialog = () => {

    const { createForm, handleCreate } = useEnrollment();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    Crear Inscripción
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Crear Inscripción
                    </DialogTitle>
                    <form onSubmit={handleCreate} className="space-y-4">
                        <StudentCombobox onValueChange={(student) => createForm.setValues({ studentId: student.id })}/>
                        <CourseCombobox onValueChange={(course) => createForm.setValues({ courseId: course.id })}/>
                        <Button>
                            Crear Inscripción
                        </Button>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
