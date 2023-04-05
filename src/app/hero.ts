export interface Hero {
    id: number;
    name: string|null;
    alias: String|null;
    picture: string;
    powers: string[];
    blob: Blob|null;
    description: string|null;

  }