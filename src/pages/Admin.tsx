import { useState, useEffect } from "react";
import { useStore } from "@/store/useStore";
import { ArrowLeft, LogOut, Save, Shield, User, FolderOpen, Palette, LayoutTemplate, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import ProfileTab from "./admin/ProfileTab";
import ProjectsTab from "./admin/ProjectsTab";
import ThemeTab from "./admin/ThemeTab";
import LayoutTab from "./admin/LayoutTab";
import UsersTab from "./admin/UsersTab";

export default function Admin() {
  const { currentUser, users, publishChanges, logout, requestPermission } = useStore();
  const [activeTab, setActiveTab] = useState<"profile" | "projects" | "theme" | "layout" | "users">("profile");

  const userAccount = currentUser ? users[currentUser] : null;
  const draft = userAccount?.draft;
  const published = userAccount?.published;

  useEffect(() => {
    if (draft?.theme) {
      document.body.style.backgroundColor = draft.theme.backgroundColor;
      document.body.style.color = draft.theme.textColor;
      document.documentElement.style.setProperty('--theme-bg', draft.theme.backgroundColor);
      document.documentElement.style.setProperty('--theme-text', draft.theme.textColor);
      document.documentElement.style.setProperty('--theme-accent', draft.theme.accentColor);
      document.documentElement.style.setProperty('--theme-card', draft.theme.cardBgColor);
    }
  }, [draft?.theme]);

  useEffect(() => {
    return () => {
      if (published?.theme) {
        document.body.style.backgroundColor = published.theme.backgroundColor;
        document.body.style.color = published.theme.textColor;
        document.documentElement.style.setProperty('--theme-bg', published.theme.backgroundColor);
        document.documentElement.style.setProperty('--theme-text', published.theme.textColor);
        document.documentElement.style.setProperty('--theme-accent', published.theme.accentColor);
        document.documentElement.style.setProperty('--theme-card', published.theme.cardBgColor);
      }
    };
  }, [published?.theme]);

  const handleSave = () => {
    publishChanges();
    alert("保存成功！前端页面已更新。");
  };

  if (!userAccount) return null;

  if (!userAccount.canEdit && userAccount.role !== 'superadmin') {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white font-sans flex flex-col items-center justify-center p-6 relative">
        <Link to="/" className="absolute top-8 left-8 text-white/50 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium">
          <ArrowLeft size={18} /> 返回首页
        </Link>
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md p-10 bg-white/[0.02] backdrop-blur-2xl border border-white/[0.05] rounded-[2rem] text-center"
        >
          <Shield size={48} className="mx-auto mb-6 opacity-50" />
          <h1 className="text-2xl font-bold mb-4">无编辑权限</h1>
          <p className="text-white/60 mb-8">您的账号尚未开通个性化配置权限。<br/>请联系超级管理员为您开放。</p>
          
          <div className="space-y-4">
            <button 
              onClick={() => {
                if (!userAccount.permissionRequested) {
                  requestPermission(userAccount.username);
                  alert('权限申请已发送给管理员！');
                }
              }}
              disabled={userAccount.permissionRequested}
              className="w-full bg-white text-black font-medium rounded-xl px-4 py-3 hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {userAccount.permissionRequested ? "已发送申请，等待审核中..." : "申请编辑权限"}
            </button>
            <button onClick={logout} className="w-full bg-transparent border border-white/10 text-white font-medium rounded-xl px-4 py-3 hover:bg-white/5 transition-colors">
              退出登录
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!draft) return null;

  const NavButton = ({ id, icon: Icon, label }: { id: typeof activeTab, icon: any, label: string }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-4 py-3 rounded-xl text-left transition-all duration-300 font-medium flex items-center gap-3 ${
        activeTab === id ? "shadow-lg" : "opacity-60 hover:bg-current/5 hover:opacity-100"
      }`}
      style={activeTab === id ? { backgroundColor: draft.theme.textColor, color: draft.theme.backgroundColor } : {}}
    >
      <Icon size={18} className="flex-shrink-0" /> <span className="whitespace-nowrap">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen font-sans transition-colors duration-300" style={{ backgroundColor: draft.theme.backgroundColor, color: draft.theme.textColor }}>
      <header className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between border-b border-current/10 bg-[var(--theme-bg)]/80 backdrop-blur-xl transition-colors duration-300">
        <div className="flex items-center gap-4">
          <Link to="/" className="opacity-60 hover:opacity-100 transition-opacity flex items-center gap-2 text-sm font-medium">
            <ArrowLeft size={18} /> 返回首页
          </Link>
          <div className="h-4 w-px bg-current/20"></div>
          <h1 className="text-lg font-bold tracking-tight">管理后台 <span className="text-sm font-normal opacity-50 ml-2">({userAccount.username})</span></h1>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={handleSave} 
            className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95"
            style={{ backgroundColor: draft.theme.textColor, color: draft.theme.backgroundColor }}
          >
            <Save size={16} /> 保存发布
          </button>
          <div className="h-4 w-px bg-current/20"></div>
          <button onClick={logout} className="flex items-center gap-2 text-sm font-medium opacity-60 hover:opacity-100 transition-opacity">
            <LogOut size={16} /> 退出
          </button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12 flex flex-col md:flex-row gap-12">
        <aside className="w-full md:w-56 flex-shrink-0">
          <nav className="flex flex-col gap-2 sticky top-24">
            <NavButton id="profile" icon={User} label="基本信息" />
            <NavButton id="projects" icon={FolderOpen} label="作品管理" />
            <NavButton id="theme" icon={Palette} label="全局配色" />
            <NavButton id="layout" icon={LayoutTemplate} label="板块排版" />
            {userAccount.role === 'superadmin' && (
              <div className="mt-4 pt-4 border-t border-current/10">
                <NavButton id="users" icon={Users} label="用户审核与权限" />
              </div>
            )}
          </nav>
        </aside>

        <main className="flex-1 max-w-3xl">
          {activeTab === "profile" && <ProfileTab />}
          {activeTab === "projects" && <ProjectsTab />}
          {activeTab === "theme" && <ThemeTab />}
          {activeTab === "layout" && <LayoutTab />}
          {activeTab === "users" && <UsersTab />}
        </main>
      </div>
    </div>
  );
}