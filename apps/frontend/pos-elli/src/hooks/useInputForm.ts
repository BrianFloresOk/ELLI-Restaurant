import { useState, useCallback, type ChangeEvent } from "react";

type Values = string | number | boolean | undefined;

export function useInputForm<T extends { [K in keyof T]: Values }>(initial: T) {
    const [state, setState] = useState<T>(initial);

    const handleChange = useCallback(
        (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            const { name, value } = event.target;
            setState((prev) => ({
                ...prev,
                [name]: value,
            }));
        },
        []
    );

    const reset = useCallback((newInitial: T = initial) => {
        setState(newInitial);
    }, [initial]);

    return { state, handleChange, reset };
}
