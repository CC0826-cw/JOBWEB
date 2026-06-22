import { useStore } from "@/store/useStore";
import { Image as ImageIcon } from "lucide-react";
import ImportConfig from "./ImportConfig";

export default function ProfileTab() {
  const { currentUser, users, updateDraftProfile, updateDraftSocials } = useStore();
  const draft = currentUser ? users[currentUser]?.draft : null;

  if (!draft) return null;

  const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const skills = e.target.value.split(",").map(s => s.trim());
    updateDraftProfile({ skills });
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-1">基本信息配置</h2>
          <p className="text-white/40 text-sm">修改您的个人资料，点击右上角“保存发布”后在前端生效。</p>
        </div>
        <div className="grid gap-6">
          <div>
            <label className="block text-sm font-medium opacity-60 mb-2">姓名 (Name)</label>
            <input
              type="text"
              value={draft.profile.name}
              onChange={(e) => updateDraftProfile({ name: e.target.value })}
              className="w-full bg-current/5 border border-current/10 rounded-xl px-4 py-3 focus:outline-none focus:border-current/30 focus:bg-current/10 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium opacity-60 mb-2">头像地址 (Avatar URL)</label>
            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={draft.profile.avatarUrl || ''}
                  onChange={(e) => updateDraftProfile({ avatarUrl: e.target.value })}
                  placeholder="输入图片 URL 或上传本地图片"
                  className="flex-1 bg-current/5 border border-current/10 rounded-xl px-4 py-3 focus:outline-none focus:border-current/30 focus:bg-current/10 transition-all font-mono text-sm"
                />
                <label className="flex items-center justify-center gap-2 bg-current/10 hover:bg-current/20 px-4 rounded-xl cursor-pointer transition-colors border border-current/10 flex-shrink-0">
                  <ImageIcon size={18} />
                  <span className="text-sm font-medium">上传头像</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      if (!file.type.startsWith('image/')) return alert('请上传图片文件');
                      if (file.size > 2 * 1024 * 1024) return alert('头像大小不能超过 2MB');
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        updateDraftProfile({ avatarUrl: event.target?.result as string });
                      };
                      reader.readAsDataURL(file);
                    }} 
                  />
                </label>
              </div>
              {draft.profile.avatarUrl && (
                <div className="w-20 h-20 rounded-full bg-current/5 border border-current/10 overflow-hidden flex items-center justify-center">
                  <img src={draft.profile.avatarUrl} alt="头像预览" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium opacity-60 mb-2">职位/头衔 (Role)</label>
            <input
              type="text"
              value={draft.profile.role}
              onChange={(e) => updateDraftProfile({ role: e.target.value })}
              className="w-full bg-current/5 border border-current/10 rounded-xl px-4 py-3 focus:outline-none focus:border-current/30 focus:bg-current/10 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium opacity-60 mb-2">核心标语 (Headline)</label>
            <input
              type="text"
              value={draft.profile.headline}
              onChange={(e) => updateDraftProfile({ headline: e.target.value })}
              className="w-full bg-current/5 border border-current/10 rounded-xl px-4 py-3 focus:outline-none focus:border-current/30 focus:bg-current/10 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium opacity-60 mb-2">个人简介 (Bio)</label>
            <textarea
              value={draft.profile.bio}
              onChange={(e) => updateDraftProfile({ bio: e.target.value })}
              rows={4}
              className="w-full bg-current/5 border border-current/10 rounded-xl px-4 py-3 focus:outline-none focus:border-current/30 focus:bg-current/10 transition-all resize-none leading-relaxed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium opacity-60 mb-2">专业技能 (用英文逗号分隔)</label>
            <input
              type="text"
              value={draft.profile.skills.join(", ")}
              onChange={handleSkillChange}
              className="w-full bg-current/5 border border-current/10 rounded-xl px-4 py-3 focus:outline-none focus:border-current/30 focus:bg-current/10 transition-all"
            />
          </div>
        </div>
      </section>

      <section className="space-y-8 pt-10 border-t border-current/10">
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-1">社交链接</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(draft.profile.socials).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium opacity-60 mb-2 capitalize">{key}</label>
              <input
                type="text"
                value={value}
                onChange={(e) => updateDraftSocials({ [key]: e.target.value })}
                className="w-full bg-current/5 border border-current/10 rounded-xl px-4 py-3 focus:outline-none focus:border-current/30 focus:bg-current/10 transition-all"
              />
            </div>
          ))}
        </div>
      </section>

      <ImportConfig 
        section="profile" 
        placeholder='{"name": "...", "role": "...", "skills": [...]}'
        description="上传配置文件，或粘贴 Profile 的 JSON 数据，快速覆盖当前板块内容。"
      />
    </div>
  );
}