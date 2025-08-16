// interfaces/index.ts - Interfaces completas actualizadas

// Navigation Types
export type RouteType = 
  | 'home' 
  | 'student-auth' 
  | 'teacher-auth' 
  | 'teacher-biometric'
  | 'teacher-voice-setup'
  | 'teacher-dashboard'
  | 'student-detail'
  | 'text-templates'
  | 'biometric-login' 
  | 'voice-registration' 
  | 'levels';

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

// User Types
export type UserType = 'student' | 'teacher';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  type: UserType;
  hasAccount: boolean;
  biometricData?: string; // Base64 encoded image
  voiceProfile?: string;
  createdAt: Date;
}

export interface TeacherProfile extends UserProfile {
  type: 'teacher';
  className: string;
  classDescription: string;
  voiceSetup: boolean;
  avatar: string;
}

export interface StudentProgress {
  id: string;
  name: string;
  avatar: string;
  currentLevel: 'inicial' | 'empezando' | 'logrado';
  overallStats: {
    argumentative: number; // 0-100
    narrative: number;
    descriptive: number;
  };
  activities: ActivityResult[];
  joinedDate: string;
}

export interface ActivityResult {
  id: string;
  activityNumber: number;
  textType: 'argumentative' | 'narrative' | 'descriptive';
  score: number;
  date: string;
  chatTranscript: ChatMessage[];
  timeSpent: number; // in minutes
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  message: string;
  timestamp: string;
}

export interface TextTemplate {
  id: string;
  level: 'inicial' | 'empezando' | 'logrado';
  textType: 'argumentative' | 'narrative' | 'descriptive';
  content: string;
  title: string;
  isGenerated: boolean; // true if AI generated, false if teacher created
  createdAt: string;
  updatedAt: string;
  questions?: string[]; // Preguntas asociadas al texto
}

export interface TeacherDashboardStats {
  totalStudents: number;
  averageProgress: number;
  activeStudents: number;
  completedActivities: number;
  levelDistribution: {
    inicial: number;
    empezando: number;
    logrado: number;
  };
  textTypePerformance: {
    argumentative: number;
    narrative: number;
    descriptive: number;
  };
}

// Speech Recognition Types
export interface SpeechRecognitionResult {
  transcript: string;
  confidence: number;
  isFinal: boolean;
}

// Camera Types
export interface CameraProps {
  onCapture: (imageData: string) => void;
  onError?: (error: string) => void;
  className?: string;
}

// Level Types (for student progress)
export interface Level {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  isUnlocked: boolean;
  progress: number; // 0-100
  icon: string;
}

// Context Types
export interface NavigationContextType {
  currentRoute: RouteType;
  navigate: NavigateFunction;
  goBack: () => void;
  canGoBack: boolean;
}

export interface UserContextType {
  currentUser: UserProfile | null;
  userType: UserType | null;
  setUser: (user: UserProfile) => void;
  setUserType: (type: UserType) => void;
  logout: () => void;
  hasAccount: boolean;
  setHasAccount: (hasAccount: boolean) => void;
}

// Event Handler Types
export type ChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => void;
export type SubmitHandler = (e: React.FormEvent<HTMLFormElement>) => void;
export type ClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => void;