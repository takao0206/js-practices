#!/usr/bin/env node

import * as dateFns from "date-fns";
import minimist from "minimist";

const options = minimist(process.argv.slice(2));
const now = new Date();
const year = options.y ?? now.getFullYear();
const month = options.m ?? now.getMonth() + 1;
const firstDate = new Date(year, month - 1, 1);

const monthYearHeader = dateFns.format(firstDate, "MMMM yyyy");
const weekHeader = "Su Mo Tu We Th Fr Sa";
const padding = " ".repeat(
  Math.ceil((weekHeader.length - monthYearHeader.length) / 2),
);

console.log(padding + monthYearHeader);
console.log(weekHeader);

const lastDate = dateFns.endOfMonth(firstDate);
const spaceWidth = 3;
const initialSpaceCounts = firstDate.getDay() * spaceWidth;

process.stdout.write(" ".repeat(initialSpaceCounts));

for (let date = firstDate; date <= lastDate; date = dateFns.addDays(date, 1)) {
  process.stdout.write(String(date.getDate()).padStart(2, " "));
  if (date.getDay() === 6 || date.getDate() === lastDate.getDate()) {
    console.log();
  } else {
    process.stdout.write(" ");
  }
}
