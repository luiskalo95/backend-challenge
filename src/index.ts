import readline from "readline";
import { ServerApp } from "./presentation/server-app";

export function bootstrap() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "",
  });

  console.log(
    "--- Now you can type the instructions ``CREATE DELETE MOVE LIST EXIT`` ---"
  );

  rl.on("line", function (command) {
    const commandTrimmed = command.trim();
    ServerApp.run(commandTrimmed);
  });

  rl.on("close", () => {
    console.log("Program has been closed");
    process.exit(1);
  });
}

(() => {
  bootstrap();
})();
