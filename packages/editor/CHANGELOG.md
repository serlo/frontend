## Changelog for version 0.17.0

- feat(editor): show user a warning in test environments that content might disappear. Thank you [@LarsTheGlidingSquirrel](https://github.com/LarsTheGlidingSquirrel) in https://github.com/serlo/frontend/pull/4216
- refactor: show editor version in DOM through `data-editor-version`. Thank you [@LarsTheGlidingSquirrel](https://github.com/LarsTheGlidingSquirrel) in https://github.com/serlo/frontend/pull/4215
- fix(edusharing-plugin): use correct import. Thank you [@LarsTheGlidingSquirrel](https://github.com/LarsTheGlidingSquirrel) in https://github.com/serlo/frontend/pull/4214
- fix(edusharing-plugin): not use `dangerouslySetInnerHtml` & sanitize html to prevent XSS. Thank you [@LarsTheGlidingSquirrel](https://github.com/LarsTheGlidingSquirrel) in https://github.com/serlo/frontend/pull/4213
- fix(editor): prevent creating exercises in multimedia, other exercise, solution. Thank you [@LarsTheGlidingSquirrel](https://github.com/LarsTheGlidingSquirrel) in https://github.com/serlo/frontend/pull/4212
- refactor(frontend): remove revision history loader. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4211
- fix(exercise): make sure math controls end up in text toolbar not in exercise toolbar. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4210
- fix(exercise): add suspense to avoid error. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4208
- refactor(editor): refactor providers, hack last frontend deps. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4206
- refactor(audio): move privacy wrapper out of editor. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4205
- refactor(editor): move serlo content loaders out of editor. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4204
- refactor(course): use a wrapper to inject router into course renderer. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4203
- refactor(editor): move save modal outside of editor, refactor. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4202
- refactor(frontend): remove notification settings from save modal. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4201
- refactor(frontend): remove email notification setting. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4200
- refactor(editor): move main toolbar / undoredo to editor. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4199
- refactor(injection): clean code, allow staging for now. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4198
- feat(image): add new upload code for testing. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4197
- refactor(editor): add hook for serlo quickbar data, duplicate some code. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4195
- refactor(article): replace frontend link comp. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4194
- refactor(page-patners): remove frontend dependency. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4193
- refactor(injection): move serlo code back to editor & add server endpoint for fetch. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4192
- feat(blanks): hide exercise task until child plugin is selected, focus child plugin after selection. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4188
- Deployment. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4182

**Full Changelog**: https://github.com/serlo/frontend/compare/v0.16.0-editor...v0.17.0-editor

## Changelog for version 0.16.0

feat(editor): Enable gallery plugin, free text exercise plugin and interactive image (dropzone) plugin
fix(rows): check if interactive exercise plugins are supported in menu items filter
Some changes to make editor code work in serlo-editor-as-lti-tool
fix(editor-packages): Use one redux store per instance of editor
fix(e2e): adapt math tests
