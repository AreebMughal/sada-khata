export interface InitialState {
    error?: string | null;
    status: 'idle' | 'loading' |'succeeded' | 'failed';
    user: any | null;
  }