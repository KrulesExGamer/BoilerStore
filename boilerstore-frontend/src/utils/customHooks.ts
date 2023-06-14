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

// Returns the URL parameters of the current page
export const useSearchParams = () : URLSearchParams => {
    const location = useLocation();
    let [args, setArgs] = useState <URLSearchParams> (new URLSearchParams(location.search));

    useEffect(() => {
        setArgs(new URLSearchParams(location.search));
    }, [location]);

    return args;
};