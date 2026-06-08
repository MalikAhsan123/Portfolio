import { execSync, spawn } from "child_process";
import { existsSync, unlinkSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function killPort(port) {
  try {
    if (process.platform === "win32") {
      const output = execSync(`netstat -ano | findstr :${port}`, {
        encoding: "utf8",
        stdio: ["pipe", "pipe", "ignore"],
      });

      const pids = new Set();
      for (const line of output.split("\n")) {
        const match = line.trim().match(/\s+(\d+)\s*$/);
        if (match?.[1] && match[1] !== "0") {
          pids.add(match[1]);
        }
      }

      for (const pid of pids) {
        try {
          execSync(`taskkill /PID ${pid} /F`, { stdio: "ignore" });
        } catch {
          // Process may already be gone
        }
      }
    } else {
      execSync(`lsof -ti:${port} | xargs kill -9 2>/dev/null || true`, {
        shell: true,
        stdio: "ignore",
      });
    }
  } catch {
    // Port is already free
  }
}

function removeStaleDevLock() {
  const lockPath = path.join(root, ".next", "dev", "lock");
  if (existsSync(lockPath)) {
    unlinkSync(lockPath);
  }
}

console.log("Cleaning up previous dev server...");
killPort(3000);
killPort(3001);
removeStaleDevLock();

const child = spawn("npx", ["next", "dev"], {
  cwd: root,
  stdio: "inherit",
  shell: true,
});

child.on("exit", (code) => process.exit(code ?? 0));
