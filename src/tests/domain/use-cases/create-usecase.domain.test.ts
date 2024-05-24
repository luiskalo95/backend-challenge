import { CreateUseCase } from "../../../domain";

class CreateUseCaseDomain extends CreateUseCase {
  execute(dirPath: string): void {
    console.log(`Creating directory at ${dirPath}`);
  }
}

describe("*----- Tests in the create-usecase.domain.ts file ----*", () => {
  let createUseCase: CreateUseCaseDomain;

  beforeEach(() => {
    createUseCase = new CreateUseCaseDomain();
  });

  afterEach(() => {
    createUseCase = null!;
  });

  it("Should call the console.log in createUseCase", () => {
    const consoleLogSpy = jest
      .spyOn(console, "log")
      .mockImplementation(() => {});
    createUseCase.execute("foods");
    expect(consoleLogSpy).toHaveBeenCalledWith(
      "Creating directory at foods"
    );
    consoleLogSpy.mockRestore();
  });
});
