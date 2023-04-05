import { confetti } from "https://cdn.jsdelivr.net/npm/tsparticles-confetti/+esm";


/**
 * The function generates a confetti animation with default settings.
 * 
 * Returns:
 *   Nothing.
 */
export function confettiAnimation() {
    const defaultParticleCount = 100; // Numbers of particles
    const defaultAngle = 360; // Angle in degrees
    const defaultY = 0.25; // 1/4 Of the screen

    confetti({
        particleCount: defaultParticleCount,
        spread: defaultAngle,
        origin: { y: defaultY },
    });

    return;
}

/**
 * It's shaking the screen for 'quakeTime' seconds
 * 
 * Args:
 *   element: The element that you want to shake.
 *   seconds: The number of seconds to shake the screen.
 * 
 * Returns:
 *   Nothing.
 */
export function animateElementCSS(animation, element, seconds) {
    /* It's removing the class 'quake' from the element. */
    element.classList.remove(animation);

    /* It's shaking the screen for 'quakeTime' seconds. */
    element.classList.add(animation);
    setTimeout(() => {
        element.classList.remove(animation);
    }, seconds * 1000);
    return;
}
