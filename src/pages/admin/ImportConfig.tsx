import { useState } from "react";
import { Upload, Download } from "lucide-react";
import { useStore } from "@/store/useStore";

interface ImportConfigProps {
  title?: string;
  description?: string;
  placeholder?: string;
  section: 'profile' | 'projects' | 'theme' | 'layout';
}

export default function ImportConfig({ 
  title = "导入配置 (JSON 文件或文本)", 
  description = "上传配置文件，或粘贴 JSON 数据，快速覆盖当前板块内容。",
  placeholder = "{}",
  section 
}: ImportConfigProps) {
  const [importJson, setImportJson] = useState("");
  const { 
    currentUser, users,
    updateDraftProfile, updateDraftProject, addDraftProject, 
    updateDraftTheme, updateDraftLayout 
  } = useStore();

  const userAccount = currentUser ? users[currentUser] : null;
  const draft = userAccount?.draft;

  const processImport = (parsed: any) => {
    if (!draft) return;
    if (section === 'profile') updateDraftProfile(parsed);
    if (section === 'projects') {
      parsed.forEach((p: any) => {
        if(!draft.projects.find(dp => dp.id === p.id)) {
          addDraftProject(p);
        } else {
          updateDraftProject(p.id, p);
        }
      });
    }
    if (section === 'theme') updateDraftTheme(parsed);
    if (section === 'layout') updateDraftLayout(parsed);
  };

  const handleImportConfig = () => {
    try {
      if (!importJson.trim()) {
        alert("请输入 JSON 配置");
        return;
      }
      const parsed = JSON.parse(importJson);
      processImport(parsed);
      alert("配置导入成功！");
      setImportJson("");
    } catch (err) {
      alert("导入失败：JSON 格式不正确");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        processImport(parsed);
        alert("文件解析成功并应用！");
      } catch (err) {
        alert("导入失败：文件解析错误或格式不正确");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  if (!draft) return null;

  return (
    <section className="space-y-8 pt-10 border-t border-current/10">
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-1">{title}</h2>
        <p className="opacity-40 text-sm">{description}</p>
      </div>
      <div className="flex flex-col gap-4">
        <label className="flex items-center justify-center w-full p-6 border-2 border-dashed border-current opacity-40 hover:opacity-100 rounded-xl cursor-pointer transition-all bg-current/5">
          <div className="flex flex-col items-center gap-2">
            <Upload size={24} />
            <span className="text-sm font-medium">点击上传 {section} 配置文件 (.json)</span>
          </div>
          <input type="file" accept=".json" className="hidden" onChange={handleFileUpload} />
        </label>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-current/10"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-[var(--theme-bg)] px-2 opacity-50">或手动输入</span>
          </div>
        </div>

        <textarea
          value={importJson}
          onChange={(e) => setImportJson(e.target.value)}
          rows={4}
          placeholder={placeholder}
          className="w-full bg-transparent border border-current/20 rounded-xl px-4 py-3 opacity-80 focus:opacity-100 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-current transition-all resize-y"
        />
        <button
          onClick={handleImportConfig}
          className="self-start flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-colors"
          style={{ backgroundColor: draft.theme.textColor, color: draft.theme.backgroundColor }}
        >
          <Download size={16} /> 导入文本数据
        </button>
      </div>
    </section>
  );
}