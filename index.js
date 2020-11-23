#! /usr/bin/env node
/* eslint-disable import/no-dynamic-require */
const path = require("path")
var stdout = require('mute-stdout');


require("dotenv").config({ path: path.join(process.cwd(), ".env") })
const packageJson = require(path.join(process.cwd(), "package.json"))
const childProcess = require("child_process")

const deps = packageJson.envDependencies || {}

const envPackages = Object.keys(deps).map(key => {
	return {
		key,
		value: deps[key].replace(/\${([0-9a-zA-Z_]*)}/g, x => {
			const varname = x.substring(2, x.length - 1)
			const envreplacement = process.env[varname]
			if (!envreplacement) {
				console.error(varname + " is not available in env but used in the package.json")
				process.exit(1)
			}
			return envreplacement
		})
	}
})

const envValues = envPackages.map(pkg => pkg.value ?? "").join(" ")

try {
	childProcess.execSync(`NOYARNPOSTINSTALL=1 yarn add-no-save ${envValues}`)
	// eslint-disable-next-line no-empty
} catch (e) {}
