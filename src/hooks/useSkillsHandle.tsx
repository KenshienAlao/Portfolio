import { useState } from "react";
import { type Skills } from "@/app/data/Skills";

export function useSkills() {
    const [isActive, setIsActive] = useState<Skills>("Frontend");

    const handleIsActive = (skill: Skills) => {
        setIsActive(skill);
    };

    return {
        isActive,
        handleIsActive,
    };
}   