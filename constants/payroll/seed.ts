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
  position: faker.person.jobTitle(),
  level: faker.helpers.arrayElement(level),
  department: faker.helpers.arrayElement(department),
  month: faker.number.int({ min: 12, max: 12 }),
  gross_salary: faker.number.int({ min: 10000000, max: 50000000 }),
  allowance: faker.number.int({ min: 100000, max: 5000000 }),
  days_worked: faker.number.int({ min: 15, max: 24 }),
  overtime: faker.number.int({ min: 1, max: 24 }),
}));

fs.writeFileSync(
  path.join(__dirname, "data.json"),
  JSON.stringify(payrolls, null, 2),
);

console.log("✅ Data generated.");
