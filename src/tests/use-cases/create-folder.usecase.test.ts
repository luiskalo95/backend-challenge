import { CreateFolderUseCase } from "../../use-cases";
import { DbFolder } from "../../domain";

class DbFolderMock implements DbFolder {
  dbFolder = {};
  move = jest.fn();
  create = jest.fn();
  list = jest.fn();
  delete = jest.fn();
}

describe("*----- Tests in the create-folder.usecase file ----*", () => {
  let dbMock: DbFolderMock;
  let createFolderUseCase: CreateFolderUseCase;

  beforeEach(() => {
    dbMock = new DbFolderMock();
    createFolderUseCase = new CreateFolderUseCase(dbMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should call db.move with correct arguments", () => {
    const dirPath = "grains/squash";
    createFolderUseCase.execute(dirPath);
    expect(dbMock.create).toHaveBeenCalledWith(dirPath);
  });
});
