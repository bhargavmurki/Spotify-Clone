import { useEffect, useState } from "react";
import { set } from "react-hook-form";

function useDeounce<T>(value: T, delay: number): T {
    const [debouncedValue, serDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            serDebouncedValue(value);
        }, delay || 500);

        return () => {
            clearTimeout(timer);
        }
    }, [value, delay]);

    return debouncedValue;
}

export default useDeounce;