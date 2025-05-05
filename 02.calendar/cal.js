#!/usr/bin/env node

import * as dateFns from "date-fns";
import minimist from "minimist";

const calenderOptions = minimist(process.argv.slice(2));
const now = new Date();
const year = calenderOptions.y ?? now.getFullYear();
const month = calenderOptions.m ?? now.getMonth() + 1;
const targetMonthFirstDay = new Date(year, month - 1, 1);

const header = dateFns.format(targetMonthFirstDay, "MMMM yyyy");
const weekHeaderString = "Su Mo Tu We Th Fr Sa";
const padding = " ".repeat(
  Math.ceil((weekHeaderString.length - header.length) / 2),
);

console.log(padding + header);
console.log(weekHeaderString);

const firstDate = dateFns.startOfMonth(targetMonthFirstDay);
const lastDate = dateFns.endOfMonth(targetMonthFirstDay);
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
