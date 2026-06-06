import { useState } from "react";
import type { Student } from "../entities/student.entity";
import { useStudentCombobox } from "../hooks/use-student-combobox";
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@/shared/components/ui/combobox";
import { Label } from "@/shared/components/ui/label";


interface Props {
    onValueChange: (student: Student) => void;
}

export const StudentCombobox = ({ onValueChange }: Props) => {
    const [searchInput, setSearchInput] = useState('');

    const { students } = useStudentCombobox(searchInput);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
    };


    const handleSelect = (student: Student) => {
        onValueChange(student);
        setSearchInput(`${student.name} ${student.lastName}`);
    }


    return (
        <>
            <Label htmlFor="student-combobox">Selecciona un estudiante</Label>
            <Combobox
                onValueChange={(student) => handleSelect(student as Student)}
                items={students}
                itemToStringValue={(student: Student) => student.name}
            >
                <ComboboxInput value={searchInput} onChange={handleInputChange} placeholder="Select a student" />
                <ComboboxContent
                    style={{
                        pointerEvents: 'auto',
                    }}
                >
                    <ComboboxEmpty>No items found.</ComboboxEmpty>
                    <ComboboxList>
                        {(student: Student) => (
                            <ComboboxItem
                                key={student.id} 
                                value={student}>
                                {student.name} {student.lastName} - <span className="text-muted-foreground text-xs">{student.email}</span>
                            </ComboboxItem>
                        )}
                    </ComboboxList>
                </ComboboxContent>
            </Combobox>
        </>
    );
};