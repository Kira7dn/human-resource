import fs from "fs";
import path from "path";
import { faker } from "@faker-js/faker";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { department, genders, levels, statuses } from "..";
import { getAllDepartments } from "@/lib/actions/department.actions";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function getDeptIds() {
  const data = await getAllDepartments();
  const ids = data.map((item: { _id: any }) => item._id);
  return ids;
}
getDeptIds().then((departments) => {
  const employees = Array.from({ length: 100 }, () => ({
    id: `EMP-${faker.number.int({ min: 1000, max: 9999 })}`,
    image: faker.image.avatar(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    birthDate: faker.date.birthdate().toISOString().slice(0, 10),
    phone: faker.helpers.fromRegExp("+84[0-9]{9}"),
    gender: faker.helpers.arrayElement(genders).value,
    address: faker.location.streetAddress(),
    position: faker.person.jobTitle(),
    level: faker.helpers.arrayElement(levels).value,
    department: faker.helpers.arrayElement(departments),
    hired_date: faker.date.past({ years: 3 }).toISOString().slice(0, 10),
    end_date: faker.helpers.weightedArrayElement([
      {
        weight: 1,
        value: faker.date.past({ years: 3 }).toISOString().slice(0, 10),
      },
      { weight: 9, value: undefined },
    ]),
    status: faker.helpers.arrayElement(statuses).value,
    gross_salary: faker.number.int({ min: 10, max: 50 }) * 1000000,
    position_allowance: faker.number.int({ min: 0.5, max: 5 }) * 1000000,
    travel_allowance: faker.number.int({ min: 0.5, max: 2 }) * 1000000,
  }));

  fs.writeFileSync(
    path.join(__dirname, "data.json"),
    JSON.stringify(employees, null, 2),
  );
  console.log("✅ Data generated.");
  return;
});
