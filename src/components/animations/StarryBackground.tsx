"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Star {
    id: number;
    top: number;
    left: number;
    size: number;
    duration: number;
    delay: number;
}

export function StarryBackground() {
    const [stars, setStars] = useState<Star[]>([]);
    const [shootingStars, setShootingStars] = useState<number[]>([]);

    useEffect(() => {
        // Generate static twinkling stars
        const starCount = 75;
        const newStars = Array.from({ length: starCount }).map((_, i) => ({
            id: i,
            top: Math.random() * 100,
            left: Math.random() * 100,
            size: Math.random() > 0.8 ? 2 : 1.5, // Some slightly larger stars
            duration: Math.random() * 3 + 2,
            delay: Math.random() * 5,
        }));
        setStars(newStars);

        // Shooting star effect
        const interval = setInterval(() => {
            setShootingStars(prev => [...prev, Date.now()]);
            // Cleanup old shooting stars
            setTimeout(() => {
                setShootingStars(prev => prev.slice(1));
            }, 2000);
        }, 4000); // New shooting star every 4 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 z-[-1] min-h-screen w-full overflow-hidden bg-background pointer-events-none">
            {/* Deep Space Gradients */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/20 via-background to-background" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-900/10 via-background to-background" />

            {/* Twinkling Stars */}
            {stars.map((star) => (
                <motion.div
                    key={star.id}
                    className="absolute rounded-full bg-white/80"
                    style={{
                        top: `${star.top}%`,
                        left: `${star.left}%`,
                        width: star.size,
                        height: star.size,
                    }}
                    animate={{
                        opacity: [0.2, 0.8, 0.2],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: star.duration,
                        repeat: Infinity,
                        delay: star.delay,
                        ease: "easeInOut",
                    }}
                />
            ))}

            {/* Shooting Stars */}
            {shootingStars.map((id) => (
                <ShootingStar key={id} />
            ))}
        </div>
    );
}

function ShootingStar() {
    const startY = Math.random() * 40; // Start from top 40%
    const startX = Math.random() * 50 + 50; // Start from right side usually

    return (
        <motion.div
            initial={{ top: `${startY}%`, left: `${startX}%`, opacity: 1, scale: 0 }}
            animate={{
                top: `${startY + 20}%`,
                left: `${startX - 20}%`,
                opacity: 0,
                scale: 1
            }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute h-[2px] w-[100px] origin-right bg-gradient-to-l from-white to-transparent rotate-[-45deg]"
        />
    );
}
