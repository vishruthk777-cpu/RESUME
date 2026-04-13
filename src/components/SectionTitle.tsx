import { motion } from 'framer-motion';

interface SectionTitleProps {
  label: string;
  title: string;
}

export function SectionTitle({ label, title }: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="mb-10 max-w-xl"
    >
      <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-300/70">{label}</p>
      <h2 className="text-3xl font-semibold text-slate-100 sm:text-4xl">{title}</h2>
    </motion.div>
  );
}
