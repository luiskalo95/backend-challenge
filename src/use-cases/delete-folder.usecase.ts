import { DbFolder, DeleteUseCase } from "../domain";

export class DeleteFolderUseCase implements DeleteUseCase {
  public db: DbFolder;

  constructor(db: DbFolder) {
    this.db = db;
  }

  execute(dirPath: string): void {
    return this.db.delete(dirPath);
  }
}
