import { createBatchDepartment } from "@/lib/actions/department.actions";
import { promises as fs } from "fs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
async function getDepartments() {
  const data = await fs.readFile(path.join(__dirname, "data.json"));
  const departments = JSON.parse(data.toString());
  const returnData = await createBatchDepartment(departments);
  console.log("✅ Data generated.", returnData.length);
}
getDepartments();
