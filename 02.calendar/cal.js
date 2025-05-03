#!/usr/bin/env node

import * as dateFns from "date-fns";
import minimist from "minimist";

const arg = minimist(process.argv.slice(2));
const now = new Date();
const year = arg.y || now.getFullYear();
const month = arg.m || now.getMonth() + 1;

const header = dateFns.format(new Date(year, month - 1), "MMMM yyyy");
const weekDays = "Su Mo Tu We Th Fr Sa";
const padding = " ".repeat(Math.ceil((weekDays.length - header.length) / 2));

console.log(padding + header);
console.log(weekDays);

const firstDate = dateFns.startOfMonth(new Date(year, month - 1));
const lastDate = dateFns.endOfMonth(new Date(year, month - 1));
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
