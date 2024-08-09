import fs from "fs";
import path from "path";
import { faker } from "@faker-js/faker";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { department, level } from "..";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const payrolls = Array.from({ length: 100 }, () => ({
  id: `EMP-${faker.number.int({ min: 1000, max: 9999 })}`,
  image: faker.image.avatar(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  position: faker.person.jobTitle(),
  level: faker.helpers.arrayElement(level),
  department: faker.helpers.arrayElement(department),
  month: faker.number.int({ min: 1, max: 12 }),
  hired_date: faker.date.past({ years: 3 }).toISOString().slice(0, 10),
  gross_salary: faker.number.int({ min: 10, max: 50 }) * 1000000,
  overtime: faker.number.int({ min: 1, max: 24 }),
  paid_leave: faker.number.int({ min: 1, max: 2 }),
  unpaid_leave: faker.number.int({ min: 1, max: 2 }),
  position_allowance: faker.number.int({ min: 0.5, max: 5 }) * 1000000,
  travel_allowance: faker.number.int({ min: 0.5, max: 2 }) * 1000000,
}));

fs.writeFileSync(
  path.join(__dirname, "data.json"),
  JSON.stringify(payrolls, null, 2),
);

console.log("✅ Data generated.");
