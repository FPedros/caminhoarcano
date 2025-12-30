import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

import type { Database as CalendarDatabase } from "traditional-chinese-calendar-database";

const require = createRequire(import.meta.url);
const calendarPackage = require(
  "traditional-chinese-calendar-database"
) as typeof import("traditional-chinese-calendar-database");
const { Database } = calendarPackage;

let dbInstance: CalendarDatabase | null = null;

function resolveDbPath(): string {
  const localPath = path.join(
    process.cwd(),
    "src",
    "lib",
    "chineseCalendar",
    "database",
    "all.bin"
  );

  if (existsSync(localPath)) {
    return localPath;
  }

  const packageRoot = path.dirname(
    require.resolve("traditional-chinese-calendar-database/package.json")
  );
  return path.join(packageRoot, "database", "all.bin");
}

function bufferToArrayBuffer(buffer: Buffer): ArrayBuffer {
  return buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength
  );
}

export function getDb(): CalendarDatabase {
  if (dbInstance) {
    return dbInstance;
  }

  const db = new Database() as CalendarDatabase;
  const dbPath = resolveDbPath();

  try {
    const buffer = readFileSync(dbPath);
    const arrayBuffer = bufferToArrayBuffer(buffer);
    (db as unknown as { arrayBuffer: ArrayBuffer }).arrayBuffer = arrayBuffer;
    (db as unknown as { loaded: boolean }).loaded = true;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(
      `Failed to load Chinese calendar database from ${dbPath}: ${message}`
    );
  }

  dbInstance = db;
  return dbInstance;
}
