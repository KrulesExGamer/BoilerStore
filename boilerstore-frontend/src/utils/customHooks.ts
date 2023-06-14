import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const useWindowResize: () => { width: number, height: number } = () => {
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Call the resize handler initially

        // Cleanup the event listener on unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return dimensions;
};

export const useSearchParams = () : {[key: string]: any;} => {
    const location = useLocation();
    let [args, setArgs] = useState <{[key: string]: any;}> ({});

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        setArgs(searchParams as {[key: string]: any});
    }, [location]);

    return args;
};