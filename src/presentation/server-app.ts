import { Commands } from "../domain";
import { DbFolderInfrastructure } from "../infrastructure/db.infrastructure";
import {
  CreateFolderUseCase,
  DeleteFolderUseCase,
  ListFolderUseCase,
  MoveFolderUseCase,
} from "../use-cases";

export class ServerApp {
  static async run(command: string): Promise<void> {
    const dbInstance = DbFolderInfrastructure.initiate();
    const [instruction, pathFolder, pathDestination = ""] = command.split(" ");
    switch (instruction) {
      case Commands.CREATE:
        new CreateFolderUseCase(dbInstance).execute(pathFolder);
        break;
      case Commands.DELETE:
        new DeleteFolderUseCase(dbInstance).execute(pathFolder);
        break;
      case Commands.LIST:
        new ListFolderUseCase(dbInstance).execute();
        break;
      case Commands.MOVE:
        new MoveFolderUseCase(dbInstance).execute(pathFolder, pathDestination);
        break;
      case Commands.EXIT: {
        console.log("Closing the program...");
        process.exit(0);
      }
      default:
        console.log("Command not found, try again");
    }
  }
}
