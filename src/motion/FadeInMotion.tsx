import { motion, MotionProps, useReducedMotion, Variants } from 'motion/react';
import * as React from 'react';

export const fadeInVariant: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const reducedFadeInVariant: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

type FadeInMotionProps = React.ComponentPropsWithoutRef<'div'> & MotionProps;

export default function FadeInMotion({ children, ...rest }: FadeInMotionProps) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      variants={prefersReduced ? reducedFadeInVariant : fadeInVariant}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
