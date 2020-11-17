#! /usr/bin/env node
/* eslint-disable import/no-dynamic-require */

const path = require("path")

const packageJson = require(path.join(process.cwd(), "package.json"))
const childProcess = require("child_process")

const deps = packageJson.envDependencies || {}

const envPackages = Object.keys(deps)
	.map(key =>
		deps[key].replace(/\${([0-9a-zA-Z_]*)}/g, x => {
			return { key, value: process.env[x.substring(2, x.length - 1)] }
		})
	)
const envValues = envPackages.map(pkg => pkg.value).join(" ")
const envKeys = envPackages.map(pkg => pkg.key).join(" ")


try {
	childProcess.execSync(`NOYARNPOSTINSTALL=1 yarn add --dev ${envValues} && yarn remove ${envValues}`, {
		stdio: [0, 1, 2]
	})
	// eslint-disable-next-line no-empty
} catch (e) {}
