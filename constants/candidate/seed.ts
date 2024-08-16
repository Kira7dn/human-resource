import fs from "fs";
import path from "path";
import { faker } from "@faker-js/faker";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { gender, levels, statuses } from "..";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const tasks = Array.from({ length: 100 }, () => ({
  id: `CAD-${faker.number.int({ min: 1000, max: 9999 })}`,
  image: faker.image.avatar(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  birthDate: faker.date.birthdate().toISOString().slice(0, 10),
  phone: faker.helpers.fromRegExp("+84[0-9]{9}"),
  gender: faker.helpers.arrayElement(gender),
  address: faker.location.streetAddress(),
  position: faker.person.jobTitle(),
  level: faker.helpers.arrayElement(levels.map((item) => item.value)),
  status: faker.helpers.arrayElement(statuses).value,
}));

fs.writeFileSync(
  path.join(__dirname, "data.json"),
  JSON.stringify(tasks, null, 2),
);

console.log("✅ Data generated.");
