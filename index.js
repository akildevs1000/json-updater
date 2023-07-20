import inquirer from "inquirer";
import fs from "fs";
import { exec } from "child_process";

const jsonData = fs.readFileSync("appsettings.json");
const data = JSON.parse(jsonData);

const questions = [
  {
    type: "input",
    name: "ip",
    message: "Enter your local IP",
    default: "127.0.0.1",
  },
  {
    type: "input",
    name: "server_name",
    message: "Enter your local Server Name",
    default: "your_server_name",
  },
  {
    type: "input",
    name: "user_name",
    message: "Enter your local User Name",
    default: "your_user_name",
  },
  {
    type: "input",
    name: "password",
    message: "Enter your local Password",
    default: "your_user_password",
  },
];
inquirer
  .prompt(questions)
  .then((answers) => {
    console.log("\n");

    console.log(answers.ip);
    // console.log(answers.server_name);
    // console.log(answers.user_name);
    // console.log(answers.password);

    exec("node updater.js " + answers.ip, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    });

    console.log("\nPress CTRL + c to close.");

    while (true) {}
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
