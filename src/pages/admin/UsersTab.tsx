import { useStore } from "@/store/useStore";
import { CheckCircle, Shield } from "lucide-react";

export default function UsersTab() {
  const { currentUser, users, approveUser, grantPermission } = useStore();
  const userAccount = currentUser ? users[currentUser] : null;
  const draft = userAccount?.draft;

  if (!userAccount || userAccount.role !== 'superadmin' || !draft) return null;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-1">用户审核与权限管理</h2>
        <p className="opacity-40 text-sm">审批新注册用户的登录权限，以及分配其对个人网站的编辑配置权限。</p>
      </div>

      <div className="space-y-4">
        {Object.values(users).map((user) => {
          if (user.username === 'user') return null; // 隐藏超级管理员自己
          return (
            <div key={user.username} className="p-6 bg-current/5 border border-current/10 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold">{user.username}</h3>
                  {user.status === 'pending' ? (
                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-yellow-500/20 text-yellow-500 border border-yellow-500/20">待审核</span>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-green-500/20 text-green-500 border border-green-500/20">已通过</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-sm opacity-60">编辑权限: {user.canEdit ? '已开启' : '未开通'}</p>
                  {user.permissionRequested && !user.canEdit && (
                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-blue-500/20 text-blue-500 border border-blue-500/20">申请开通中</span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                {user.status === 'pending' ? (
                  <button
                    onClick={() => approveUser(user.username)}
                    className="flex items-center gap-2 px-4 py-2 font-medium rounded-lg text-sm hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: draft.theme.textColor, color: draft.theme.backgroundColor }}
                  >
                    <CheckCircle size={16} /> 通过审核
                  </button>
                ) : (
                  <button
                    onClick={() => grantPermission(user.username, !user.canEdit)}
                    className={`flex items-center gap-2 px-4 py-2 font-medium rounded-lg text-sm transition-colors border ${
                      user.canEdit 
                        ? 'bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20'
                        : 'bg-blue-500/10 text-blue-500 border-blue-500/20 hover:bg-blue-500/20'
                    }`}
                  >
                    <Shield size={16} /> {user.canEdit ? '撤销编辑权限' : '开通编辑权限'}
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {Object.keys(users).length <= 1 && (
          <div className="text-center py-20 opacity-40 border border-current/10 border-dashed rounded-2xl">
            暂无其他注册用户
          </div>
        )}
      </div>
    </div>
  );
}