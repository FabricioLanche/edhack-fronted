// Navigation Types
export type RouteType = 'login' | 'home';

// Component Props Types
export interface NavigateFunction {
  (route: RouteType): void;
}

// Button Types
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

// Screen Props
export interface ScreenProps {
  navigate: NavigateFunction;
}

// Form Types
export interface LoginFormData {
  email: string;
  password: string;
}

// Tab Types
export type TabId = 'dashboard' | 'projects' | 'team' | 'analytics' | 'settings';

export interface Tab {
  id: TabId;
  label: string;
  icon: string;
}

// Data Types
export interface Project {
  id: string;
  name: string;
  lastUpdate: number;
  status: 'active' | 'inactive' | 'completed';
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
}

export interface MetricData {
  id: string;
  title: string;
  value: number;
  change: number;
  icon: string;
  trend: 'up' | 'down' | 'stable';
}

// Context Types
export interface NavigationContextType {
  currentRoute: RouteType;
  navigate: NavigateFunction;
  goBack: () => void;
  canGoBack: boolean;
}

// Event Handler Types
export type ChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => void;
export type SubmitHandler = (e: React.FormEvent<HTMLFormElement>) => void;
export type ClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => void;