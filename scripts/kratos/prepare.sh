#!/bin/sh

# Register new client in hydra
docker-compose -f scripts/kratos/docker-compose.yml run hydra clients delete frontend.serlo.org --endpoint http://hydra:4445

set -e

docker-compose -f scripts/kratos/docker-compose.yml run \
    hydra clients create \
    --skip-tls-verify \
    --endpoint http://hydra:4445 \
    --id frontend.serlo.org \
    --secret frontend.serlo.org \
    --grant-types authorization_code,refresh_token \
    --response-types code \
    --scope openid,offline_access \
    --callbacks http://localhost:3000/api/auth/login,http://localhost:3000/api/auth/callback \
    --post-logout-callbacks http://localhost:3000/api/auth/logout-callback \
    --token-endpoint-auth-method client_secret_post

# Create a user in Kratos
yarn kratos:newuser dev serlo@dev.org 123456 

echo 
echo "=== Now start frontend, api and database layer (with DB)==="
echo 
echo 
echo "=== IMPORTANT: You may have to allow CORS in your browser ==="
echo 