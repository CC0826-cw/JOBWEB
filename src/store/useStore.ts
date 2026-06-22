import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { profileData, projectsData, Profile, Project, ThemeConfig, LayoutConfig, defaultTheme, defaultLayout } from '@/data/mockData';

export interface SiteData {
  profile: Profile;
  projects: Project[];
  theme: ThemeConfig;
  layout: LayoutConfig;
}

export interface UserAccount {
  username: string;
  password: string; 
  role: 'superadmin' | 'user';
  status: 'approved' | 'pending';
  canEdit: boolean;
  permissionRequested?: boolean;
  published: SiteData;
  draft: SiteData;
}

interface AppState {
  users: Record<string, UserAccount>;
  currentUser: string | null;

  login: (username: string, password: string) => 'success' | 'invalid' | 'pending';
  register: (username: string, password: string) => 'success' | 'exists';
  logout: () => void;

  approveUser: (username: string) => void;
  grantPermission: (username: string, canEdit: boolean) => void;
  requestPermission: (username: string) => void;
  deleteUser: (username: string) => void;

  updateDraftProfile: (profile: Partial<Profile>) => void;
  updateDraftSocials: (socials: Partial<Profile['socials']>) => void;
  updateDraftProject: (id: string, project: Partial<Project>) => void;
  addDraftProject: (project: Project) => void;
  removeDraftProject: (id: string) => void;
  updateDraftTheme: (theme: Partial<ThemeConfig>) => void;
  updateDraftLayout: (layout: LayoutConfig) => void;
  
  publishChanges: () => void;
}

const defaultSiteData: SiteData = {
  profile: profileData,
  projects: projectsData,
  theme: defaultTheme,
  layout: defaultLayout
};

const initialSuperAdmin: UserAccount = {
  username: 'user',
  password: '112233',
  role: 'superadmin',
  status: 'approved',
  canEdit: true,
  published: JSON.parse(JSON.stringify(defaultSiteData)),
  draft: JSON.parse(JSON.stringify(defaultSiteData)),
};

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      users: {
        'user': initialSuperAdmin
      },
      currentUser: null,

      login: (username, password) => {
        const user = get().users[username];
        if (!user || user.password !== password) return 'invalid';
        if (user.status === 'pending') return 'pending';
        set({ currentUser: username });
        return 'success';
      },
      register: (username, password) => {
        if (get().users[username]) return 'exists';
        set((state) => ({
          users: {
            ...state.users,
            [username]: {
              username,
              password,
              role: 'user',
              status: 'pending',
              canEdit: false,
              published: JSON.parse(JSON.stringify(defaultSiteData)),
              draft: JSON.parse(JSON.stringify(defaultSiteData))
            }
          }
        }));
        return 'success';
      },
      logout: () => set({ currentUser: null }),
      
      approveUser: (username) => set((state) => ({
        users: {
          ...state.users,
          [username]: { ...state.users[username], status: 'approved' }
        }
      })),
      grantPermission: (username, canEdit) => set((state) => ({
        users: {
          ...state.users,
          [username]: { ...state.users[username], canEdit, permissionRequested: false }
        }
      })),
      requestPermission: (username) => set((state) => ({
        users: {
          ...state.users,
          [username]: { ...state.users[username], permissionRequested: true }
        }
      })),
      deleteUser: (username) => set((state) => {
        const newUsers = { ...state.users };
        delete newUsers[username];
        return { users: newUsers };
      }),

      updateDraftProfile: (newProfile) => set((state) => {
        const username = state.currentUser;
        if (!username) return state;
        const user = state.users[username];
        return { 
          users: { 
            ...state.users, 
            [username]: { 
              ...user, 
              draft: { ...user.draft, profile: { ...user.draft.profile, ...newProfile } } 
            } 
          } 
        };
      }),
      updateDraftSocials: (newSocials) => set((state) => {
        const username = state.currentUser;
        if (!username) return state;
        const user = state.users[username];
        return { 
          users: { 
            ...state.users, 
            [username]: { 
              ...user, 
              draft: { ...user.draft, profile: { ...user.draft.profile, socials: { ...user.draft.profile.socials, ...newSocials } } } 
            } 
          } 
        };
      }),
      updateDraftProject: (id, updatedProject) => set((state) => {
        const username = state.currentUser;
        if (!username) return state;
        const user = state.users[username];
        return { 
          users: { 
            ...state.users, 
            [username]: { 
              ...user, 
              draft: { ...user.draft, projects: user.draft.projects.map((p) => p.id === id ? { ...p, ...updatedProject } : p) } 
            } 
          } 
        };
      }),
      addDraftProject: (project) => set((state) => {
        const username = state.currentUser;
        if (!username) return state;
        const user = state.users[username];
        return { 
          users: { 
            ...state.users, 
            [username]: { 
              ...user, 
              draft: { ...user.draft, projects: [...user.draft.projects, project] } 
            } 
          } 
        };
      }),
      removeDraftProject: (id) => set((state) => {
        const username = state.currentUser;
        if (!username) return state;
        const user = state.users[username];
        return { 
          users: { 
            ...state.users, 
            [username]: { 
              ...user, 
              draft: { ...user.draft, projects: user.draft.projects.filter((p) => p.id !== id) } 
            } 
          } 
        };
      }),
      updateDraftTheme: (theme) => set((state) => {
        const username = state.currentUser;
        if (!username) return state;
        const user = state.users[username];
        return { 
          users: { 
            ...state.users, 
            [username]: { 
              ...user, 
              draft: { ...user.draft, theme: { ...user.draft.theme, ...theme } } 
            } 
          } 
        };
      }),
      updateDraftLayout: (layout) => set((state) => {
        const username = state.currentUser;
        if (!username) return state;
        const user = state.users[username];
        return { 
          users: { 
            ...state.users, 
            [username]: { 
              ...user, 
              draft: { ...user.draft, layout } 
            } 
          } 
        };
      }),
      
      publishChanges: () => set((state) => {
        const username = state.currentUser;
        if (!username) return state;
        const user = state.users[username];
        return { 
          users: { 
            ...state.users, 
            [username]: { 
              ...user, 
              published: JSON.parse(JSON.stringify(user.draft)) 
            } 
          } 
        };
      }),
    }),
    {
      name: 'portfolio-storage-v3', // 更换 key
    }
  )
);
