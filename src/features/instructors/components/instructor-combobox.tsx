"use client";

import { useMemo, useState } from "react";

import { useInstructorCombobox } from "../hooks/use-instructor-combobox";

import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxGroup,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "@/shared/components/ui/combobox";

interface Props {
    value?: string;
    onValueChange: (value: string) => void;
    selectedLabel?: string;
}

export const InstructorCombobox = ({ value, onValueChange, selectedLabel }: Props) => {
    const [open, setOpen] = useState(false);
    const [searchInput, setSearchInput] = useState("");

    const { instructors, isLoading } = useInstructorCombobox(searchInput);

    const instructorLabels = useMemo(
        () =>
            new Map(
                instructors.map((instructor) => [
                    instructor.id,
                    `${instructor.name} ${instructor.lastName}`,
                ])
            ),
        [instructors]
    );

    const getSelectedInstructor = () => {
        if (!value) return "";
        return instructorLabels.get(value) ?? selectedLabel ?? "";
    };

    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Instructor</label>
            <Combobox
                open={open}
                onOpenChange={(nextOpen) => {
                    setOpen(nextOpen);
                    if (nextOpen) {
                        setSearchInput("");
                    }
                }}
                value={value || null}
                onValueChange={(instructorId) => {
                    if (!instructorId) {
                        onValueChange("");
                        setSearchInput("");
                        return;
                    }

                    onValueChange(instructorId);
                    setSearchInput("");
                    setOpen(false);
                }}
                inputValue={open ? searchInput : getSelectedInstructor()}
                onInputValueChange={setSearchInput}
                itemToStringLabel={(instructorId) => instructorLabels.get(instructorId) ?? selectedLabel ?? ""}
                filter={null}
                modal={false}
            >
                <ComboboxInput
                    className="w-full"
                    placeholder="Buscar instructor..."
                    showClear
                />
                <ComboboxContent className="z-[60]">
                    {isLoading ? (
                        <div className="p-4 text-center text-sm text-muted-foreground">
                            Cargando...
                        </div>
                    ) : (
                        <>
                            <ComboboxEmpty>No encontrado.</ComboboxEmpty>
                            <ComboboxList>
                                <ComboboxGroup>
                                    {instructors.map((instructor) => (
                                        <ComboboxItem key={instructor.id} value={instructor.id}>
                                            <span className="flex flex-col pr-6">
                                                <span>
                                                    {instructor.name} {instructor.lastName}
                                                </span>
                                                <span className="text-xs text-muted-foreground">
                                                    {instructor.email}
                                                </span>
                                            </span>
                                        </ComboboxItem>
                                    ))}
                                </ComboboxGroup>
                            </ComboboxList>
                        </>
                    )}
                </ComboboxContent>
            </Combobox>
        </div>
    );
};
