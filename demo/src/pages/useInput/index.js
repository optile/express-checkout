import { useState } from "react";
import debounce from "lodash/debounce";

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
            placeholder: "Enter the client ID",
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
            min: 1,
            placeholder: "Enter the price",
            value,
            onChange: (event) => setValue(event.target.value <= 0 ? 0.1 : event.target.value),
        },
    };
};
