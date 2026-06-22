import { useStore } from "@/store/useStore";
import { ArrowUpRight, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/data/mockData";

export default function Projects() {
  const currentUser = useStore(state => state.currentUser);
  const { projects, theme } = useStore(state => state.users[currentUser!]!.published);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-32 relative z-10" style={{ backgroundColor: 'inherit' }}>
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-20 md:mb-32">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-4"
          >
            精选作品
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-xl opacity-50"
          >
            探索我引以为傲的数字实践。
          </motion.p>
        </div>

        <div className="space-y-32">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col md:flex-row items-center gap-12 lg:gap-20"
            >
              <div className={`w-full md:w-3/5 overflow-hidden rounded-[2rem] glass-card ${index % 2 !== 0 ? 'md:order-last' : ''}`}>
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/10">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    src={project.imageUrl}
                    alt={project.title}
                    className="absolute inset-0 object-cover w-full h-full opacity-90 group-hover:opacity-100 transition-opacity"
                    onError={(e) => {
                      // fallback if image fails to load
                      e.currentTarget.src = `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Minimalist%20abstract%20gradient%20background%2C%20premium%20design&image_size=landscape_16_9`;
                    }}
                  />
                </div>
              </div>
              
              <div className="w-full md:w-2/5 flex flex-col items-start">
                <h4 className="text-sm font-semibold tracking-widest opacity-40 uppercase mb-3">
                  {project.subtitle}
                </h4>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                  {project.title}
                </h3>
                <p className="text-lg opacity-60 mb-8 leading-relaxed font-light">
                  {project.description}
                </p>
                <button 
                  onClick={() => setSelectedProject(project)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-opacity hover:opacity-90"
                  style={{ backgroundColor: theme.textColor, color: theme.backgroundColor }}
                >
                  查看详情 <ArrowUpRight size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-card rounded-[2rem] p-8 md:p-12"
              style={{ backgroundColor: theme.backgroundColor, color: theme.textColor }}
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-3 rounded-full transition-colors opacity-60 hover:opacity-100 hover:bg-current/10"
              >
                <X size={20} />
              </button>
              <img 
                src={selectedProject.imageUrl} 
                alt={selectedProject.title} 
                className="w-full h-auto min-h-[200px] max-h-[50vh] object-cover rounded-2xl mb-8 bg-black/10"
                onError={(e) => {
                  e.currentTarget.src = `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Minimalist%20abstract%20gradient%20background%2C%20premium%20design&image_size=landscape_16_9`;
                }}
              />
              <h3 className="text-3xl md:text-5xl font-bold mb-4">{selectedProject.title}</h3>
              <h4 className="text-xl opacity-60 mb-8">{selectedProject.subtitle}</h4>
              <p className="text-lg opacity-80 leading-relaxed mb-8">{selectedProject.description}</p>
              
              {selectedProject.link && selectedProject.link !== '#' && (
                <a 
                  href={selectedProject.link} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium transition-opacity hover:opacity-90"
                  style={{ backgroundColor: theme.textColor, color: theme.backgroundColor }}
                >
                  访问项目链接 <ArrowUpRight size={18} />
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
