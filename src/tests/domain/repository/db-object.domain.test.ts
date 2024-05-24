import { DbFolder } from "../../../domain";

class DbFolderImplementation implements DbFolder {
  dbFolder: object = {};

  public create(dirPath: string): void {
    console.log(`Creating directory at ${dirPath}`);
  }

  public list(): void {
    console.log("Listing directories");
  }

  public delete(dirPath: string): void {
    console.log(`Deleting directory at ${dirPath}`);
  }

  public move(dirPath: string, newPath: string): void {
    console.log(`Moving directory from ${dirPath} to ${newPath}`);
  }
}

describe("*----- Tests in the db.object.domain.ts file ----*", () => {
  let dbFolder: DbFolderImplementation;

  beforeEach(() => {
    dbFolder = new DbFolderImplementation();
  });

  afterEach(() => {
    dbFolder = null!;
  });

  it("Should create directory", () => {
    const consoleLogSpy = jest
      .spyOn(console, "log")
      .mockImplementation(() => {});
    dbFolder.create("grains/squash");
    expect(consoleLogSpy).toHaveBeenCalledWith(
      "Creating directory at grains/squash"
    );
    consoleLogSpy.mockRestore();
  });

   it("Should list directories", () => {
    const consoleLogSpy = jest
      .spyOn(console, "log")
      .mockImplementation(() => {});
    dbFolder.list();
    expect(consoleLogSpy).toHaveBeenCalledWith("Listing directories");
    consoleLogSpy.mockRestore();
  });

 it("Should delete directory", () => {
    const consoleLogSpy = jest
      .spyOn(console, "log")
      .mockImplementation(() => {});
    dbFolder.delete("fruits/apples");
    expect(consoleLogSpy).toHaveBeenCalledWith(
      "Deleting directory at fruits/apples"
    );
    consoleLogSpy.mockRestore();
  });

  it("Should move directory", () => {
    const consoleLogSpy = jest
      .spyOn(console, "log")
      .mockImplementation(() => {});
    dbFolder.move("vegetables", "foods");
    expect(consoleLogSpy).toHaveBeenCalledWith(
      "Moving directory from vegetables to foods"
    );
    consoleLogSpy.mockRestore();
  });
});
