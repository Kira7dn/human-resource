import { createBatchPayroll } from "@/lib/actions/payroll.actions";
import { promises as fs } from "fs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
async function getPayroll() {
  const data = await fs.readFile(path.join(__dirname, "data.json"));
  const payroll = JSON.parse(data.toString());
  const returnData = await createBatchPayroll(payroll);
  console.log("✅ Data generated.", returnData.length);
}
getPayroll();
