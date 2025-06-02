#!/bin/bash

set -e

# 1. Ensure package directory exists
mkdir -p package

# 2. Pack each dependency from the registry (will fail if no registry access)
npm pack ct-web-gtm --pack-destination ./package
npm pack clad-ui@1.2.5 --pack-destination ./package
# npm pack @chotot/appwrapper-placeholder@1.2.8 --pack-destination ./package
# npm pack @chotot/appwrapper-utils@1.2.2 --pack-destination ./package
# npm pack @chotot/auth@1.1.0 --pack-destination ./package
# npm pack @chotot/id@1.0.9 --pack-destination ./package
npm pack ct-helpers --pack-destination ./package
npm pack ct-react-common --pack-destination ./package

# 3. Pack devDependencies
npm pack @chotot/eslint-config-next@1.5.1 --pack-destination ./package
npm pack @chotot/husky@4.4.0 --pack-destination ./package

# 4. Install dependencies from local tarballs
pnpm install ./package/ct-web-gtm-*.tgz ./package/clad-ui-*.tgz ./package/ct-helpers-*.tgz ./package/ct-react-common-*.tgz

# 5. Install devDependencies from local tarballs
pnpm install -D ./package/chotot-eslint-config-next-*.tgz ./package/chotot-husky-*.tgz
