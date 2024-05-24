import { DbFolder, Directory } from "../domain";

export class DbFolderInfrastructure implements DbFolder {
  static instance: DbFolderInfrastructure | null = null;
  public dbFolder: Directory;

  constructor() {
    this.dbFolder = {};
  }

  static initiate(): DbFolderInfrastructure {
    if (!this.instance) {
      this.instance = new DbFolderInfrastructure();
      return this.instance;
    }
    return this.instance;
  }

  public create(dirPath: string): void {
    let dbFolderReference = this.dbFolder;
    const parts = dirPath.split("/");
    parts.forEach((part) => {
      if (!dbFolderReference[part]) {
        dbFolderReference[part] = {};
      }
      dbFolderReference = dbFolderReference[part] as Directory;
    });
  }

  public delete(dirPath: string): void {
    let dbFolderReference = this.dbFolder;
    const parts = dirPath.split("/");
    const dirName = parts.pop() as string;
    parts.forEach((part) => {
      if (!dbFolderReference[part]) {
        console.log(
          `Cannot delete ${dirPath} - ${parts.join("/")} does not exist`
        );
        return;
      }
      dbFolderReference = dbFolderReference[part] as Directory;
    });
    delete dbFolderReference[dirName];
  }

  public list(current = this.dbFolder, indent = ""): void {
    Object.keys(current)
      .sort()
      .forEach((key) => {
        console.log(indent + key);
        this.list(current[key], indent + "  ");
      });
  }

  public move(oldPath: string, newPath: string): void {
    const sourceParts = oldPath.split("/");
    const destParts = newPath.split("/");
    const sourceName = sourceParts.pop() as string;
    let dbFolderReference = this.dbFolder;
    for (const part of sourceParts) {
      if (!dbFolderReference[part]) {
        console.log(
          `Cannot move ${oldPath} - ${sourceParts.join("/")} does not exist`
        );
        return;
      }
      dbFolderReference = dbFolderReference[part] as Directory;
    }
    const sourceDir = dbFolderReference[sourceName];
    delete dbFolderReference[sourceName];

    let destParent = this.dbFolder;
    for (const part of destParts) {
      if (!destParent[part]) {
        destParent[part] = {};
      }
      destParent = destParent[part] as Directory;
    }
    destParent[sourceName] = sourceDir;
  }
}
