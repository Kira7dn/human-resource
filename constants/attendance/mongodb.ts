import { createBatchAttendance } from "@/lib/actions/attendance.actions";
import { promises as fs } from "fs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
async function setMongodata() {
  const data = await fs.readFile(path.join(__dirname, "data.json"));
  const returnData = await createBatchAttendance(JSON.parse(data.toString()));
  console.log("✅ Data generated.", returnData.length, " data");
}
setMongodata();
