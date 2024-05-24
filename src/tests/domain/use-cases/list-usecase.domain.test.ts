import { ListUseCase } from "../../../domain";

class ListUseCaseDomain extends ListUseCase {
  execute(): void {
    console.log(`Listing tree directories`);
  }
}

describe("*----- Tests in the list-usecase.domain.ts file ----*", () => {
  let listUseCase: ListUseCaseDomain;

  beforeEach(() => {
    listUseCase = new ListUseCaseDomain();
  });

  afterEach(() => {
    listUseCase = null!;
  });

  it("Should call the console.log in listUseCase", () => {
    const consoleLogSpy = jest
      .spyOn(console, "log")
      .mockImplementation(() => {});
    listUseCase.execute();
    expect(consoleLogSpy).toHaveBeenCalledWith("Listing tree directories");
    consoleLogSpy.mockRestore();
  });
});
