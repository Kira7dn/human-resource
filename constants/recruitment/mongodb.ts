import { createBatchRecruit } from "@/lib/actions/recruit.actions";
import { promises as fs } from "fs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
async function getRecruits() {
  const data = await fs.readFile(path.join(__dirname, "data.json"));
  const recruit = JSON.parse(data.toString());
  const returnData = await createBatchRecruit(recruit);
  console.log("✅ Data generated.", returnData.length);
}
getRecruits();
