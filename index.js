import chalk from "chalk";
import prompts from "prompts";
import { randomInt } from "node:crypto";
import { writeFileSync, appendFileSync } from "node:fs";

const MAX_ATTEMPTS = 3;
const secretNumber = randomInt(1, 11);
const logFile = "game-output.txt";

let attempts = 0;
let won = false;
let cancelled = false;

writeFileSync(logFile, "");

function output(message, color = chalk.white) {
    console.log(color(message));
    appendFileSync(logFile, message + "\n");
}

output("Guess the Number", chalk.cyan.bold);
output("Guess the secret number between 1 and 10.", chalk.blue);
output(`You have ${MAX_ATTEMPTS} attempts.`, chalk.yellow);
output("Enter whole numbers only.", chalk.yellow);
output("Invalid inputs do not count as attempts.", chalk.yellow);

while (attempts < MAX_ATTEMPTS) {
    const question = `Attempt ${attempts + 1}: Enter a number between 1 and 10:`;

    appendFileSync(logFile, question + "\n");

    const response = await prompts({
        type: "text",
        name: "guess",
        message: question
    });

    if (response.guess === undefined) {
        cancelled = true;
        output("Game cancelled.", chalk.yellow);
        break;
    }

    appendFileSync(logFile, `Your input: ${response.guess}\n`);

    try {
        const input = response.guess.trim();

        if (input === "") {
            throw new Error("Input cannot be empty.");
        }

        const guess = Number(input);

        if (!Number.isInteger(guess)) {
            throw new Error("Enter a whole number. Letters and decimals are not allowed.");
        }

        if (guess <= 0) {
            throw new Error("Your number must be greater than zero.");
        }

        if (guess > 10) {
            throw new Error("Your number cannot be greater than 10.");
        }

        attempts++;

        if (guess === secretNumber) {
            won = true;
            output(`You win! The secret number was ${secretNumber}.`, chalk.green);
            break;
        } else if (guess < secretNumber) {
            output("Too low!", chalk.blue);
        } else {
            output("Too high!", chalk.blue);
        }

        output(`Attempts remaining: ${MAX_ATTEMPTS - attempts}`, chalk.yellow);
    } catch (error) {
        output(error.message, chalk.red);
    }
}

if (!won && !cancelled) {
    output(
        `You ran out of attempts! The secret number was ${secretNumber}.`,
        chalk.magenta
    );
}

output(`Game output saved to ${logFile}.`, chalk.cyan);