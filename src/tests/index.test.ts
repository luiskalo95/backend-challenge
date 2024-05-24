import readline from "readline";
import { bootstrap } from "../index";
import { ServerApp } from "../presentation/server-app";

jest.mock("readline", () => ({
  createInterface: jest.fn().mockReturnValue({
    on: jest.fn(),
    close: jest.fn(),
  }),
}));


jest.mock("../presentation/server-app.ts", () => ({
  ServerApp: {
    run: jest.fn(),
  },
}));

describe("*----- Tests in the index.ts file ----*", () => {
  let rlMock: any;

  beforeEach(() => {
    rlMock = {
      on: jest.fn(),
      close: jest.fn(),
    };
    (readline.createInterface as jest.Mock).mockReturnValue(rlMock);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("Should initialize readline interface and set up event listeners", () => {
    bootstrap();
    expect(readline.createInterface).toHaveBeenCalledWith({
      input: process.stdin,
      output: process.stdout,
      prompt: "",
    });
    expect(rlMock.on).toHaveBeenCalledWith("line", expect.any(Function));
    expect(rlMock.on).toHaveBeenCalledWith("close", expect.any(Function));
  });

  it('Should call ServerApp.run with trimmed command on "line" event', async () => {
    bootstrap();
    const lineEventHandler = rlMock.on.mock.calls.find(
      (call: any) => call[0] === "line"
    )[1];
    await lineEventHandler("  CREATE  ");
    expect(ServerApp.run).toHaveBeenCalledWith("CREATE");
  });

  it('Should log message and exit process on "close" event', () => {
    const exitSpy = jest.spyOn(process, 'exit').mockImplementation(() => undefined as never);
    bootstrap();
    const closeEventHandler = rlMock.on.mock.calls.find(
      (call: any) => call[0] === "close"
    )[1];
    closeEventHandler();
    expect(exitSpy).toHaveBeenCalledWith(1);
    exitSpy.mockRestore();
  });
});
