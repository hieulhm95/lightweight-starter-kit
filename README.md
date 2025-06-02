# Chotot Next.js Starterkit (now with TypeScript)

<!-- badges -->
[<img src="https://github.com/carousell/ct-next-starterkit/actions/workflows/ci.yml/badge.svg" alt="CI status">](https://github.com/carousell/ct-next-starterkit/actions)
[<img src="https://img.shields.io/badge/ct--web--starterkit-2.5.3-FFBA00" alt="ct-web-starterkit version" />](https://github.com/carousell/ct-next-starterkit/releases)
[<img src="https://img.shields.io/badge/clad--ui-^1.2.5-E5193B" alt="clad-ui npm version" />](http://npmjs.cmco.io/-/web/detail/clad-ui)
[<img src="https://img.shields.io/badge/next.js-14.1.1-222222" alt="Next.js npm version" />](https://nextjs.org)
[<img src="https://img.shields.io/badge/react-^18.2-0088CC" alt="React dependency version" />](https://github.com/facebook/react/)
[<img src="https://img.shields.io/badge/typescript-5.4.2-blue" alt="TypeScript" />](https://www.typescriptlang.org)
<!-- /badges -->

Starter Project for Next-based web apps. Previously known as **Chotot Next.js Framework**

## Getting started

- NPM package manager to use: `pnpm`
- Recomended global packages: `typescript`, `standard-version`, `git-authors-cli`

```shell
# install dependencies
pnpm
# start dev server and preview development
pnpm dev
# build for production
pnpm build
# preview production build
pnpm start
# test the code (unit test, eslint)
pnpm test
# type-check
pnpm type-check
# generate changelog and bump minor version
# (note that next version is detemined by nearest tag with x.y.z format)
pnpm release

```

NOTE: When preview production (`pnpm start`) locally, add a `.env.local` file with `NEXT_PUBLIC_ASSET_PREFIX=http://localhost:3000/` config to override the asset prefix which is supposed to be the CDN path.

## Technical Choice Rationale

### 1. Why `@chotot/husky` and not the official `husky`?

`husky` after v4 change it's setup approach to introduce a `.husky` folder to keep all git hooks as shell scripts and make use of Git's `core.hooksPath` to keep the repo's Git hooks in a single directory. Although there are [some benefits](https://blog.typicode.com/husky-git-hooks-javascript-config/) to it, this unnecessarily clutters the project's folder with more dotfiles.

`@chotot/husky` is a fork of `husky@4.x` that avoid the `.husky` folder to keep the git hooks transparent and project folder less cluttered.

## Tech Debts & TODOs

1. Unit test lack serializer for Linaria CSS which allows snapshot CSS together with React component.

2. Revise `babel-plugin-module-resolver` to use build-in support for module alias from Next.js. Make sure `@clad-ui/theme` is declared only once in `tsconfig.json` and it still works inside `clad-ui`'s components.
