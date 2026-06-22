import { useStore } from "@/store/useStore";
import { Eye, EyeOff, ArrowUp, ArrowDown, Trash2, Plus } from "lucide-react";
import ImportConfig from "./ImportConfig";

export default function LayoutTab() {
  const { currentUser, users, updateDraftLayout } = useStore();
  const draft = currentUser ? users[currentUser]?.draft : null;

  if (!draft) return null;

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newSections = [...draft.layout.sections];
    if (direction === 'up' && index > 0) {
      [newSections[index - 1], newSections[index]] = [newSections[index], newSections[index - 1]];
    } else if (direction === 'down' && index < newSections.length - 1) {
      [newSections[index + 1], newSections[index]] = [newSections[index], newSections[index + 1]];
    }
    updateDraftLayout({ sections: newSections });
  };

  const toggleSectionVisibility = (index: number) => {
    const newSections = [...draft.layout.sections];
    newSections[index].visible = !newSections[index].visible;
    updateDraftLayout({ sections: newSections });
  };

  const handleAddSection = () => {
    const newSections = [...draft.layout.sections, { id: `custom-${Date.now()}`, name: "新板块", visible: true }];
    updateDraftLayout({ sections: newSections });
  };

  const renameSection = (index: number, newName: string) => {
    if (newName.length > 8) return;
    const newSections = [...draft.layout.sections];
    newSections[index].name = newName;
    updateDraftLayout({ sections: newSections });
  };

  const removeSection = (index: number) => {
    const newSections = draft.layout.sections.filter((_, i) => i !== index);
    updateDraftLayout({ sections: newSections });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-1">板块排版</h2>
        <p className="text-white/40 text-sm">调整前端页面各功能板块的显示顺序与可见状态。</p>
      </div>

      <div className="space-y-4">
        {draft.layout.sections.map((section, index) => (
          <div 
            key={section.id} 
            className={`p-5 rounded-2xl border flex items-center justify-between transition-colors ${
              section.visible ? "bg-current/5 border-current/10" : "bg-current/10 border-transparent opacity-50"
            }`}
          >
            <div className="flex items-center gap-4">
              <input
                type="text"
                value={section.name}
                maxLength={8}
                onChange={(e) => renameSection(index, e.target.value)}
                className="bg-transparent border border-transparent hover:border-current/20 focus:border-current/40 focus:bg-current/5 rounded px-2 py-1 text-lg font-medium transition-all w-32 md:w-48 outline-none"
                placeholder="板块名称"
              />
              {!section.visible && <span className="text-xs px-2 py-1 bg-current/10 rounded-md">已隐藏</span>}
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => toggleSectionVisibility(index)}
                className="p-2 hover:bg-current/10 rounded-full transition-colors"
                title={section.visible ? "隐藏该板块" : "显示该板块"}
              >
                {section.visible ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
              
              <div className="w-px h-6 bg-current/10 mx-1"></div>
              
              <button 
                onClick={() => moveSection(index, 'up')}
                disabled={index === 0}
                className="p-2 hover:bg-current/10 rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ArrowUp size={18} />
              </button>
              <button 
                onClick={() => moveSection(index, 'down')}
                disabled={index === draft.layout.sections.length - 1}
                className="p-2 hover:bg-current/10 rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ArrowDown size={18} />
              </button>

              <div className="w-px h-6 bg-current/10 mx-1"></div>

              <button
                onClick={() => removeSection(index)}
                className="p-2 text-red-500 opacity-60 hover:opacity-100 hover:bg-red-500/10 rounded-full transition-colors"
                title="删除板块"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
        
        <button
          onClick={handleAddSection}
          className="w-full py-4 mt-2 border-2 border-dashed border-current opacity-40 hover:opacity-100 rounded-2xl flex items-center justify-center gap-2 transition-all bg-current/5"
        >
          <Plus size={18} /> 添加新板块
        </button>
      </div>

      <ImportConfig 
        section="layout" 
        placeholder='{"sections": [{"id": "hero", "name": "首屏介绍", "visible": true}, ...]}'
        description="上传配置文件，或在此处粘贴 Layout 的 JSON 数据，快速覆盖当前板块排版内容。"
      />
    </div>
  );
}