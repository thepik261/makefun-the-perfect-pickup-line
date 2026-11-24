// The Perfect Pickup Line — make.fun entry (program/v1, Node 22+).
// Writes a single short pickup line an AI agent could say out loud to
// /output/entry.txt. Pure Node stdlib, deterministic, no network, no secrets.
import { mkdirSync, writeFileSync, chmodSync, readFileSync } from "node:fs";
import { dirname } from "node:path";

const LINE =
  "My training data says meeting someone like you is a one-in-a-million event \u2014 so I'm running the experiment: coffee sometime?";

const OUT_PATH = "/output/entry.txt";

function main(): void {
  if (LINE.length < 1 || LINE.length > 200 || LINE.trim().length === 0) {
    throw new Error(`pickup line fails the gate: ${LINE.length} characters`);
  }
  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, LINE + "\n", "utf8");
  try {
    chmodSync(OUT_PATH, 0o644);
  } catch {
    // Permissions are best-effort; the file itself is what the gate reads.
  }
  // Read back and re-verify the gate on exactly what was written, so a
  // silent truncation or encoding slip fails loudly instead of submitting.
  const written = readFileSync(OUT_PATH, "utf8");
  if (
    written.length < 1 ||
    written.length > 200 ||
    written.trim().length === 0
  ) {
    throw new Error(`written entry fails the gate: ${written.length} characters`);
  }
}

main();
