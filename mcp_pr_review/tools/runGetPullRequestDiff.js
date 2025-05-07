import { run } from './getPullRequestDiff.js';

async function main() {
  const result = await run({
    owner: 'octocat',
    repo: 'Hello-World',
    pull_number: 12
  });
  console.log(result.summary);
  console.log('\n--- DIFF (truncated) ---\n');
  console.log(result.content);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
