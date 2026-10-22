import chalk from "chalk";
import prompts from "prompts";
import { randomInt } from "node:crypto";

const MAX_ATTEMPTS = 3;
const secretNumber = randomInt(1, 11);

console.log(chalk.cyan.bold("Guess the Number"));
console.log(chalk.blue("Guess the secret number between 1 and 10."));
console.log(chalk.yellow(`You have ${MAX_ATTEMPTS} attempts.`));
console.log(chalk.yellow("Enter whole numbers only."));

const response = await prompts({
    type: "text",
    name: "guess",
    message: "Enter a number between 1 and 10:"
});

console.log(chalk.blue(`Your guess: ${response.guess}`));