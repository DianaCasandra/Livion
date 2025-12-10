/**
 * AnimatedBackground - Animated floating blobs for visual interest
 * Replicates the mobile app's organic, breathing background effect
 */

import { useEffect, useRef } from 'react';
import { COLORS } from '../constants/colors';

interface BlobConfig {
  color: string;
  size: number;
  initialX: number;
  initialY: number;
  opacity: number;
  translateXRange: [number, number];
  translateYRange: [number, number];
}

const defaultBlobs: BlobConfig[] = [
  {
    color: COLORS.teal,
    size: 700,
    initialX: 80,
    initialY: 10,
    opacity: 0.35,
    translateXRange: [-60, 60],
    translateYRange: [-40, 40],
  },
  {
    color: COLORS.amber,
    size: 750,
    initialX: 5,
    initialY: 75,
    opacity: 0.30,
    translateXRange: [50, -50],
    translateYRange: [60, -60],
  },
  {
    color: COLORS.purple,
    size: 550,
    initialX: 85,
    initialY: 90,
    opacity: 0.25,
    translateXRange: [-40, 40],
    translateYRange: [-50, 50],
  },
];

export function AnimatedBackground() {
  const blobRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const animations: number[] = [];

    defaultBlobs.forEach((config, index) => {
      const blob = blobRefs.current[index];
      if (!blob) return;

      let startTime: number | null = null;
      const duration = 8000 + index * 2000;
      const delay = index * 1500;

      const animate = (timestamp: number) => {
        if (startTime === null) startTime = timestamp;
        const elapsed = timestamp - startTime - delay;

        if (elapsed >= 0) {
          const progress = (elapsed % duration) / duration;

          // Smooth sine wave for organic movement
          const easedProgress = Math.sin(progress * Math.PI * 2);
          const easedProgressY = Math.cos(progress * Math.PI * 2);

          // Calculate translation based on range
          const translateX = easedProgress * ((config.translateXRange[1] - config.translateXRange[0]) / 2);
          const translateY = easedProgressY * ((config.translateYRange[1] - config.translateYRange[0]) / 2);

          // Subtle scale breathing effect
          const scale = 1 + easedProgress * 0.08;

          blob.style.transform = `translate(-50%, -50%) translate(${translateX}px, ${translateY}px) scale(${scale})`;
        }

        animations[index] = requestAnimationFrame(animate);
      };

      animations[index] = requestAnimationFrame(animate);
    });

    return () => {
      animations.forEach((id) => cancelAnimationFrame(id));
    };
  }, []);

  return (
    <div style={styles.container}>
      {defaultBlobs.map((blob, index) => (
        <div
          key={index}
          ref={(el) => { blobRefs.current[index] = el; }}
          style={{
            ...styles.blob,
            width: blob.size,
            height: blob.size,
            backgroundColor: blob.color,
            opacity: blob.opacity,
            left: `${blob.initialX}%`,
            top: `${blob.initialY}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    pointerEvents: 'none',
    zIndex: 0,
  },
  blob: {
    position: 'absolute',
    borderRadius: '50%',
    filter: 'blur(100px)',
    willChange: 'transform',
  },
};
