#!/bin/bash


# requires "jq" 
# On Ubuntu: sudo apt-get install jq
# On macOS: brew install jq

LANG_FILE="apps/web/src/data/en/plugin-strings.json"

# Prompt for plugin name
echo "Enter the title of the new plugin:"
read PLUGIN_NAME

# Prepare the plugin data as a string
PLUGIN_DATA="{}"
while true; do
    echo "Enter key (or type 'done' to finish):"
    read KEY
    if [ "$KEY" == "done" ]; then
        break
    fi
    echo "Enter value:"
    read VALUE
    PLUGIN_DATA=$(echo $PLUGIN_DATA | jq --arg key "$KEY" --arg value "$VALUE" '.[$key]=$value')
done

# Check if jq is available
if ! command -v jq &> /dev/null; then
    echo "jq could not be found, please install it."
    exit 1
fi

# Use jq to update the JSON data
jq --argjson pluginData "$PLUGIN_DATA" --arg pluginName "$PLUGIN_NAME" \
'.[$pluginName] = $pluginData' "$LANG_FILE" > temp.$$.json && mv temp.$$.json "$LANG_FILE"

echo "Updated language file: $LANG_FILE"

echo "All done."
