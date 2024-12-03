import { motion, MotionProps, Variants } from 'motion/react';

export const fadeInVariant: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

type FadeInMotionProps = React.ComponentPropsWithoutRef<'div'> & MotionProps;

export default function FadeInMotion({ children, ...rest }: FadeInMotionProps) {
  return (
    <motion.div
      variants={fadeInVariant}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
