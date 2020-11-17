#! /usr/bin/env node

const path = require('path')
    , packageJson = require(path.join(process.cwd(), 'package.json'))
    , childProcess = require('child_process')

const deps = packageJson.envDependencies || {}

const packages = Object.keys(deps).map(key =>
  deps[key].replace(/\${([0-9a-zA-Z_]*)}/g, (_, x) => process.env[x])
).join(' ')

console.log(packages)

try {
  childProcess.execSync('yarn add --dev ' + packages + ' && yarn remove ' + packages, { stdio:[0, 1, 2] })
} catch (e) { }
