import { DbFolder, ListUseCase } from "../domain";

export class ListFolderUseCase implements ListUseCase {
  public db: DbFolder;

  constructor(db: DbFolder) {
    this.db = db;
  }

  execute(): void {
    return this.db.list();
  }
}
