import { DbFolder, MoveUseCase } from "../domain";

export class MoveFolderUseCase implements MoveUseCase {
  public db: DbFolder;

  constructor(db: DbFolder) {
    this.db = db;
  }

  execute(dirPath: string, newPath: string): void {
    return this.db.move(dirPath, newPath);
  }
}
