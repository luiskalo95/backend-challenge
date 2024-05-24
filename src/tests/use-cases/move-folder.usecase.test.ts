import { MoveFolderUseCase } from "../../use-cases";
import { DbFolder } from "../../domain";

class DbFolderMock implements DbFolder {
  dbFolder = {};
  move = jest.fn();
  create = jest.fn();
  list = jest.fn();
  delete = jest.fn();
}

describe("*----- Tests in the move-folder.usecase file ----*", () => {
  let dbMock: DbFolderMock;
  let moveFolderUseCase: MoveFolderUseCase;

  beforeEach(() => {
    dbMock = new DbFolderMock();
    moveFolderUseCase = new MoveFolderUseCase(dbMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should call db.move with correct arguments", () => {
    const dirPath = "grains/squash";
    const newPath = "vegetables";
    moveFolderUseCase.execute(dirPath, newPath);
    expect(dbMock.move).toHaveBeenCalledWith(dirPath, newPath);
  });
});
