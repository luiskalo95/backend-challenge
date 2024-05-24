import { MoveUseCase } from "../../../domain";

class MoveUseCaseDomain extends MoveUseCase {
  execute(dirPath: string, newPath: string): void {
    console.log(`Moving from ${dirPath} to ${newPath}`);
  }
}

describe("*----- Tests in the move-usecase.domain.ts file ----*", () => {
  let moveUseCase: MoveUseCaseDomain;

  beforeEach(() => {
    moveUseCase = new MoveUseCaseDomain();
  });

  afterEach(() => {
    moveUseCase = null!;
  });

  it("Should call the console.log in moveUseCase", () => {
    const consoleLogSpy = jest
      .spyOn(console, "log")
      .mockImplementation(() => {});
    const dirPath = "grains/squash";
    const newPath = "vegetables";
    moveUseCase.execute(dirPath, newPath);
    expect(consoleLogSpy).toHaveBeenCalledWith("Moving from grains/squash to vegetables");
    consoleLogSpy.mockRestore();
  });
});
