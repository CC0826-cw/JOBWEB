import { useState } from "react";
import { useStore } from "@/store/useStore";
import { Lock, UserPlus, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function AuthOverlay() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<{ type: 'error' | 'success', text: string } | null>(null);

  const { login, register } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    
    if (!username.trim() || !password.trim()) {
      setMessage({ type: 'error', text: "账号和密码不能为空" });
      return;
    }

    if (isLogin) {
      const result = login(username, password);
      if (result === 'invalid') {
        setMessage({ type: 'error', text: "账号或密码错误" });
      } else if (result === 'pending') {
        setMessage({ type: 'error', text: "账号待审核中，请联系超级管理员 (user) 开通权限" });
      }
    } else {
      const result = register(username, password);
      if (result === 'exists') {
        setMessage({ type: 'error', text: "该账号已存在，请直接登录" });
      } else {
        setMessage({ type: 'success', text: "注册成功！请等待管理员审核后登录。" });
        setIsLogin(true);
        setPassword("");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-gray-900 selection:text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* 动态背景动画元素 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-blue-200/40 blur-3xl mix-blend-multiply"
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-purple-200/40 blur-3xl mix-blend-multiply"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-[10%] left-[20%] w-[80%] h-[80%] rounded-full bg-pink-200/40 blur-3xl mix-blend-multiply"
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md p-10 bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] rounded-[2rem]"
      >
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-14 h-14 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center mb-6">
            {isLogin ? <Lock size={24} className="text-gray-700" /> : <UserPlus size={24} className="text-gray-700" />}
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-gray-900">
            {isLogin ? "欢迎回来" : "创建专属空间"}
          </h1>
          <p className="text-gray-500 text-sm">
            {isLogin ? "请输入账号和密码以继续" : "注册后需等待管理员审核方可登录"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">账号</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-white/50 border border-gray-200/80 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 focus:bg-white/90 transition-all placeholder:text-gray-400 shadow-sm"
              placeholder="请输入账号"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">密码</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/50 border border-gray-200/80 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 focus:bg-white/90 transition-all placeholder:text-gray-400 shadow-sm"
              placeholder="请输入密码"
            />
          </div>
          
          {message && (
            <p className={`text-sm text-center font-medium ${message.type === 'error' ? 'text-red-500' : 'text-green-600'}`}>
              {message.text}
            </p>
          )}
          
          <button
            type="submit"
            className="w-full bg-gray-900 text-white font-medium rounded-xl px-4 py-3.5 hover:bg-gray-800 transition-colors mt-2 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
          >
            {isLogin ? "登录" : "注册"} <ArrowRight size={18} />
          </button>
        </form>

        <div className="mt-8 text-center relative z-10">
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage(null);
            }}
            className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
          >
            {isLogin ? "没有账号？点击注册" : "已有账号？直接登录"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}