const { exec } = require('child_process');
const { readFileSync } = require('fs');
const { program } = require('commander');

program.option('bump', 'Version to bump [major/minor/patch]');
program.parse();

async function run(command, args) {
  console.log(`RUNNING: ${command}`);
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      }
      resolve(stdout);
    });
  });
}

async function main() {
  const uncommitted = await run('git status --porcelain');
  if (uncommitted.trim()) {
    console.error('ERROR. Commit all files before releasing.');
    process.exit(1);
  }
  const packageJson = JSON.parse(
    readFileSync('package.json', { encoding: 'utf-8' })
  );
  const currentVersion = packageJson['version'];
  let [major, minor, patch] = currentVersion
    .split('.')
    .map((value) => Number(value));

  const newVersion =
    program.bump === 'major'
      ? [++major, 0, 0]
      : program.bump === 'minor'
      ? [major, ++minor, 0]
      : [major, minor, ++patch];
  const newBranch = `dev-${newVersion}`;
  await run(`git checkout -b ${newBranch}`);
  await run(
    `perl -p -i -e 's@"version": "${currentVersion}"@"version": "${newVersion}"@' package.json`
  );
  await run(
    `git add . && git commit -m "Publish dev version ${newVersion}" && git push --set-upstream origin ${newBranch}`
  );
}

main();
