#!/usr/bin/env node

import { startOfMonth, endOfMonth, format, addDays } from "date-fns";
import minimist from "minimist";

const args = minimist(process.argv.slice(2));
const now = new Date();
const year = args.y || now.getFullYear();
const month = args.m || now.getMonth() + 1;

const header = format(new Date(year, month - 1), "MMMM yyyy");
const weekDays = "Su Mo Tu We Th Fr Sa";
const padding = " ".repeat(Math.ceil((weekDays.length - header.length) / 2));

console.log(padding + header);
console.log(weekDays);

const firstDate = startOfMonth(new Date(year, month - 1));
const lastDate = endOfMonth(new Date(year, month - 1));
const spaceWidth = 3;
const initialSpaceCounts = firstDate.getDay() * spaceWidth;

process.stdout.write(" ".repeat(initialSpaceCounts));

for (let date = firstDate; date <= lastDate; date = addDays(date, 1)) {
  process.stdout.write(String(date.getDate()).padStart(2, " "));
  if (date.getDay() === 6 || date.getDate() === lastDate.getDate()) {
    console.log();
  } else {
    process.stdout.write(" ");
  }
}
