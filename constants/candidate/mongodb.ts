import { createBatchCandidate } from "@/lib/actions/candidate.actions";
import { promises as fs } from "fs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
async function getcandidates() {
  const data = await fs.readFile(path.join(__dirname, "data.json"));
  const candidate = JSON.parse(data.toString());
  const returnData = await createBatchCandidate(candidate);
  console.log("✅ Data generated.", returnData.length);
}
getcandidates();
