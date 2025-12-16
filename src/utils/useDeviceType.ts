import { useEffect, useState } from "react";

/**
 * React hook to detect device type using viewport width.
 *
 * @returns { isMobile, isTablet, isDesktop }
 */
export const useDeviceType = () => {
    const [device, setDevice] = useState({
        isMobile: false,
        isTablet: false,
        isDesktop: true,
    });

    useEffect(() => {
        const updateDevice = () => {
            const width = window.innerWidth;
            setDevice({
                isMobile: width < 768,
                isTablet: width >= 768 && width < 1024,
                isDesktop: width >= 1024,
            });
        };

        updateDevice();
        window.addEventListener("resize", updateDevice);
        return () => window.removeEventListener("resize", updateDevice);
    }, []);

    return device;
};
