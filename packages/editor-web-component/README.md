# Serlo Editor as a web component

This is an early version of the web component wrapping the [Serlo Editor](https://de.serlo.org/editor). Be aware that we are actively working on both packages and thus there will be breaking changes in minor versions before version 1 is reached. The repository [serlo/block-serlo-editor-with-vue-js](https://github.com/serlo/block-serlo-editor-with-vue-js) shows how this package can be used.

## Installation and usage

1. `yarn add @serlo/editor-web-component`
2. Register the web component `customElements.define('serlo-editor', EditorWebComponent)`.
3. Render the web component

Below is an example of how to use the web component in a Vue.js application.

```vue
<template>
  <div>
    <button @click="toggleMode">{{ isEditing ? 'READ' : 'EDIT' }}</button>
    <serlo-editor
      :mode="isEditing ? 'write' : 'read'"
      :initial-state="initialExampleState"
      @state-changed="handleStateChange"
    ></serlo-editor>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { EditorWebComponent } from '@serlo/editor-web-component'

customElements.define('serlo-editor', EditorWebComponent)

export default defineComponent({
  name: 'SerloEditorComponent',
  setup() {
    const isEditing = ref(false)
    const initialExampleState = ref({
      plugin: 'rows',
      state: [
        {
          plugin: 'text',
          state: [
            {
              type: 'h',
              level: 1,
              children: [{ text: 'Example Heading' }],
            },
          ],
        },
      ],
    })

    const toggleMode = () => {
      isEditing.value = !isEditing.value
    }

    const handleStateChange = (event) => {
      console.log('New state:', event.detail.newState)
    }

    return {
      isEditing,
      initialExampleState,
      toggleMode,
      handleStateChange,
    }
  },
})
</script>
```

## Releasing a new version to npm

Bump the version number in the package.json and
the github workflow seen inside `editor-web-component.yaml` will take care of the publishing.

## Local development with editor package

Go to the `package.json` and use `"@serlo/editor": "workspace:*"` instead of a fixed version. This way, you don't need to release a new version of the editor every time you make a change in the repo.

## Linking for local development with integrations

In order to avoid publishing the editor to NPM or dealing with tarballs every time you need to test your changes in an integration locally, you can use `yalc` to link the editor web component package to your integration locally.

Prerequisites:

- Yalc: `yarn global add yalc`

Initial steps:

1. From this workspace -> run `yarn yalc:publish`
2. From consumer repo -> run `yalc add @serlo/editor-web-component`

After making some changes in the editor:

- From this workspace -> run `yarn yalc:publish` (pushes dist, updates version and cache)

To remove the local link to Serlo Editor:

- From consumer repo -> run `yalc remove @serlo/editor-web-component`
