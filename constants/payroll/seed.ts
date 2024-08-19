import fs from "fs";
import path from "path";
import { faker } from "@faker-js/faker";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { department, levels } from "..";
import { getAllEmployees } from "@/lib/actions/employee.actions";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function getEmpployeeIds() {
  const data = await getAllEmployees();
  return data;
}
getEmpployeeIds().then((data) => {
  const payrolls = data.map((item: any) => {
    return {
      employee: item._id,
      period_from: "2024-08-01",
      period_to: "2024-08-31",
      gross_salary: item.gross_salary,
      position_allowance: item.position_allowance,
      travel_allowance: item.travel_allowance,
      overtime: faker.number.int({ min: 1, max: 24 }),
      paid_leave: faker.number.int({ min: 1, max: 2 }),
      unpaid_leave: faker.number.int({ min: 1, max: 2 }),
    };
  });

  fs.writeFileSync(
    path.join(__dirname, "data.json"),
    JSON.stringify(payrolls, null, 2),
  );

  console.log("✅ Data generated.");
});
