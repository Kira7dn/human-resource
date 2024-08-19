import fs from "fs";
import path from "path";
import { faker } from "@faker-js/faker";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { genders, statuses } from "..";
import { getAllRecruits } from "@/lib/actions/recruit.actions";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function getRecruitIds() {
  const data = await getAllRecruits();
  const ids = data.map((item: { _id: string }) => item._id);
  return ids;
}
getRecruitIds().then((data) => {
  const tasks = Array.from({ length: 100 }, () => ({
    id: `CAD-${faker.number.int({ min: 1000, max: 9999 })}`,
    image: faker.image.avatar(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    birthDate: faker.date.birthdate().toISOString().slice(0, 10),
    phone: faker.helpers.fromRegExp("+84[0-9]{9}"),
    gender: faker.helpers.arrayElement(genders.map((gender) => gender.value)),
    address: faker.location.streetAddress(),
    status: faker.helpers.arrayElement(statuses).value,
    recruit: faker.helpers.arrayElement(data),
  }));
  fs.writeFileSync(
    path.join(__dirname, "data.json"),
    JSON.stringify(tasks, null, 2),
  );
  console.log("✅ Data generated.");
});
