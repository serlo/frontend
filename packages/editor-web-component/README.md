# Serlo Editor as a web component

This is an early version of the web component wrapping the [Serlo Editor](https://de.serlo.org/editor). Be aware that we are actively working on both packages and thus there will be breaking changes in minor versions before version 1 is reached. The repositories [serlo/serlo-editor-lit](https://github.com/serlo/serlo-editor-lit) and [serlo/block-serlo-editor-with-vue-js](https://github.com/serlo/block-serlo-editor-with-vue-js) show how this package can be used.

If you are using React, we recommend using the Serlo Editor as a [React component](https://www.npmjs.com/package/@serlo/editor). Please also read the documentation of all the properties we expose there. The latest supported attributes and properties of the editor-web-component can be found [here](https://github.com/serlo/frontend/blob/staging/packages/editor-web-component/src/editor-web-component.tsx#L22).

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
    const initialState = ref({
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
      initialState,
      toggleMode,
      handleStateChange,
    }
  },
})
</script>
```

To familiarize yourself with our JSON structure, for each plugin, you can look at example JSONs [here](https://github.com/serlo/documentation/wiki/Serlo-Editor-Initial-State-of-Plugins). You can also go to our editor [preview page](https://de.serlo-staging.dev/___editor_preview), enter any plugin and through the menu in the top right corner, click "copy plugin". If you paste it in your code editor, you will see the JSON structure of the plugin you selected through the toolbar.

If you want to display a certain plugin as an initial state of the Serlo Editor, we recommend importing the `plugins` and `Plugin` constant/enum. Check out the [documentation](https://github.com/serlo/frontend/tree/staging/packages/editor#plugins-constant-and-plugin-enum) for more information.

```typescript
import { plugins, Plugin } from '@serlo/editor'

const singleChoiceKey = Plugin.SingleChoiceExercise
const initialStateOfSingleChoice = plugin[singleChoiceKey].initialState
```

## Shadow DOM vs. normal DOM

We give you the option whether you want to render the web-component within the Shadow DOM or not. Both have their pros and cons. Outside of the Shadow DOM, it's easier to run into style collisions. However, the Serlo Editor within the Shadow DOM is still buggy in a few places, especially when it comes to focus management.
We are fixing them, but by default we are rendering the Serlo Editor within the normal DOM. If you want to render it within the Shadow DOM, you can pass `true` to the `use-shadow-dom` argument. Bug reports and fixes in form of a PR for the use-shadow-dom mode are very welcome!

```html
<editor-web-component use-shadow-dom="true"></editor-web-component>
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
