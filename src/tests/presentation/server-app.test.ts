import {
  CreateFolderUseCase,
  DeleteFolderUseCase,
  ListFolderUseCase,
  MoveFolderUseCase,
} from "../../use-cases";
import { DbFolderInfrastructure } from "../../infrastructure/db.infrastructure";
import { Commands } from "../../domain";
import { ServerApp } from "../../presentation/server-app";

jest.mock("../../infrastructure/db.infrastructure", () => ({
  DbFolderInfrastructure: {
    initiate: jest.fn(),
  },
}));

jest.mock("../../use-cases");

describe("*----- Tests in the server-app file ----*", () => {
  let dbInstanceMock: any;

  beforeEach(() => {
    dbInstanceMock = {};
    (DbFolderInfrastructure.initiate as jest.Mock).mockReturnValue(
      dbInstanceMock
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should run CREATE command", async () => {
    const pathFolder = "grains/squash";
    await ServerApp.run(`${Commands.CREATE} ${pathFolder}`);
    expect(CreateFolderUseCase).toHaveBeenCalledWith(dbInstanceMock);
    expect(CreateFolderUseCase.prototype.execute).toHaveBeenCalledWith(
      pathFolder
    );
  });

  it("Should run DELETE command", async () => {
    const pathFolder = "foods/fruits/apples";
    await ServerApp.run(`${Commands.DELETE} ${pathFolder}`);
    expect(DeleteFolderUseCase).toHaveBeenCalledWith(dbInstanceMock);
    expect(DeleteFolderUseCase.prototype.execute).toHaveBeenCalledWith(
      pathFolder
    );
  });

  it("Should run LIST command", async () => {
    await ServerApp.run(Commands.LIST);
    expect(ListFolderUseCase).toHaveBeenCalledWith(dbInstanceMock);
    expect(ListFolderUseCase.prototype.execute).toHaveBeenCalled();
  });

  it("Should run MOVE command", async () => {
    const dirPath = "grains/squash";
    const newPath = "vegetables";
    await ServerApp.run(`${Commands.MOVE} ${dirPath} ${newPath}`);
    expect(MoveFolderUseCase).toHaveBeenCalledWith(dbInstanceMock);
    expect(MoveFolderUseCase.prototype.execute).toHaveBeenCalledWith(
      dirPath,
      newPath
    );
  });

  it("Should exit the program", async () => {
    const exitSpy = jest
      .spyOn(process, "exit")
      .mockImplementation(() => undefined as never);
    await ServerApp.run(Commands.EXIT);
    expect(exitSpy).toHaveBeenCalledWith(0);
  });

  it("should handle unknown command", async () => {
    const consoleLogSpy = jest
      .spyOn(console, "log")
      .mockImplementation(() => {});
    await ServerApp.run("WHATEVER");
    expect(consoleLogSpy).toHaveBeenCalledWith("Command not found, try again");
  });
});
