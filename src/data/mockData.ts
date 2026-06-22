export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  link: string;
}

export interface Profile {
  name: string;
  avatarUrl: string;
  role: string;
  headline: string;
  bio: string;
  skills: string[];
  socials: {
    github: string;
    twitter: string;
    linkedin: string;
    email: string;
  };
}

export const profileData: Profile = {
  name: "张三",
  avatarUrl: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Minimalist%20sleek%20avatar%203D%20render%20boy%20glassmorphism%20portrait&image_size=square",
  role: "前端开发工程师 / 独立设计师",
  headline: "创造令人惊叹的数字体验。",
  bio: "我是一名充满激情的开发者，致力于构建兼具美感与性能的现代 Web 应用。通过对细节的极致追求，将复杂的业务逻辑转化为简单、直观的用户体验。我相信代码不仅是工具，更是表达创意的艺术。",
  skills: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Node.js", "UI/UX Design"],
  socials: {
    github: "https://github.com",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    email: "mailto:hello@example.com",
  },
};

export const projectsData: Project[] = [
  {
    id: "project-1",
    title: "Pro Creator",
    subtitle: "生产力工具的新标杆",
    description: "一款专为创作者设计的全功能管理平台，结合极致的交互设计与强大的数据处理能力，让工作流程如丝般顺滑。",
    imageUrl: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Minimalist%20sleek%20dashboard%20interface%20on%20dark%20background%2C%20Apple%20style%20design%2C%20high%20quality%20UI%20mockup&image_size=landscape_16_9",
    link: "#",
  },
  {
    id: "project-2",
    title: "Vision AR",
    subtitle: "突破现实的边界",
    description: "利用最前沿的 WebAR 技术，在浏览器中即可获得沉浸式的增强现实体验。打破屏幕限制，让数字内容触手可及。",
    imageUrl: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Futuristic%20AR%20interface%20floating%20in%20dark%20void%2C%20glassmorphism%2C%20sleek%20apple%20vision%20pro%20style&image_size=landscape_16_9",
    link: "#",
  },
  {
    id: "project-3",
    title: "Aura Sound",
    subtitle: "倾听纯粹之美",
    description: "高保真音频播放器的 Web 客户端。采用深色拟物化与现代极简主义融合的设计语言，带来视觉与听觉的双重享受。",
    imageUrl: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Minimalist%20music%20player%20interface%20app%20dark%20mode%2C%20subtle%20glow%20effects%2C%20premium%20design&image_size=landscape_16_9",
    link: "#",
  }
];

export interface ThemeConfig {
  backgroundColor: string;
  textColor: string;
  cardBgColor: string;
  accentColor: string;
}

export interface LayoutSection {
  id: string;
  name: string;
  visible: boolean;
}

export interface LayoutConfig {
  sections: LayoutSection[];
}

export const defaultTheme: ThemeConfig = {
  backgroundColor: "#000000",
  textColor: "#ffffff",
  cardBgColor: "rgba(255, 255, 255, 0.02)",
  accentColor: "#ffffff"
};

export const defaultLayout: LayoutConfig = {
  sections: [
    { id: "hero", name: "首屏介绍 (Hero)", visible: true },
    { id: "about", name: "关于我 (About)", visible: true },
    { id: "projects", name: "项目作品 (Projects)", visible: true }
  ]
};
