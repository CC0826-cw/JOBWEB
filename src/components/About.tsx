import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useStore } from "@/store/useStore";

export default function About() {
  const currentUser = useStore(state => state.currentUser);
  const { profile } = useStore(state => state.users[currentUser!]!.published);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.95, 1, 0.95]);

  return (
    <section id="about" ref={containerRef} className="py-32 min-h-screen flex items-center relative">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          style={{ opacity, scale }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight mb-12">
            "不只是写代码，
            <br />
            <span className="opacity-40">更是在雕琢体验。"</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-24">
            {profile.skills.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center justify-center p-6 glass-card rounded-2xl"
              >
                <span className="text-lg font-medium opacity-90">{skill}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
