import { useStore } from "@/store/useStore";
import ImportConfig from "./ImportConfig";
import { ThemeConfig } from "@/data/mockData";

const THEME_PRESETS: { name: string; theme: ThemeConfig }[] = [
  { name: 'Apple 暗黑', theme: { backgroundColor: '#000000', textColor: '#ffffff', accentColor: '#2997ff', cardBgColor: 'rgba(255, 255, 255, 0.02)' } },
  { name: 'Apple 极简白', theme: { backgroundColor: '#f5f5f7', textColor: '#1d1d1f', accentColor: '#0066cc', cardBgColor: 'rgba(0, 0, 0, 0.04)' } },
  { name: 'Linear 质感', theme: { backgroundColor: '#08090a', textColor: '#f2f3f5', accentColor: '#5e6ad2', cardBgColor: '#111214' } },
  { name: 'Notion 极简', theme: { backgroundColor: '#ffffff', textColor: '#37352f', accentColor: '#ea4646', cardBgColor: '#f7f6f3' } },
  { name: 'Vercel 黑客', theme: { backgroundColor: '#000000', textColor: '#ededed', accentColor: '#ffffff', cardBgColor: '#111111' } },
  { name: 'Discord 活泼', theme: { backgroundColor: '#313338', textColor: '#f2f3f5', accentColor: '#5865f2', cardBgColor: '#2b2d31' } },
  { name: 'Stripe 商业', theme: { backgroundColor: '#f6f9fc', textColor: '#0a2540', accentColor: '#635bff', cardBgColor: '#ffffff' } },
  { name: 'GitHub 极客', theme: { backgroundColor: '#0d1117', textColor: '#c9d1d9', accentColor: '#2f81f7', cardBgColor: '#161b22' } }
];

export default function ThemeTab() {
  const { currentUser, users, updateDraftTheme } = useStore();
  const draft = currentUser ? users[currentUser]?.draft : null;

  if (!draft) return null;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-1">全局配色</h2>
        <p className="text-white/40 text-sm">自定义前台网站的颜色风格。</p>
      </div>

      <div className="space-y-4 mb-8">
        <h3 className="text-sm font-medium opacity-60 mb-3">预设配色方案 (点击应用)</h3>
        <div className="flex flex-wrap gap-3">
          {THEME_PRESETS.map((preset) => (
            <button
              key={preset.name}
              onClick={() => updateDraftTheme(preset.theme)}
              className="px-4 py-2 rounded-xl text-sm font-medium border border-current/10 hover:border-current/30 transition-all flex items-center gap-2"
              style={{ backgroundColor: preset.theme.backgroundColor, color: preset.theme.textColor }}
            >
              <span className="w-3 h-3 rounded-full shadow-sm border border-current/20" style={{ backgroundColor: preset.theme.accentColor }}></span>
              {preset.name}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid gap-6">
        <div className="p-6 bg-current/5 border border-current/10 rounded-2xl flex items-center justify-between">
          <div>
            <h3 className="font-medium">网页背景色 (Background)</h3>
            <p className="opacity-40 text-sm mt-1">控制整个页面的底色</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono opacity-60 text-sm uppercase">{draft.theme.backgroundColor}</span>
            <input 
              type="color" 
              value={draft.theme.backgroundColor} 
              onChange={(e) => updateDraftTheme({ backgroundColor: e.target.value })}
              className="w-12 h-12 rounded-lg cursor-pointer bg-transparent border-0 p-0"
            />
          </div>
        </div>

        <div className="p-6 bg-current/5 border border-current/10 rounded-2xl flex items-center justify-between">
          <div>
            <h3 className="font-medium">全局文字色 (Text)</h3>
            <p className="opacity-40 text-sm mt-1">控制正文、标题的基础颜色</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono opacity-60 text-sm uppercase">{draft.theme.textColor}</span>
            <input 
              type="color" 
              value={draft.theme.textColor} 
              onChange={(e) => updateDraftTheme({ textColor: e.target.value })}
              className="w-12 h-12 rounded-lg cursor-pointer bg-transparent border-0 p-0"
            />
          </div>
        </div>

        <div className="p-6 bg-current/5 border border-current/10 rounded-2xl flex items-center justify-between">
          <div>
            <h3 className="font-medium">按钮/强调色 (Accent)</h3>
            <p className="opacity-40 text-sm mt-1">控制卡片查看按钮等交互元素的颜色</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono opacity-60 text-sm uppercase">{draft.theme.accentColor}</span>
            <input 
              type="color" 
              value={draft.theme.accentColor} 
              onChange={(e) => updateDraftTheme({ accentColor: e.target.value })}
              className="w-12 h-12 rounded-lg cursor-pointer bg-transparent border-0 p-0"
            />
          </div>
        </div>
        
        <div className="p-6 bg-current/5 border border-current/10 rounded-2xl">
          <div className="mb-4">
            <h3 className="font-medium">卡片背景色 (Card Background)</h3>
            <p className="opacity-40 text-sm mt-1">技能卡片、项目卡片的背景颜色 (支持 rgba 透明度)</p>
          </div>
          <input 
            type="text" 
            value={draft.theme.cardBgColor} 
            onChange={(e) => updateDraftTheme({ cardBgColor: e.target.value })}
            className="w-full bg-current/5 border border-current/10 rounded-xl px-4 py-3 focus:outline-none focus:border-current/30 focus:bg-current/10 transition-all font-mono"
            placeholder="e.g. rgba(255, 255, 255, 0.02)"
          />
        </div>
      </div>

      <ImportConfig 
        section="theme" 
        placeholder='{"backgroundColor": "#000000", "textColor": "#ffffff", ...}'
        description="上传配置文件，或在此处粘贴 Theme 的 JSON 数据，快速覆盖当前板块内容。"
      />
    </div>
  );
}