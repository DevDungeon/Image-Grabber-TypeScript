#!/usr/bin/env node
"use strict";
var imagegrabber = require("imagegrabber");

if (process.argv.length < 3) {
    console.log("Not enough arguments provided.")
    console.log("Provide a URL as the first argument.")
    process.exit(1)
}

imagegrabber.grabImages(process.argv[2]);

