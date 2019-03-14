#!/usr/bin/env node

import {grabImages} from 'imagegrabber'

// Get url from command line arguments
// print usage if --help or no args passed
grabImages("https://www.devdungeon.com")
