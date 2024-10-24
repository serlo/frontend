## Changelog for version 0.17.0

- feat(editor): show user a warning in test environments that content might disappear. Thank you [@LarsTheGlidingSquirrel](https://github.com/LarsTheGlidingSquirrel) in https://github.com/serlo/frontend/pull/4216
- refactor: show editor version in DOM through `data-editor-version`. Thank you [@LarsTheGlidingSquirrel](https://github.com/LarsTheGlidingSquirrel) in https://github.com/serlo/frontend/pull/4215
- fix(edusharing-plugin): use correct import. Thank you [@LarsTheGlidingSquirrel](https://github.com/LarsTheGlidingSquirrel) in https://github.com/serlo/frontend/pull/4214
- fix(edusharing-plugin): not use `dangerouslySetInnerHtml` & sanitize html to prevent XSS. Thank you [@LarsTheGlidingSquirrel](https://github.com/LarsTheGlidingSquirrel) in https://github.com/serlo/frontend/pull/4213
- fix(editor): prevent creating exercises in multimedia, other exercise, solution. Thank you [@LarsTheGlidingSquirrel](https://github.com/LarsTheGlidingSquirrel) in https://github.com/serlo/frontend/pull/4212
- refactor(frontend): remove revision history loader. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4211
- fix(exercise): make sure math controls end up in text toolbar not in exercise toolbar. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4210
- fix(exercise): add suspense to avoid error. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4208

**Full Changelog**: https://github.com/serlo/frontend/compare/v0.16.0...v0.17.0

# Changelog for version 0.16

feat(editor): Enable gallery plugin, free text excercise plugin and interactive image (dropzone) plugin
fix(rows): check if interactive exercise plugins are supported in menu items filter
Some changes to make editor code work in serlo-editor-as-lti-tool
fix(editor-packages): Use one redux store per instance of editor
fix(e2e): adapt math tests
