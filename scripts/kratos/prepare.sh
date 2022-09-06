#!/bin/sh

echo
echo 'Registering frontend and rocket chat as clients in hydra'
echo
docker-compose -f scripts/kratos/docker-compose.yml run hydra clients delete frontend.serlo.org --endpoint http://hydra:4445

docker-compose -f scripts/kratos/docker-compose.yml run \
  hydra clients create \
  --skip-tls-verify \
  --endpoint http://hydra:4445 \
  --id frontend.serlo.org \
  --secret frontend.serlo.org \
  --grant-types authorization_code,refresh_token \
  --response-types code \
  --scope openid,offline_access \
  --callbacks http://localhost:3000/api/hydra/login,http://localhost:3000/api/auth/callback,http://localhost:3000/api/auth/login \
  --post-logout-callbacks http://localhost:3000/api/auth/logout-callback \
  --token-endpoint-auth-method client_secret_post

docker-compose -f scripts/kratos/docker-compose.yml run hydra clients delete rocket.chat --endpoint http://hydra:4445

docker-compose -f scripts/kratos/docker-compose.yml run \
  hydra clients create \
  --skip-tls-verify \
  --endpoint http://hydra:4445 \
  --id rocket.chat \
  --secret rocket.chat \
  --grant-types authorization_code,refresh_token \
  --response-types code \
  --scope openid,offline_access \
  --callbacks http://localhost:3030/_oauth/serlo \
  --token-endpoint-auth-method client_secret_post

echo
echo 'Dumping a basic preconfigured database for rocket chat'
echo

docker-compose -f scripts/kratos/docker-compose.yml exec --user root mongodb  mongorestore --drop --quiet /dump/

echo
echo 'Creating the user dev in Kratos'
echo
yarn kratos:newuser dev serlo@dev.org 123456

echo
echo 'Adjusting link to rocket chat'
echo
sed -i 's/https:\/\/community.serlo.org\//http:\/\/localhost:3030\//g' src/data/de/menu-data.ts

echo
echo 'Making authentication in api possible'
echo
cp -f scripts/kratos/graphql-fetch-cloudflare-auth.template src/api/graphql-fetch.ts
echo
echo "\033[0;31mImportant:\033[0m the file src/api/graphql-fetch.ts and src/data/de/menu-data.ts were modified in order to imitate the current behavior in deployment. DO NOT COMMIT these changes."
echo
