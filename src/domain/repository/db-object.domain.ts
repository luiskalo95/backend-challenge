export abstract class DbFolder {
  abstract dbFolder: object;
  abstract create: (dirPath: string) => void;
  abstract list: () => void;
  abstract delete: (dirPath: string) => void;
  abstract move: (dirPath: string, newPath: string) => void;
}
