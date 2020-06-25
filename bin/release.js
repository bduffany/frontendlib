const { exec } = require('child_process');
const { readFileSync } = require('fs');
const { program } = require('commander');

program.command('github <bump>').action(main);
program.parse(process.argv);

async function run(command, args) {
  console.log(`RUNNING: ${command}`);
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(stderr);
        reject(error);
      }
      resolve(stdout);
    });
  });
}

async function main(bump) {
  if (!bump) {
    console.error('ERROR: version bump type not specified.');
    process.exit(1);
  }

  try {
    await run('tsc');
  } catch (e) {
    try {
      throw e;
    } finally {
      console.log('Program does not build! Check the output above.');
      process.exit(1);
    }
  }

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

  const newVersion = (bump === 'major'
    ? [++major, 0, 0]
    : bump === 'minor'
    ? [major, ++minor, 0]
    : [major, minor, ++patch]
  ).join('.');

  const newBranch = `dev-${newVersion}`;
  await run(
    `perl -p -i -e 's@"version": "${currentVersion}"@"version": "${newVersion}"@' package.json`
  );
  await run(`git add . && git commit -m "Publish dev version ${newVersion}"`);
  try {
    await run(
      `git checkout --orphan ${newBranch} && git push --set-upstream origin ${newBranch}`
    );
  } finally {
    await run('git checkout master');
  }
}
