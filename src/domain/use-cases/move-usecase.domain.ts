export abstract class MoveUseCase {
    abstract execute(sourcePath: string, destinationPath: string): void;
  }
  