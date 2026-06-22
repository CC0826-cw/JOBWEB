import { motion } from "framer-motion";
import { useStore } from "@/store/useStore";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const currentUser = useStore(state => state.currentUser);
  const { profile } = useStore(state => state.users[currentUser!]!.published);
  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-24">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.03] rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center mt-12 md:mt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 relative group"
        >
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-current/10 shadow-2xl relative z-10">
            <img 
              src={profile.avatarUrl || 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Minimalist%20sleek%20avatar%203D%20render%20boy%20glassmorphism%20portrait&image_size=square'} 
              alt={profile.name} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              onError={(e) => {
                e.currentTarget.src = 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Minimalist%20sleek%20avatar%203D%20render%20boy%20glassmorphism%20portrait&image_size=square';
              }}
            />
          </div>
          <div className="absolute inset-0 bg-current opacity-20 blur-3xl rounded-full group-hover:opacity-40 transition-opacity duration-700" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none mb-6"
        >
          {profile.name}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="inline-flex items-center justify-center px-5 py-2 mb-10 rounded-full border border-current/10 bg-current/5 backdrop-blur-md"
        >
          <span className="text-sm font-medium opacity-80 tracking-widest uppercase">
            {profile.role}
          </span>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-8 opacity-90"
        >
          {profile.headline.split('，').map((text, i, arr) => (
            <span key={i}>
              {text}{i !== arr.length - 1 && '，'}
              <br className="hidden md:block" />
            </span>
          ))}
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="text-lg md:text-2xl opacity-60 max-w-2xl leading-relaxed font-light mb-24 md:mb-32"
        >
          {profile.bio}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-4 md:bottom-8 left-0 w-full flex flex-col items-center justify-center gap-2 animate-bounce pointer-events-none"
      >
        <span className="text-xs uppercase tracking-[0.2em] pl-[0.2em] opacity-40 font-medium">向下滚动</span>
        <ChevronDown size={20} className="opacity-40" />
      </motion.div>
    </section>
  );
}
