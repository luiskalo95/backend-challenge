import { DbFolder, CreateUseCase } from "../domain";

export class CreateFolderUseCase implements CreateUseCase {
  public db: DbFolder;

  constructor(db: DbFolder) {
    this.db = db;
  }

  execute(dirPath: string): void {
    return this.db.create(dirPath);
  }
}
