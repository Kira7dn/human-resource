"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var faker_1 = require("@faker-js/faker");
var data_1 = require("./data");
var tasks = Array.from({ length: 100 }, function () { return ({
    id: "TASK-".concat(faker_1.faker.number.int({ min: 1000, max: 9999 })),
    title: faker_1.faker.hacker.phrase().replace(/^./, function (letter) { return letter.toUpperCase(); }),
    status: faker_1.faker.helpers.arrayElement(data_1.statuses).value,
    label: faker_1.faker.helpers.arrayElement(data_1.labels).value,
    // priority: faker.helpers.arrayElement(priorities).value,
}); });
fs_1.default.writeFileSync(path_1.default.join(__dirname, "tasks.json"), JSON.stringify(tasks, null, 2));
console.log("✅ Tasks data generated.");
