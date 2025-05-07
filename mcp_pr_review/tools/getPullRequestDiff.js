import fetch from 'node-fetch';

export const name = "getPullRequestDiff";
export const description = "Fetch the diff of a GitHub pull request";

export const parameters = {
  type: "object",
  properties: {
    owner: { type: "string", description: "GitHub repo owner" },
    repo: { type: "string", description: "GitHub repo name" },
    pull_number: { type: "number", description: "Pull request number" }
  },
  required: ["owner", "repo", "pull_number"]
};

export async function run({ owner, repo, pull_number }) {
  const token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;
  const url = `https://api.github.com/repos/${owner}/${repo}/pulls/${pull_number}`;

  const res = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": "application/vnd.github.v3.diff"
    }
  });

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.statusText}`);
  }

  const diff = await res.text();
  return {
    summary: `Fetched diff for PR #${pull_number}`,
    content: diff.slice(0, 10000) // truncate for LLM if needed
  };
}
