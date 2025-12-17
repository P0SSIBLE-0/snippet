
export interface Snippet {
  _id: string;
  title: string;
  content: string;
  language: string;
  isPublic: boolean;
  tags?: string[];
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface SnippetState {
  snippets: Snippet[];
  currentSnippet: Snippet | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  userId: string | null;
  error: string | null;
}

export type NewSnippet = Omit<Snippet, '_id' | 'userId' | 'createdAt' | 'updatedAt'>;