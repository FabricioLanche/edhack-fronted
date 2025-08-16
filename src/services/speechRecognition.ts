// Speech Recognition Service
export interface SpeechRecognitionResult {
  transcript: string;
  confidence: number;
  isFinal: boolean;
}

export interface SpeechRecognitionService {
  startListening: () => Promise<void>;
  stopListening: () => void;
  isListening: boolean;
  isSupported: boolean;
  onResult: (callback: (result: SpeechRecognitionResult) => void) => void;
  onError: (callback: (error: string) => void) => void;
}

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

class WebSpeechRecognitionService implements SpeechRecognitionService {
  private recognition: any = null;
  private resultCallback: ((result: SpeechRecognitionResult) => void) | null = null;
  private errorCallback: ((error: string) => void) | null = null;
  public isListening: boolean = false;
  public isSupported: boolean = false;

  constructor() {
    this.initialize();
  }

  private initialize(): void {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      this.isSupported = true;
      this.recognition = new SpeechRecognition();
      this.setupRecognition();
    } else {
      console.warn('Speech Recognition API no está disponible en este navegador');
    }
  }

  private setupRecognition(): void {
    if (!this.recognition) return;

    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'es-ES'; // Español
    this.recognition.maxAlternatives = 1;

    this.recognition.onstart = () => {
      this.isListening = true;
      console.log('🎤 Reconocimiento de voz iniciado');
    };

    this.recognition.onresult = (event: any) => {
      const results = event.results;
      const lastResult = results[results.length - 1];
      
      if (lastResult && this.resultCallback) {
        const transcript = lastResult[0].transcript;
        const confidence = lastResult[0].confidence || 0.5;
        const isFinal = lastResult.isFinal;

        console.log(`📝 Transcripción: "${transcript}" (Confianza: ${confidence.toFixed(2)})`);
        
        this.resultCallback({
          transcript,
          confidence,
          isFinal
        });
      }
    };

    this.recognition.onerror = (event: any) => {
      const errorMsg = `Error en reconocimiento de voz: ${event.error}`;
      console.error('❌', errorMsg);
      
      if (this.errorCallback) {
        this.errorCallback(errorMsg);
      }
      
      this.isListening = false;
    };

    this.recognition.onend = () => {
      this.isListening = false;
      console.log('🔇 Reconocimiento de voz finalizado');
    };
  }

  public async startListening(): Promise<void> {
    if (!this.isSupported || !this.recognition) {
      throw new Error('Reconocimiento de voz no soportado');
    }

    if (this.isListening) {
      console.warn('El reconocimiento de voz ya está activo');
      return;
    }

    try {
      this.recognition.start();
    } catch (error) {
      console.error('Error al iniciar reconocimiento:', error);
      throw error;
    }
  }

  public stopListening(): void {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
    }
  }

  public onResult(callback: (result: SpeechRecognitionResult) => void): void {
    this.resultCallback = callback;
  }

  public onError(callback: (error: string) => void): void {
    this.errorCallback = callback;
  }
}

// Singleton instance
export const speechRecognitionService = new WebSpeechRecognitionService();