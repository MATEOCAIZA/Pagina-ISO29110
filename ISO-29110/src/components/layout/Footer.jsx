import { motion } from 'framer-motion';
import { Github, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border-subtle mt-20 py-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-text-muted text-sm">
        <div className="flex items-center gap-2">
          <span>Guía Interactiva</span>
          <span className="text-border-subtle">·</span>
          <span className="gradient-text font-semibold">ISO/IEC 29110</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span>Hecho con</span>
          <Heart size={13} className="text-danger fill-danger" />
          <span>para pequeñas empresas de software</span>
        </div>
        <div className="text-xs opacity-60">
          Basado en la norma ISO/IEC 29110 — VSE
        </div>
      </div>
    </footer>
  );
}
