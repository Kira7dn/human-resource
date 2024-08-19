import { createBatchEmployee } from "@/lib/actions/employee.actions";
import { promises as fs } from "fs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
async function getEmployees() {
  const data = await fs.readFile(path.join(__dirname, "data.json"));
  const employee = JSON.parse(data.toString());
  const returnData = await createBatchEmployee(employee);
  console.log("✅ Data generated.", returnData.length);
}
getEmployees();
