import fs from "fs";
import path from "path";
import { faker } from "@faker-js/faker";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { getAllEmployees } from "@/lib/actions/employee.actions";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function getEmpployeeIds() {
  const data = await getAllEmployees();
  return data;
}

getEmpployeeIds().then((data) => {
  const payrolls = (data || []).flatMap((item: any) => {
    return Array.from({ length: 12 }, (_, month) => ({
      employee: item._id,
      period: new Date(2024, month, 1),
      gross_salary: item.gross_salary,
      position_allowance: item.position_allowance,
      travel_allowance: item.travel_allowance,
      work_day: faker.number.int({ min: 1, max: 30 }),
      overtime: faker.number.int({ min: 1, max: 24 }),
      paid_leave: faker.number.int({ min: 1, max: 2 }),
      unpaid_leave: faker.number.int({ min: 1, max: 2 }),
    }));
  });

  fs.writeFileSync(
    path.join(__dirname, "data.json"),
    JSON.stringify(payrolls, null, 2),
  );

  console.log("✅ Data generated.");
});
