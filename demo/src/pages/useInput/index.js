import { useState } from "react";

export const useStringInput = (initialValue) => {
    const [value, setValue] = useState(initialValue);
    return {
        value,
        setValue,
        reset: () => setValue(""),
        inputProps: {
            style: {
                width: "98%",
            },
            value,
            onChange: (event) => setValue(event.target.value),
        },
    };
};

export const useNumberInput = (initialValue) => {
    const [value, setValue] = useState(initialValue);
    return {
        value,
        setValue,
        reset: () => setValue(1),
        inputProps: {
            type: "number",
            step: "any",
            value,
            onChange: (event) => setValue(event.target.value),
        },
    };
};
