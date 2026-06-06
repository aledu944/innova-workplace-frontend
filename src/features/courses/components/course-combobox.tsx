import { useState } from "react";
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@/shared/components/ui/combobox";
import { Label } from "@/shared/components/ui/label";
import { useCourseCombobox } from "../hooks/use-course-combobox";
import type { Course } from "../entities/course.entity";


interface Props {
    onValueChange: (course: Course) => void;
}

export const CourseCombobox = ({ onValueChange }: Props) => {
    const [searchInput, setSearchInput] = useState('');

    const { courses } = useCourseCombobox(searchInput);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
    };


    const handleSelect = (course: Course) => {
        onValueChange(course);
        setSearchInput(course.title);
    }


    return (
        <>
            <Label htmlFor="student-combobox">Selecciona un estudiante</Label>
            <Combobox
                items={courses}
                onValueChange={(course) => handleSelect(course as Course)}
            >
                <ComboboxInput value={searchInput} onChange={handleInputChange} placeholder="Select a student" />
                <ComboboxContent
                    style={{
                        pointerEvents: 'auto',
                    }}
                >
                    <ComboboxEmpty>No items found.</ComboboxEmpty>
                    <ComboboxList>
                        {(course: Course) => (
                            <ComboboxItem
                                key={course.id} 
                                value={course}>
                                {course.title}
                            </ComboboxItem>
                        )}
                    </ComboboxList>
                </ComboboxContent>
            </Combobox>
        </>
    );
};