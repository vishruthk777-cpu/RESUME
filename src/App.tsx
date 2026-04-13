import { FormEvent, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Code2,
  Download,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageSquare,
  Moon,
  Sparkles,
  Sun
} from 'lucide-react';
import { AnimatedCursor } from './components/AnimatedCursor';
import { HeroCanvas } from './components/HeroCanvas';
import { ProjectModal } from './components/ProjectModal';
import { SectionTitle } from './components/SectionTitle';

const skills = [
  { name: 'Python', level: 90 },
  { name: 'Java', level: 84 },
  { name: 'C++', level: 82 },
  { name: 'HTML / CSS / JavaScript', level: 88 },
  { name: 'React', level: 75 },
  { name: 'Firebase', level: 72 },
  { name: 'AI / Prompt Engineering', level: 78 }
];

const projects = [
  {
    title: 'AI-Based Gym Voice Assistant',
    description: 'Voice-driven fitness assistant for gym services, pricing, and personalized plans.',
    tags: ['Voice AI', 'WhatsApp', 'Automation'],
    details: [
      'Interactive voice experience for gym membership, pricing, and trainer guidance.',
      'WhatsApp integration for booking, payments, and location sharing.',
      'Conversational AI for personalized workout and advisor flows.'
    ]
  },
  {
    title: 'Yummy Project',
    description: 'Restaurant and bakery platform with responsive ordering and service management.',
    tags: ['Responsive UI', 'Backend Ready', 'Customer Experience'],
    details: [
      'Dynamic pricing updates through polished interfaces.',
      'Food ordering flows designed for speed and clarity.',
      'Backend-ready architecture for payment and data connectivity.'
    ]
  },
  {
    title: 'Prompt Intelligence Lab',
    description: 'AI research dashboard for prompt engineering and assistant prototyping.',
    tags: ['AI Workflow', 'Research', 'Smart Assistant'],
    details: [
      'Rapid workspace for prompt experimentation and iteration.',
      'Smart assistant patterns with context-aware response flows.',
      'Future-ready design for AI-enabled tools and interfaces.'
    ]
  }
];

const achievements = [
  {
    year: '2025',
    text: '110 kg weight lifting medal and certification in college-level strength training.',
    icon: Sparkles
  },
  {
    year: '2024',
    text: 'Prize winner in college cricket tournaments and team leadership.',
    icon: Code2
  },
  {
    year: '2023',
    text: 'Athletics awards in long jump, high jump, and running events.',
    icon: Sparkles
  }
];

const hobbies = [
  { label: 'Psychology & self-growth reading', emoji: '📚' },
  { label: 'Markets, trading & investing research', emoji: '📈' },
  { label: 'Cricket and fitness', emoji: '🏏' },
  { label: 'Cars, bikes & travel', emoji: '🚗' }
];

const navItems = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Achievements', id: 'achievements' },
  { label: 'Hobbies', id: 'hobbies' },
  { label: 'Contact', id: 'contact' }
];

const socialLinks = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/vishruthk777-cpu' },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/vishruth-k-817980362?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
  },
  {
    icon: Instagram,
    label: 'Instagram',
    href: 'https://www.instagram.com/thebest.vish/?__pwa=1'
  },
  {
    icon: MessageSquare,
    label: 'WhatsApp',
    href: 'https://wa.me/919441966722'
  }
];

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [typedText, setTypedText] = useState('');
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [heroOffset, setHeroOffset] = useState(0);
  const [selectedProject, setSelectedProject] = useState<typeof projects[number] | null>(null);
  const [projectOpen, setProjectOpen] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  const phrases = useMemo(
    () => [
      'Building intelligent gym assistants, smart food apps, and AI lab systems.',
      'Creating premium web platforms with motion, depth, and responsive polish.',
      'Designing AI-first experiences for startups and future-facing products.'
    ],
    []
  );

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeout: NodeJS.Timeout;

    function type() {
      const currentPhrase = phrases[phraseIndex];
      if (!isDeleting) {
        setTypedText(currentPhrase.slice(0, charIndex + 1));
        charIndex += 1;
        if (charIndex > currentPhrase.length) {
          timeout = setTimeout(() => {
            isDeleting = true;
            type();
          }, 1600);
          return;
        }
      } else {
        setTypedText(currentPhrase.slice(0, charIndex - 1));
        charIndex -= 1;
        if (charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
        }
      }
      timeout = setTimeout(type, isDeleting ? 60 : 100);
    }

    type();
    return () => clearTimeout(timeout);
  }, [phrases]);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0);
      setHeroOffset(scrollTop * 0.22);

      const offsets = navItems.map((item) => {
        const element = document.getElementById(item.id);
        return {
          id: item.id,
          top: element ? element.offsetTop - 180 : Infinity
        };
      });

      const current = offsets.reduce((closest, entry) => {
        return scrollTop >= entry.top ? entry.id : closest;
      }, 'home');
      setActiveSection(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openProject = (project: typeof projects[number]) => {
    setSelectedProject(project);
    setProjectOpen(true);
  };

  const closeProject = () => {
    setProjectOpen(false);
    setSelectedProject(null);
  };

  const buildMailLink = () => {
    const subject = `Portfolio contact from ${contactName || 'Website Visitor'}`;
    const body = `Name: ${contactName || 'N/A'}\nEmail: ${contactEmail || 'N/A'}\n\nMessage:\n${contactMessage || 'No message provided.'}`;
    return `https://mail.google.com/mail/?view=cm&fs=1&to=vishruthk777@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const buildWhatsAppLink = () => {
    const text = `Hello Vishruth,\n\nI would like to connect with you from your portfolio site.\n\nName: ${contactName || 'N/A'}\nEmail: ${contactEmail || 'N/A'}\nMessage: ${contactMessage || 'No message provided.'}`;
    return `https://wa.me/919441966722?text=${encodeURIComponent(text)}`;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.open(buildMailLink(), '_blank', 'noopener,noreferrer');
  };

  const handleSendWhatsApp = () => {
    window.open(buildWhatsAppLink(), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-hero-gradient text-slate-900 dark:text-slate-100">
      <AnimatedCursor />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(38,198,255,0.14),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.14),_transparent_20%)]" />

      <div className="fixed inset-x-0 top-0 z-40 h-1 bg-slate-200/10 backdrop-blur-xl">
        <div className="h-full bg-cyan-300/90 transition-all" style={{ width: `${scrollProgress * 100}%` }} />
      </div>

      <header className="sticky top-0 z-30 border-b border-white/10 bg-white/80 dark:bg-slate-950/20 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 dark:bg-white/10 shadow-glass backdrop-blur-xl">
              <Sparkles className="h-5 w-5 text-cyan-200" />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Vishruth K</p>
              <p className="text-xs text-slate-400">AI Portfolio</p>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-slate-700 dark:text-slate-300 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`transition-colors duration-200 ${
                  activeSection === item.id ? 'text-cyan-200' : 'hover:text-slate-100'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-cyan-200 transition hover:border-cyan-200/40 hover:bg-cyan-300/10"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <main className="relative mx-auto max-w-7xl px-6 pb-24 pt-24 sm:px-8 lg:pt-28">
        <section id="home" className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/80 dark:bg-slate-950/45 px-6 py-16 shadow-glass backdrop-blur-2xl sm:px-10 lg:flex lg:items-center lg:gap-16 lg:px-14">
          <HeroCanvas />
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-300/10 via-transparent to-fuchsia-300/5" />
          <div
            className="absolute -left-10 top-12 h-32 w-32 rounded-full bg-cyan-400/10 blur-3xl"
            style={{ transform: `translateY(${heroOffset * 0.04}px)` }}
          />
          <div
            className="absolute -right-10 bottom-10 h-28 w-28 rounded-full bg-fuchsia-500/10 blur-3xl"
            style={{ transform: `translateY(${-heroOffset * 0.03}px)` }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative max-w-2xl"
          >
            <p className="mb-5 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm uppercase tracking-[0.32em] text-cyan-100/90 backdrop-blur-xl">
              Computer Science Undergraduate � AI Explorer
            </p>
            <h1 className="text-5xl font-semibold tracking-[-0.04em] text-slate-900 dark:text-slate-100 sm:text-6xl">
              I build AI-first web experiences, voice assistants, and responsive digital products.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              {typedText}
              <span className="text-cyan-300">|</span>
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-300"
              >
                Contact me
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm text-slate-200 transition hover:border-cyan-300/40 hover:text-cyan-200"
              >
                View work
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-12 grid place-items-center lg:mt-0 lg:w-[420px]"
          >
            <div className="group relative w-full max-w-sm rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:border-cyan-300/20">
              <div className="absolute -right-5 -top-5 flex h-14 w-14 items-center justify-center rounded-full bg-cyan-300/15 text-cyan-100 backdrop-blur-xl">
                <Sparkles className="h-6 w-6" />
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-300/20 to-fuchsia-300/20 shadow-[0_20px_70px_rgba(99,102,241,0.14)]">
                  <span className="text-3xl">👋</span>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.32em] text-cyan-200/80">Hello, I&apos;m</p>
                  <h2 className="text-2xl font-semibold text-slate-50">Vishruth K</h2>
                </div>
              </div>
              <p className="mt-5 text-sm leading-6 text-slate-300">
                Passionate about building scalable AI systems, intelligent assistants, and premium digital experiences.
              </p>
              <div className="mt-6 grid gap-3 rounded-3xl border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-300">
                <div className="flex items-center justify-between">
                  <span>Location</span>
                  <span className="text-cyan-200">Hyderabad, India</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Languages</span>
                  <span className="text-cyan-200">Telugu � English</span>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="about" className="mt-24 scroll-mt-24">
          <SectionTitle label="About" title="Ambitious and results-driven tech builder." />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]"
          >
            <div className="rounded-[2rem] border border-white/10 bg-white/80 dark:bg-slate-950/55 p-8 shadow-glass backdrop-blur-xl">
              <p className="text-lg leading-8 text-slate-600 dark:text-slate-300">
                I am a Computer Science undergraduate with strong foundations in programming, web development, and AI. I build practical solutions like intelligent gym assistants, food ordering platforms, and AI workflows that bring ideas to life.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  { label: 'Education', value: 'B.Tech CSE' },
                  { label: 'Institute', value: 'Symbiosis Institute of Technology' },
                  { label: 'CGPA', value: '7.90 (1st Sem)' },
                  { label: 'Focus', value: 'AI � Web � Prompt Engineering' }
                ].map((item) => (
                  <div key={item.label} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <p className="text-sm uppercase tracking-[0.32em] text-cyan-300/70">{item.label}</p>
                    <p className="mt-2 text-xl font-semibold text-slate-100">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="rounded-[2rem] border border-cyan-300/10 bg-cyan-300/5 p-6 shadow-soft backdrop-blur-xl">
                <p className="text-sm uppercase tracking-[0.32em] text-cyan-200/80">Profile summary</p>
                <h3 className="mt-4 text-2xl font-semibold text-slate-900 dark:text-slate-100">Driven to solve problems with polished AI-enabled products.</h3>
                <p className="mt-3 text-slate-600 dark:text-slate-300">
                  I enjoy creating scalable interfaces, automating workflows, and designing experiences that feel modern, intuitive, and powerful.
                </p>
              </div>
              <div className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/80 dark:bg-slate-950/55 p-6 shadow-glass backdrop-blur-xl">
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>Certifications</span>
                  <span className="text-cyan-200">Coursera � Amazon � Microsoft</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-400" style={{ width: '85%' }} />
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="skills" className="mt-24 scroll-mt-24">
          <SectionTitle label="Skills" title="The core technical and product capabilities." />
          <div className="grid gap-6 lg:grid-cols-2">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="rounded-[2rem] border border-white/10 bg-white/80 dark:bg-slate-950/55 p-6 shadow-glass backdrop-blur-xl"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-cyan-200/90">{skill.name}</p>
                  </div>
                  <span className="text-sm text-slate-600 dark:text-slate-300">{skill.level}%</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-400 transition-all duration-700"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="projects" className="mt-24 scroll-mt-24">
          <SectionTitle label="Projects" title="Immersive systems and user-first AI products." />
          <div className="grid gap-6 lg:grid-cols-3">
            {projects.map((project) => (
              <motion.article
                key={project.title}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                onClick={() => openProject(project)}
                className="group cursor-pointer rounded-[2rem] border border-white/10 bg-white/80 dark:bg-slate-950/60 p-6 shadow-glass backdrop-blur-xl transition hover:border-cyan-300/20"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-3xl bg-cyan-300/10 text-cyan-200 shadow-[0_20px_50px_rgba(56,189,248,0.13)]">
                  <Code2 className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{project.title}</h3>
                <p className="mt-3 text-slate-600 dark:text-slate-300">{project.description}</p>
                <div className="mt-5 flex flex-wrap gap-2 text-xs text-slate-400">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex items-center gap-2 text-cyan-200">
                  <span>View details</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="achievements" className="mt-24 scroll-mt-24">
          <SectionTitle label="Achievements" title="Competitive milestones and life achievements." />
          <div className="space-y-6">
            {achievements.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group flex gap-5 rounded-[2rem] border border-white/10 bg-white/80 dark:bg-slate-950/55 p-6 shadow-glass backdrop-blur-xl"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-cyan-300/10 text-cyan-200">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.32em] text-cyan-200/80">{item.year}</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">{item.text}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section id="hobbies" className="mt-24 scroll-mt-24">
          <SectionTitle label="Hobbies" title="What inspires me outside the screen." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {hobbies.map((hobby) => (
              <motion.div
                key={hobby.label}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.25 }}
                className="rounded-[2rem] border border-white/10 bg-white/80 dark:bg-slate-950/55 p-6 text-center shadow-glass backdrop-blur-xl"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-cyan-300/10 text-3xl">
                  {hobby.emoji}
                </div>
                <h3 className="mt-6 text-lg font-semibold text-slate-900 dark:text-slate-100">{hobby.label}</h3>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="contact" className="mt-24 scroll-mt-24">
          <SectionTitle label="Contact" title="Let&apos;s build something impactful." />
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <motion.form
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
              onSubmit={handleSubmit}
              className="rounded-[2rem] border border-white/10 bg-white/80 dark:bg-slate-950/55 p-8 shadow-glass backdrop-blur-xl"
            >
              <div className="grid gap-6">
                <input
                  type="text"
                  placeholder="Your name"
                  value={contactName}
                  onChange={(event) => setContactName(event.target.value)}
                  className="rounded-3xl border border-white/10 bg-slate-950/70 px-5 py-4 text-slate-900 dark:text-slate-100 outline-none transition focus:border-cyan-300/70 focus:ring-2 focus:ring-cyan-300/20"
                />
                <input
                  type="email"
                  placeholder="Email address"
                  value={contactEmail}
                  onChange={(event) => setContactEmail(event.target.value)}
                  className="rounded-3xl border border-white/10 bg-slate-950/70 px-5 py-4 text-slate-900 dark:text-slate-100 outline-none transition focus:border-cyan-300/70 focus:ring-2 focus:ring-cyan-300/20"
                />
                <textarea
                  rows={5}
                  placeholder="Tell me about your project"
                  value={contactMessage}
                  onChange={(event) => setContactMessage(event.target.value)}
                  className="rounded-3xl border border-white/10 bg-slate-950/70 px-5 py-4 text-slate-900 dark:text-slate-100 outline-none transition focus:border-cyan-300/70 focus:ring-2 focus:ring-cyan-300/20"
                />
                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-400 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-300"
                  >
                    Send message
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleSendWhatsApp}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-4 text-sm font-semibold text-slate-700 dark:text-slate-200 transition hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-white/10"
                  >
                    <MessageSquare className="h-4 w-4 text-cyan-200" />
                    Send via WhatsApp
                  </button>
                </div>
              </div>
            </motion.form>

            <div className="rounded-[2rem] border border-white/10 bg-white/80 dark:bg-slate-950/55 p-8 shadow-glass backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.32em] text-cyan-200/80">Reach out</p>
              <h3 className="mt-4 text-2xl font-semibold text-slate-900 dark:text-slate-100">Ready for AI, web, and product collaborations.</h3>
              <p className="mt-5 text-slate-600 dark:text-slate-300">
                Seeking opportunities in AI systems, smart assistants, and web products that combine motion, utility, and strong visuals. Message me anytime on WhatsApp at <span className="font-semibold text-cyan-200">+91 94419 66722</span>.
              </p>
              <div className="mt-8 space-y-4">
                <a
                  href={buildMailLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-slate-700 dark:text-slate-200 transition hover:border-cyan-300/40 hover:bg-white/10"
                >
                  <Mail className="h-5 w-5 text-cyan-200" />
                  <span>Open in Gmail</span>
                </a>
                <a
                  href={buildWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-slate-700 dark:text-slate-200 transition hover:border-cyan-300/40 hover:bg-white/10"
                >
                  <MessageSquare className="h-5 w-5 text-cyan-200" />
                  <span>Message on WhatsApp</span>
                </a>
                <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-slate-700 dark:text-slate-200">
                  <MapPin className="h-5 w-5 text-cyan-200" />
                  <span>Hyderabad, India</span>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {socialLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-2 rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm uppercase tracking-[0.24em] text-slate-700 dark:text-slate-200 transition hover:border-cyan-300/40 hover:text-cyan-200"
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </a>
                  );
                })}
              </div>

              <a
                href="#"
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-6 py-3 text-sm font-semibold text-cyan-200 transition hover:-translate-y-0.5 hover:bg-cyan-300/20"
              >
                <Download className="h-4 w-4" />
                Download resume
              </a>
            </div>
          </div>
        </section>
      </main>

      <ProjectModal project={selectedProject} open={projectOpen} onClose={closeProject} />

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 z-30 inline-flex h-14 w-14 items-center justify-center rounded-full bg-cyan-400/15 text-cyan-200 shadow-[0_20px_60px_rgba(34,211,238,0.18)] transition duration-300 hover:-translate-y-1 hover:bg-cyan-400/25"
        aria-label="Scroll to top"
      >
        <ArrowRight className="h-5 w-5 rotate-90" />
      </button>
    </div>
  );
}
