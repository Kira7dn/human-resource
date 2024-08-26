import fs from "fs";
import path from "path";
import { faker } from "@faker-js/faker";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { levels } from "..";
import { getAllDepartments } from "@/lib/actions/department.actions";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function getDeptIds() {
  const data = await getAllDepartments();
  const ids = data ? data.map((item) => item._id) : [];
  return ids;
}

getDeptIds().then((departments) => {
  const recruitments = Array.from({ length: 20 }, () => ({
    id: `REC-${faker.number.int({ min: 1, max: 9999 })}`,
    expried_date: faker.date.future({ years: 0.5 }).toISOString().slice(0, 10),
    quantity: faker.number.int({ min: 1, max: 3 }),
    position: faker.person.jobTitle(),
    level: faker.helpers.arrayElement(levels.map((item) => item.value)),
    department: faker.helpers.arrayElement(departments),
    salary: faker.helpers.weightedArrayElement([
      {
        weight: 5,
        value: "negotiable",
      },
      {
        weight: 5,
        value: `~${(faker.number.int({ min: 10, max: 50 }) * 1000000).toLocaleString("en-US")} VND`,
      },
    ]),
    description:
      "- Cupidatat minim in eu laborum.\n-Non cupidatat Lorem quis quis ullamco.\n-Deserunt dolore dolor ex id et cillum nisi amet adipisicing sit nisi qui nisi id.\n-Pariatur incididunt sint quis irure adipisicing sunt nisi.\n-Consequat veniam fugiat sint sunt quis anim.\n-Veniam aliqua ad aliqua reprehenderit culpa laboris sint consectetur exercitation.\n-Eiusmod occaecat ut labore laborum commodo incididunt et pariatur reprehenderit velit exercitation eiusmod duis non.\n-Enim Lorem laborum commodo minim ipsum quis esse irure elit fugiat veniam exercitation cillum.\n-Laborum proident in mollit aute ea eu velit.Occaecat excepteur sunt nulla ipsum pariatur commodo ullamco reprehenderit reprehenderit.\n-Consequat elit tempor mollit culpa ad.\n-Occaecat laborum pariatur elit ea adipisicing pariatur.\n-Ea aliquip velit pariatur et aliquip et proident elit dolore quis commodo fugiat do labore.\n-Labore magna elit Lorem ad eiusmod esse est ad.",
    requirements:
      "- Cupidatat minim in eu laborum.\n-Non cupidatat Lorem quis quis ullamco.\n-Deserunt dolore dolor ex id et cillum nisi amet adipisicing sit nisi qui nisi id.\n-Enim Lorem laborum commodo minim ipsum quis esse irure elit fugiat veniam exercitation cillum.\n-Laborum proident in mollit aute ea eu velit.Occaecat excepteur sunt nulla ipsum pariatur commodo ullamco reprehenderit reprehenderit.",
  }));

  fs.writeFileSync(
    path.join(__dirname, "data.json"),
    JSON.stringify(recruitments, null, 2),
  );
  console.log("✅ Data generated.");
  return;
});
