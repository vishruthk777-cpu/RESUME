import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  tags: string[];
  details: string[];
  status?: string;
}

interface ProjectModalProps {
  project: Project | null;
  open: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, open, onClose }: ProjectModalProps) {
  return (
    <AnimatePresence>
      {open && project ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-6 backdrop-blur-xl"
        >
          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 250, damping: 28 }}
            className="w-full max-w-3xl rounded-[2rem] border border-white/10 bg-slate-950/95 p-8 shadow-soft backdrop-blur-2xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-cyan-200/80">Project details</p>
                <h2 className="mt-3 text-3xl font-semibold text-slate-100">{project.title}</h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-white/10 bg-white/5 p-3 text-slate-200 transition hover:bg-white/10"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="mt-6 text-slate-300">{project.description}</p>
            <div className="mt-6 grid gap-3 text-slate-200">
              {project.details.map((detail) => (
                <div key={detail} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center gap-3 text-sm text-cyan-200">
                    <ArrowRight className="h-4 w-4" />
                    <span>{detail}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-slate-300">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
