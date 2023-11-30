/* eslint-disable consistent-return */
/* eslint-disable func-names */
import confetti from 'canvas-confetti';

interface IConfettiOptions {
  duration?: number;
}

/**
 * @description - fireworks animation
 * @param {number} duration - duration of the animation in milliseconds
 * @returns {void}
 */
export const fireworks = ({ duration = 6_500 }: IConfettiOptions) => {
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 160, zIndex: 0 };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const interval: NodeJS.Timeout = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    // random on the left side
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.5), y: 0 },
    });

    // random on the right side
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.6, 0.9), y: 0 },
    });
  }, 250);
};
/**
 * @description - school pride animation
 * @param duration - duration of the animation in milliseconds
 * @returns {void}
 */
export const schoolPride = ({ duration = 6_500 }: IConfettiOptions) => {
  const animationEnd = Date.now() + duration;

  // go Buckeyes!
  const colors = ['#bb0000', '#ffffff'];

  (function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors,
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors,
    });

    if (Date.now() < animationEnd) {
      requestAnimationFrame(frame);
    }
  })();
};

/**
 * @description - snow animation
 * @param duration - duration of the animation in milliseconds
 * @returns {void}
 */
export const snow = ({ duration = 6_500 }: IConfettiOptions) => {
  const animationEnd = Date.now() + duration;
  let skew = 1;

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  (function frame() {
    const timeLeft = animationEnd - Date.now();
    const ticks = Math.max(200, 500 * (timeLeft / duration));
    skew = Math.max(0.8, skew - 0.001);

    confetti({
      particleCount: 1,
      startVelocity: 0,
      ticks,
      origin: {
        x: Math.random(),
        // since particles fall down, skew start toward the top
        y: Math.random() * skew - 0.2,
      },
      colors: ['#ffffff'],
      shapes: ['circle'],
      gravity: randomInRange(0.4, 0.6),
      scalar: randomInRange(0.4, 1),
      drift: randomInRange(-0.4, 0.4),
    });

    if (timeLeft > 0) {
      requestAnimationFrame(frame);
    }
  })();
};
