const url = process.env.DATABASE_URL;
if (!url) {
  console.log("DATABASE_URL is not set in the environment.");
  process.exit(0);
}

function mask(s: string | undefined) {
  if (!s) return "(none)";
  if (s.length <= 4) return "*".repeat(s.length);
  return s.slice(0, 2) + "*".repeat(Math.min(8, s.length - 4)) + s.slice(-2);
}

try {
  const u = new URL(url);
  console.log("DATABASE_URL found. Parsed components (password masked):");
  console.log("  protocol:", u.protocol.replace(":", ""));
  console.log("  host:", u.hostname);
  console.log("  port:", u.port || "(default)");
  console.log(
    "  database:",
    u.pathname ? u.pathname.replace(/^\//, "") : "(none)",
  );
  console.log("  username:", u.username || "(none)");
  console.log("  password (masked):", mask(u.password));
} catch (err) {
  // Some connection strings may not be parseable by URL; print masked summary
  console.log(
    "DATABASE_URL is present but could not be parsed by URL(). Showing masked preview:",
  );
  const s = String(url);
  const preview = s.length > 20 ? s.slice(0, 8) + "..." + s.slice(-8) : s;
  console.log("  preview (masked):", preview.replace(/:[^@]*@/, ":***@"));
}

// Also check for common issues: password not string or contains unexpected JSON
try {
  const match = url.match(/:(.*)@/);
  if (match) {
    const pwd = match[1];
    if (pwd.trim().startsWith("{") || pwd.trim().startsWith('"')) {
      console.log(
        "Warning: password appears to start with JSON/quote characters — ensure DATABASE_URL password is a plain string.",
      );
    }
  }
} catch (e) {
  // ignore
}
