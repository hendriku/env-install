# env-install

**This is a fork of https://github.com/porsager/env-install which targets yarn users and fixes some issues.**

Using private git repositories that requires authentication is often necessary when running `yarn`, but you don't want to put keys, tokens or passwords in your code, so instead you can use this module that allows you to define packages with environment variable names to inject your keys, passwords or tokens.

*Note: As of https://github.com/yarnpkg/yarn/issues/4100 postinstall is not automatically being stopped. Therefore the usage of NOYARNPOSTINSTALL is necessary in the script definition (see usage below).*

## Usage

Add this module as a dependency in your projects normal dependencies, and add a `postinstall` script that contains `env-install`.
Then declare your dependencies containing environment variables in `envDependencies`

```
scripts: {
    "postinstall": "test -n \"$NOYARNPOSTINSTALL\" || env-install"
},
dependencies: {
    "env-install": "git+https://github.com/hendriku/env-install.git#1.0.4"
},
envDependencies: {
    "some-secret-module": "git+https://oauth2:${GITHUB_TOKEN}@your.github.com/you/privaterepo"
}
```

In the above example `some-secret-module` will be installed like this:

```
GITHUB_TOKEN=abcdefg123456
yarn add https://abcdefg123456:x-oauth-basic@github.com/you/privaterepo
```
