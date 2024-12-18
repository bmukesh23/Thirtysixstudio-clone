import { useEffect, useRef, useState } from "react";
import canvasImages from "./canvasImages";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Canvas = ({ details }) => {
    const { startIndex, numImages, duration, size, top, left, zIndex } = details;
    const [index, setIndex] = useState({ value: startIndex });
    const canvasRef = useRef(null);

    const clampValue = (value, min, max) => Math.min(Math.max(value, min), max);

    const getResponsiveDetails = (size, top, left) => {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        const desktopScalingFactor = 1.2; // Adjust this factor for larger sizes on desktop

        if (viewportWidth > 1024) {
            return {
                size: size * desktopScalingFactor, // Scale up the size
                top,
                left,
            };
        }

        // Adjust sizes and positions for smaller viewports
        const maxSize = Math.min(viewportWidth, viewportHeight) * 0.4; // Limit size to 40% of the smaller dimension
        const clampedSize = Math.min(size, maxSize);

        const clampedTop = clampValue(top, 0, 100 - (clampedSize / viewportHeight) * 100); // Keep within height
        const clampedLeft = clampValue(left, 0, 100 - (clampedSize / viewportWidth) * 100); // Keep within width

        return { size: clampedSize, top: clampedTop, left: clampedLeft };
    };

    const { size: responsiveSize, top: responsiveTop, left: responsiveLeft } = getResponsiveDetails(size, top, left);

    useGSAP(() => {
        gsap.to(index, {
            value: startIndex + numImages - 1,
            duration: duration,
            ease: "linear",
            repeat: -1,
            onUpdate: () => {
                setIndex({ value: Math.round(index.value) });
            },
        });

        gsap.from(canvasRef.current, {
            opacity: 0,
            duration: 1,
            ease: "power2.inOut",
        });
    });

    useEffect(() => {
        const scale = window.devicePixelRatio;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.src = canvasImages[index.value];
        img.onload = () => {
            canvas.width = canvas.offsetWidth * scale;
            canvas.height = canvas.offsetHeight * scale;
            canvas.style.width = canvas.offsetWidth + "px";
            canvas.style.height = canvas.offsetHeight + "px";
            ctx.scale(scale, scale);
            ctx.drawImage(img, 0, 0, canvas.offsetWidth, canvas.offsetHeight);
        };
    }, [index]);

    return (
        <canvas
            data-scroll
            data-scroll-speed={Math.random().toFixed(1)}
            ref={canvasRef}
            className="absolute"
            style={{
                width: `${responsiveSize}px`,
                height: `${responsiveSize}px`,
                top: `${responsiveTop}%`,
                left: `${responsiveLeft}%`,
                zIndex: `${zIndex}`,
            }}
        ></canvas>
    );
};

export default Canvas;