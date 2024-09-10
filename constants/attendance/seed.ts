import fs from "fs";
import path from "path";
import { faker } from "@faker-js/faker";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { getAllEmployees } from "@/lib/actions/employee.actions";
import { attendance_status } from "..";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function getEmployeeIds() {
  const data = await getAllEmployees();
  return data;
}

function generateDatesForMonth(year: number, month: number) {
  const dates = [];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let day = 1; day <= daysInMonth; day++) {
    const newdate = new Date(year, month, day, 0, 0);
    console.log(newdate);
    dates.push(newdate);
  }
  return dates;
}
getEmployeeIds().then((data) => {
  const dates = generateDatesForMonth(2024, 7); // August 2024 (Note: month is 0-indexed)
  const result = (data || []).flatMap((item: any) => {
    return dates.map((date) => {
      return {
        employee: item._id,
        date: new Date(date.setHours(0, 0, 0, 0)),
        attendance_status: faker.helpers.arrayElement(attendance_status),
        overtime: faker.number.int({ min: 1, max: 8 }),
        travel_allowance: item.travel_allowance,
        id_scan_time: [
          new Date(date.setHours(8, faker.number.int({ min: 1, max: 60 }))),
          new Date(date.setHours(17, faker.number.int({ min: 1, max: 60 }))),
        ],
      };
    });
  });

  fs.writeFileSync(
    path.join(__dirname, "data.json"),
    JSON.stringify(result, null, 2),
  );

  console.log("✅ Data generated.");
});
