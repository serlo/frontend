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
    }
  }" http://127.0.0.1:4434/identities
