#!/usr/bin/env bash

# die on error
set -e

# zip the thing
zip -r build.zip build

# https://www.netlify.com/docs/api/#deploying-to-netlify
curl -H "Content-Type: application/zip" \
     -H "Authorization: Bearer $NETLIFY_KEY" \
     --data-binary "@build.zip" \
     https://api.netlify.com/api/v1/sites/gitgudscrub.xyz/deploys
