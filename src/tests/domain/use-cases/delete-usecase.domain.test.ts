import { DeleteUseCase } from "../../../domain";

class DeleteUseCaseDomain extends DeleteUseCase {
  execute(dirPath: string): void {
    console.log(`Deleting directory at ${dirPath}`);
  }
}

describe("*----- Tests in the delete-usecase.domain.ts file ----*", () => {
  let deleteUseCase: DeleteUseCaseDomain;

  beforeEach(() => {
    deleteUseCase = new DeleteUseCaseDomain();
  });

  afterEach(() => {
    deleteUseCase = null!;
  });

  it("Should call the console.log in deleteUseCase", () => {
    const consoleLogSpy = jest
      .spyOn(console, "log")
      .mockImplementation(() => {});
    deleteUseCase.execute("foods");
    expect(consoleLogSpy).toHaveBeenCalledWith(
      "Deleting directory at foods"
    );
    consoleLogSpy.mockRestore();
  });
});
