import { TABS, type Tab } from "@/app/data/Tabs";
import { useState } from "react";

export function useSectionHandle() {
    const [activeSection, setActiveSection] = useState<Tab>("Home");

    const handeIsActiveSection = (tab: Tab) => {
        setActiveSection(tab);
    }

    return {
        activeSection,
        setActiveSection,
        handeIsActiveSection,
    }

}