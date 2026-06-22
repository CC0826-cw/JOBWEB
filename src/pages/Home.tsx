import { useEffect } from "react";
import { useStore } from "@/store/useStore";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

export default function Home() {
  const currentUser = useStore((state) => state.currentUser);
  const siteData = useStore((state) => state.users[currentUser!]?.published);

  // 防复制与防爬取保护逻辑
  useEffect(() => {
    // 禁用右键菜单
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // 禁用文本选择和复制
    const handleSelectStart = (e: Event) => {
      e.preventDefault();
    };
    
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      // 可选：设置剪贴板为空，或放入警告信息
      e.clipboardData?.setData('text/plain', '该内容受版权保护，禁止复制。');
    };

    // 禁用常用开发者快捷键 (F12, Ctrl+Shift+I, Ctrl+C, etc.)
    const handleKeyDown = (e: KeyboardEvent) => {
      // 检查 Ctrl/Cmd + C, X, A, S, U, P
      if ((e.ctrlKey || e.metaKey) && ['c', 'x', 'a', 's', 'u', 'p'].includes(e.key.toLowerCase())) {
        e.preventDefault();
      }
      // F12 或 Ctrl+Shift+I (打开开发者工具)
      if (e.key === 'F12' || ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'i')) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('selectstart', handleSelectStart);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('keydown', handleKeyDown);

    // 反调试：无限 debugger (仅在生产环境开启，避免影响开发调试)
    let antiDebugInterval: NodeJS.Timeout;
    if (import.meta.env.PROD) {
      antiDebugInterval = setInterval(() => {
        (function() {
          return false;
        })['constructor']('debugger')['call']();
      }, 1000);
    }

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('keydown', handleKeyDown);
      if (antiDebugInterval) clearInterval(antiDebugInterval);
    };
  }, []);

  useEffect(() => {
    if (!siteData?.theme) return;
    const { theme } = siteData;
    // 动态应用全局主题配置
    document.body.style.backgroundColor = theme.backgroundColor;
    document.body.style.color = theme.textColor;
    document.documentElement.style.setProperty('--theme-bg', theme.backgroundColor);
    document.documentElement.style.setProperty('--theme-text', theme.textColor);
    document.documentElement.style.setProperty('--custom-card-bg', theme.cardBgColor);
    document.documentElement.style.setProperty('--custom-accent', theme.accentColor);
  }, [siteData?.theme]);

  if (!siteData) return null;

  const { theme, layout } = siteData;

  // 根据板块 id 动态渲染组件
  const renderSection = (section: { id: string, name: string }) => {
    switch (section.id) {
      case "hero": return <Hero key={section.id} />;
      case "about": return <About key={section.id} />;
      case "projects": return <Projects key={section.id} />;
      default: return (
        <section key={section.id} className="py-32 flex items-center justify-center min-h-[40vh] border-y border-current/5" style={{ backgroundColor: 'inherit' }}>
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-bold opacity-30 mb-4">{section.name}</h2>
            <p className="text-lg opacity-40">自定义板块内容待开发...</p>
          </div>
        </section>
      );
    }
  };

  return (
    <div 
      className="min-h-screen transition-colors duration-500" 
      style={{ 
        backgroundColor: theme.backgroundColor, 
        color: theme.textColor,
        // CSS 层面禁用用户选中和拖拽
        userSelect: 'none',
        WebkitUserSelect: 'none',
        msUserSelect: 'none',
      }}
    >
      <Navigation />
      <main>
        {layout.sections.filter(s => s.visible).map(s => renderSection(s))}
      </main>
      <Footer />
    </div>
  );
}
