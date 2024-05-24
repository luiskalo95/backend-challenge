import { ListFolderUseCase } from "../../use-cases";
import { DbFolder } from "../../domain";

class DbFolderMock implements DbFolder {
  dbFolder = {};
  move = jest.fn();
  create = jest.fn();
  list = jest.fn();
  delete = jest.fn();
}

describe("*----- Tests in the list-folder.usecase file ----*", () => {
  let dbMock: DbFolderMock;
  let listFolderUseCase: ListFolderUseCase;

  beforeEach(() => {
    dbMock = new DbFolderMock();
    listFolderUseCase = new ListFolderUseCase(dbMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should call db.list with correct arguments", () => {
    listFolderUseCase.execute();
    expect(dbMock.list).toHaveBeenCalled();
  });
});
