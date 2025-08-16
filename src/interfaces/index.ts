// Navigation Types
export type RouteType = 'home' | 'student-auth' | 'teacher-auth' | 'biometric-login' | 'voice-registration' | 'levels';

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