import { DeleteFolderUseCase } from "../../use-cases";
import { DbFolder } from "../../domain";

class DbFolderMock implements DbFolder {
  dbFolder = {};
  move = jest.fn();
  create = jest.fn();
  list = jest.fn();
  delete = jest.fn();
}

describe("*----- Tests in the delete-folder.usecase file ----*", () => {
  let dbMock: DbFolderMock;
  let deleteFolderUseCase: DeleteFolderUseCase;

  beforeEach(() => {
    dbMock = new DbFolderMock();
    deleteFolderUseCase = new DeleteFolderUseCase(dbMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should call db.delete with correct arguments", () => {
    deleteFolderUseCase.execute('fruits/apples');
    expect(dbMock.delete).toHaveBeenCalled();
  });
});
