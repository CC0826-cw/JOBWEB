import { useStore } from "@/store/useStore";
import { Plus, Trash2, Image as ImageIcon } from "lucide-react";
import ImportConfig from "./ImportConfig";
import { Project } from "@/data/mockData";

export default function ProjectsTab() {
  const { currentUser, users, updateDraftProject, addDraftProject, removeDraftProject } = useStore();
  const draft = currentUser ? users[currentUser]?.draft : null;

  if (!draft) return null;

  const handleAddProject = () => {
    const newProject: Project = {
      id: `project-${Date.now()}`,
      title: "新项目",
      subtitle: "副标题",
      description: "项目描述...",
      imageUrl: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Minimalist%20sleek%20dashboard%20interface%20on%20dark%20background%2C%20Apple%20style%20design%2C%20high%20quality%20UI%20mockup&image_size=landscape_16_9",
      link: "#"
    };
    addDraftProject(newProject);
  };

  const handleLocalImageUpload = (e: React.ChangeEvent<HTMLInputElement>, projectId: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('请上传图片文件');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('图片大小不能超过 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target?.result as string;
      updateDraftProject(projectId, { imageUrl: base64String });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-1">作品管理</h2>
          <p className="opacity-40 text-sm">新增或编辑项目作品信息。</p>
        </div>
        <button
          onClick={handleAddProject}
          className="flex items-center justify-center gap-2 bg-current/10 px-5 py-2.5 rounded-full font-medium hover:bg-current/20 transition-colors"
        >
          <Plus size={18} /> 添加新项目
        </button>
      </div>

      <div className="space-y-10">
        {draft.projects.map((project, index) => (
          <div key={project.id} className="p-8 bg-current/5 border border-current/10 rounded-[2rem] space-y-8 relative group hover:border-current/20 transition-colors">
            <div className="absolute top-6 right-6">
              <button
                onClick={() => removeDraftProject(project.id)}
                className="p-2.5 text-red-500 opacity-60 hover:opacity-100 hover:bg-red-500/10 rounded-full transition-all"
                title="删除项目"
              >
                <Trash2 size={20} />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-current/10 flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold tracking-tight opacity-90">项目编辑</h3>
            </div>
            
            <div className="grid gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium opacity-60 mb-2">项目名称 (Title)</label>
                  <input
                    type="text"
                    value={project.title}
                    onChange={(e) => updateDraftProject(project.id, { title: e.target.value })}
                    className="w-full bg-current/5 border border-current/10 rounded-xl px-4 py-3 focus:outline-none focus:border-current/30 focus:bg-current/10 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium opacity-60 mb-2">副标题 (Subtitle)</label>
                  <input
                    type="text"
                    value={project.subtitle}
                    onChange={(e) => updateDraftProject(project.id, { subtitle: e.target.value })}
                    className="w-full bg-current/5 border border-current/10 rounded-xl px-4 py-3 focus:outline-none focus:border-current/30 focus:bg-current/10 transition-all"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium opacity-60">项目描述 (Description)</label>
                  <span className={`text-xs ${project.description.length > 3000 ? 'text-red-500' : 'opacity-40'}`}>
                    {project.description.length} / 3000
                  </span>
                </div>
                <textarea
                  value={project.description}
                  maxLength={3000}
                  onChange={(e) => updateDraftProject(project.id, { description: e.target.value })}
                  rows={3}
                  className="w-full bg-current/5 border border-current/10 rounded-xl px-4 py-3 focus:outline-none focus:border-current/30 focus:bg-current/10 transition-all resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium opacity-60 mb-2">图片 (Image)</label>
                <div className="flex flex-col gap-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={project.imageUrl}
                      onChange={(e) => updateDraftProject(project.id, { imageUrl: e.target.value })}
                      placeholder="输入图片 URL 或点击右侧按钮上传本地图片"
                      className="flex-1 bg-current/5 border border-current/10 rounded-xl px-4 py-3 focus:outline-none focus:border-current/30 focus:bg-current/10 transition-all font-mono text-sm"
                    />
                    <label className="flex items-center justify-center gap-2 bg-current/10 hover:bg-current/20 px-4 rounded-xl cursor-pointer transition-colors border border-current/10 flex-shrink-0">
                      <ImageIcon size={18} />
                      <span className="text-sm font-medium">上传本地图片</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={(e) => handleLocalImageUpload(e, project.id)} 
                      />
                    </label>
                  </div>
                  {project.imageUrl && (
                    <div className="h-32 rounded-lg bg-current/5 border border-current/10 overflow-hidden flex items-center justify-center relative group">
                      <img src={project.imageUrl} alt="预览" className="max-h-full max-w-full object-contain" />
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium opacity-60 mb-2">跳转链接 (Link)</label>
                <input
                  type="text"
                  value={project.link}
                  onChange={(e) => updateDraftProject(project.id, { link: e.target.value })}
                  className="w-full bg-current/5 border border-current/10 rounded-xl px-4 py-3 focus:outline-none focus:border-current/30 focus:bg-current/10 transition-all font-mono text-sm"
                />
              </div>
            </div>
          </div>
        ))}
        
        {draft.projects.length === 0 && (
          <div className="text-center py-20 bg-current/5 border border-current/10 border-dashed rounded-[2rem]">
            <div className="opacity-40 mb-4">暂无项目</div>
            <button
              onClick={handleAddProject}
              className="font-medium hover:underline underline-offset-4"
            >
              立即添加一个项目
            </button>
          </div>
        )}
      </div>

      <ImportConfig 
        section="projects" 
        placeholder='[{"id": "...", "title": "...", "description": "..."}, ...]'
        description="上传配置文件，或在此处粘贴 Projects (数组) 的 JSON 数据，快速覆盖或新增项目。"
      />
    </div>
  );
}