#!/usr/bin/env bash

# die on error
set -e

# https://gist.github.com/cjus/1047794
echo -e 'Retrieving latest deploy...\n'
url=`curl -H "Authorization: Bearer $NETLIFY_PUBLISH_KEY" https://api.netlify.com/api/v1/sites/gitgudscrub.xyz/deploys`
temp=`echo $url | sed 's/\\\\\//\//g' | sed 's/[{}]//g' | awk -v k="text" '{n=split($0,a,","); for (i=1; i<=n; i++) print a[i]}' | sed 's/\"\:\"/\|/g' | sed 's/[\,]/ /g' | sed 's/\"//g' | grep -w -m 1 'id'`

# https://www.netlify.com/docs/api/#deploys
echo -e "Publishing build ${temp##*|}...\n"
curl -X POST -H "Authorization: Bearer $NETLIFY_PUBLISH_KEY" -d "{}" "https://api.netlify.com/api/v1/sites/gitgudscrub.xyz/deploys/${temp##*|}/restore"

# https://open-api.netlify.com/#/default/lockDeploy
echo -e "Locking deploy to ${temp##*|}...\n"
curl -X POST -H "Authorization: Bearer $NETLIFY_PUBLISH_KEY" -d "{}" "https://api.netlify.com/api/v1/deploys/${temp##*|}/lock"
