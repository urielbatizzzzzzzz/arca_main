import { createConnection } from "mysql2";
import parseDatabaseUrl from "parse-database-url";
export const dbconfig =
  process.env.MYSQL_URL ||
  "mysql://root:vrlsLRjqVeKdhVstzhNKrfpGRPOPsjNI@monorail.proxy.rlwy.net:59367/railway";

const dbcon = parseDatabaseUrl(dbconfig);

export const db = createConnection(dbcon);

db.connect();
