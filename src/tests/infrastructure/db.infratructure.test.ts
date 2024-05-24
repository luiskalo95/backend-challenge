import { DbFolderInfrastructure } from "../../infrastructure/db.infrastructure";

describe("*----- Tests in the db.infrastructure file ----*", () => {
  let dbFolderInfrastructure: DbFolderInfrastructure;

  beforeEach(() => {
    dbFolderInfrastructure = new DbFolderInfrastructure();
  });

  afterEach(() => {
    dbFolderInfrastructure = null!;
  });

  it("Should create directories", () => {
    dbFolderInfrastructure.create("fruits/apples/fuji");
    expect(dbFolderInfrastructure.dbFolder).toStrictEqual({
      fruits: {
        apples: {
          fuji: {},
        },
      },
    });
  });

  it("should delete directories", () => {
    dbFolderInfrastructure.dbFolder = {
      fruits: {
        apples: {
          fuji: {},
        },
      },
    };
    dbFolderInfrastructure.delete("fruits/apples/fuji");
    expect(dbFolderInfrastructure.dbFolder).toEqual({
      fruits: {
        apples: {},
      },
    });
  });

  it("should list directories", () => {
    const consoleLogSpy = jest
      .spyOn(console, "log")
      .mockImplementation(() => {});
    dbFolderInfrastructure.dbFolder = {
      fruits: {
        apples: {
          fuji: {},
        },
      },
      vegetables: {},
      cars: {
        mazda: {},
      },
    };
    dbFolderInfrastructure.list();
    expect(consoleLogSpy).toHaveBeenCalledWith("fruits");
    expect(consoleLogSpy).toHaveBeenCalledWith("  apples");
    expect(consoleLogSpy).toHaveBeenCalledWith("    fuji");
    expect(consoleLogSpy).toHaveBeenCalledWith("vegetables");
    expect(consoleLogSpy).toHaveBeenCalledWith("cars");
    expect(consoleLogSpy).toHaveBeenCalledWith("  mazda");
    consoleLogSpy.mockRestore();
  });

  it("should move directories", () => {
    dbFolderInfrastructure.dbFolder = {
      fruits: {
        apples: {
          fuji: {},
        },
      },
    };
    dbFolderInfrastructure.move("fruits/apples/fuji", "vegetables");
    expect(dbFolderInfrastructure.dbFolder).toEqual({
      fruits: {
        apples: {},
      },
      vegetables: {
        fuji: {},
      },
    });
  });
});
