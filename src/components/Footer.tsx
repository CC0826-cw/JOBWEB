import { useStore } from "@/store/useStore";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentUser = useStore(state => state.currentUser);
  const users = useStore(state => state.users);
  const { profile } = useStore(state => state.users[currentUser!]!.published);
  const currentYear = new Date().getFullYear();

  const isSuperAdmin = currentUser && users[currentUser]?.role === 'superadmin';

  return (
    <footer id="contact" className="border-t border-white/10 pt-20 pb-10" style={{ backgroundColor: 'inherit' }}>
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              开启下一个<br />伟大的项目。
            </h2>
            <a 
              href={profile.socials.email}
              className="text-xl md:text-2xl opacity-60 hover:opacity-100 transition-opacity border-b border-current/20 hover:border-current pb-1"
            >
              {profile.socials.email.replace('mailto:', '')}
            </a>
          </div>
          
          <div className="flex flex-col md:items-end justify-end space-y-4">
            {Object.entries(profile.socials).map(([platform, link]) => (
              platform !== 'email' && (
                <a 
                  key={platform}
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-lg opacity-60 hover:opacity-100 transition-opacity capitalize"
                >
                  {platform}
                </a>
              )
            ))}
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-current/10 text-sm opacity-40">
          <p>© {currentYear} {profile.name}. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-2 md:mt-0">
            <p>Designed & Built with passion.</p>
            {currentUser && (
              <>
                <span className="w-px h-3 bg-current/40"></span>
                <Link to="/admin" className="hover:opacity-100 hover:underline transition-opacity">
                  管理后台入口
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
