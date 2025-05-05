#!/usr/bin/env node

import * as dateFns from "date-fns";
import minimist from "minimist";

const calendarOptions = minimist(process.argv.slice(2));
const now = new Date();
const year = calendarOptions.y ?? now.getFullYear();
const month = calendarOptions.m ?? now.getMonth() + 1;
const firstDate = new Date(year, month - 1, 1);

const header = dateFns.format(firstDate, "MMMM yyyy");
const weekHeaderString = "Su Mo Tu We Th Fr Sa";
const padding = " ".repeat(
  Math.ceil((weekHeaderString.length - header.length) / 2),
);

console.log(padding + header);
console.log(weekHeaderString);

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
