import { motion } from 'framer-motion';
import type { ComponentType } from 'react';

// Compatibility shim: framer-motion 8.5.2 generic typings break under
// React 19's stricter JSX inference. We cast to permissive components so
// className/onClick/ref/style flow through unimpeded.
type Any = ComponentType<any>;

export const MDiv: Any = motion.div as Any;
export const MSpan: Any = motion.span as Any;
export const MP: Any = motion.p as Any;
export const MButton: Any = motion.button as Any;
export const MA: Any = motion.a as Any;
export const MLine: Any = motion.line as Any;
export const MCircle: Any = motion.circle as Any;
export const MPath: Any = motion.path as Any;
export const MSvg: Any = motion.svg as Any;
