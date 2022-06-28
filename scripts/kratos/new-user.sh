#! /bin/sh

curl --request POST -sL \
  --header "Content-Type: application/json" \
  --data "{
    \"traits\": {
      \"username\": \"$1\",
      \"email\": \"$2\"
    }, 
    \"credentials\": { 
      \"password\": {
          \"config\": {
            \"password\": \"$3\"
          }
        }
      },
    \"metadata_public\" : { 
      \"legacy_id\": 1
    }
  }" http://localhost:4434/identities
