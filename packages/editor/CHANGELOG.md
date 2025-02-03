## Changelog for version 0.21.4

- Production. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4444
- hot-deploy: fix(plugin-image): upload pixabay images to our bucket. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4441
- fix(plugin-image): upload pixabay images to our bucket. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4440
- e2e: fixes after editor package in web. Thank you [@hejtful](https://github.com/hejtful) in https://github.com/serlo/frontend/pull/4437
- feat(exercise): add nicer fallback feedback (random). Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4434
- Deployment. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4419

**Full Changelog**: https://github.com/serlo/frontend/compare/v0.21.3-editor...v0.21.4-editor

## Changelog for version 0.21.3

- refactor: enable Serlo-specific plugins (and renderers) in Editor. Thank you [@hejtful](https://github.com/hejtful) in https://github.com/serlo/frontend/pull/4417
- feat(editor-package): try loading renderers dynamically. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4416
- fix(editor-package): add sideEffects:false to allow tree shaking. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4415
- refactor: Editor package exports for \_\_\_experiments page. Thank you [@hejtful](https://github.com/hejtful) in https://github.com/serlo/frontend/pull/4413
- refactor: export dispatchReplaceRootDocument from package. Thank you [@hejtful](https://github.com/hejtful) in https://github.com/serlo/frontend/pull/4410
- fix(editor-help): content fixes, more videos. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4423
- chore(deps): bump katex from 0.16.11 to 0.16.21. Thank you [@dependabot[bot]](https://github.com/dependabot[bot]) in https://github.com/serlo/frontend/pull/4421
- chore(deps-dev): bump vite from 5.4.11 to 5.4.12. Thank you [@dependabot[bot]](https://github.com/dependabot[bot]) in https://github.com/serlo/frontend/pull/4420
- feat(interactive-video): add basic privacy wrapper for serlo. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4411
- fix(editor-help): small corrections. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4408
- fix(interactive-video): another focus approach, remove rewind toggle. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4400

**Full Changelog**: https://github.com/serlo/frontend/compare/v0.21.2-editor...v0.21.3-editor

## Changelog for version 0.21.2

- fix(editor-package): make testing secret optional & enable image (and related) plugins even if testing secret is missing. Thank you [@LarsTheGlidingSquirrel](https://github.com/LarsTheGlidingSquirrel) in https://github.com/serlo/frontend/pull/4405
- feat(ai-generation): add extraction of context. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4403
- fix(plugin-edusharing): make H5P embeds work again. Thank you [@LarsTheGlidingSquirrel](https://github.com/LarsTheGlidingSquirrel) in https://github.com/serlo/frontend/pull/4401
- feat(edusharing-asset): embed word as box. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4394
- feat(editor): add simple plugin help buttons. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4364

**Full Changelog**: https://github.com/serlo/frontend/compare/v0.21.1-editor...v0.21.2-editor

## Changelog for version 0.21.1

- fix(moodle): prevent style collision in moodle. Thank you [@LarsTheGlidingSquirrel](https://github.com/LarsTheGlidingSquirrel) in https://github.com/serlo/frontend/pull/4396
- fix(interactive-video): fix focus bug when creating new exercise. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4395
- refactor: remove direct Editor imports from Editor presentation. Thank you [@hejtful](https://github.com/hejtful) in https://github.com/serlo/frontend/pull/4393
- fix(interactive-video): bugfixes/improvements. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4392
- refactor: remove Next router from Course. Thank you [@hejtful](https://github.com/hejtful) in https://github.com/serlo/frontend/pull/4391
- fix: update eu logo, add text. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4387
- refactor: static math in package. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4385
- refactor(web): move strings for uuid-url-input to frontend. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4384
- Deployment. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4378

**Full Changelog**: https://github.com/serlo/frontend/compare/v0.21.0-editor...v0.21.1-editor

## Changelog for version 0.21.0

- fix(math-renderer): sanitize html from katex. Thank you [@LarsTheGlidingSquirrel](https://github.com/LarsTheGlidingSquirrel) in https://github.com/serlo/frontend/pull/4379
- fix(plugin-edusharing): use DomPurify to sanitize embed html from edu-sharing. Thank you [@LarsTheGlidingSquirrel](https://github.com/LarsTheGlidingSquirrel) in https://github.com/serlo/frontend/pull/4376
- fix(editor): Modal on serlo.org by applying high z-index only in integrations on content instead of overlay. Thank you [@CodingDive](https://github.com/CodingDive) in https://github.com/serlo/frontend/pull/4373
- fix(editor): reset styles for moodle. Thank you [@CodingDive](https://github.com/CodingDive) in https://github.com/serlo/frontend/pull/4372
- fix(link-renderer): add guard against injecting javascript in link elements through href. Thank you [@LarsTheGlidingSquirrel](https://github.com/LarsTheGlidingSquirrel) in https://github.com/serlo/frontend/pull/4371
- refactor(editor): package plugin icons as react components (to remove `dangerouslySetInnerHtml`). Thank you [@LarsTheGlidingSquirrel](https://github.com/LarsTheGlidingSquirrel) in https://github.com/serlo/frontend/pull/4370
- fix(editor): skip other checks if we found editor state in paste. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4366
- feat(editor): add email to test environment warning message. Thank you [@LarsTheGlidingSquirrel](https://github.com/LarsTheGlidingSquirrel) in https://github.com/serlo/frontend/pull/4365
- fix(plugin-edusharing): sandbox iframes to secure parent. Thank you [@LarsTheGlidingSquirrel](https://github.com/LarsTheGlidingSquirrel) in https://github.com/serlo/frontend/pull/4361
- fix(editor): Modal in moodle. Thank you [@CodingDive](https://github.com/CodingDive) in https://github.com/serlo/frontend/pull/4360
- feat(editor): add iframed demo. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4356
- feat(bildungsraum-share): copy content to clipboard. Thank you [@hejtful](https://github.com/hejtful) in https://github.com/serlo/frontend/pull/4354

**Full Changelog**: https://github.com/serlo/frontend/compare/v0.20.2-editor...v0.21.0-editor

## Changelog for version 0.20.2

- feat(editor): add learner event handler to package. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4350
- quickfix: show exercise task again. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4347
- Deployment. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4346
- refactor(image-plugin): Show better error messages when the image upload fails. Thank you [@CodingDive](https://github.com/CodingDive) in https://github.com/serlo/frontend/pull/4344
- fix(plugin-rows): whole plugin drag handle bug. Thank you [@hejtful](https://github.com/hejtful) in https://github.com/serlo/frontend/pull/4343
- feat(microadaptivity): integrate AI in final feedback. Thank you [@hugotiburtino](https://github.com/hugotiburtino) in https://github.com/serlo/frontend/pull/4338

**Full Changelog**: https://github.com/serlo/frontend/compare/v0.20.1-editor...v0.20.2-editor

## Changelog for version 0.20.1

- feat(editor-web-component): Expose language prop. Thank you [@CodingDive](https://github.com/CodingDive) in https://github.com/serlo/frontend/pull/4340

**Full Changelog**: https://github.com/serlo/frontend/compare/v0.20.0-editor...v0.20.1-editor

## Changelog for version 0.20.0

- fix(editor): Render visual/latex select in math toolbar. Thank you [@CodingDive](https://github.com/CodingDive) in https://github.com/serlo/frontend/pull/4334
- refactor(editor-packages): Throw out all mentions of shadow dom. Thank you [@CodingDive](https://github.com/CodingDive) in https://github.com/serlo/frontend/pull/4333
- feat(prototype-microadaptivity): simulate feedback block. Thank you [@LarsTheGlidingSquirrel](https://github.com/LarsTheGlidingSquirrel) in https://github.com/serlo/frontend/pull/4326
- refactor(web): hide localstorage notice on editor-preview as well. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4325
- fix(page-editor-preview): hide editor toolbar artifacts. Thank you [@LarsTheGlidingSquirrel](https://github.com/LarsTheGlidingSquirrel) in https://github.com/serlo/frontend/pull/4323
- feat(microadaptivity): fetch feedback from AI. Thank you [@hugotiburtino](https://github.com/hugotiburtino) in https://github.com/serlo/frontend/pull/4322
- Prototype: Microadaptivity - Block data layout for text and feedback blocks. Thank you [@LarsTheGlidingSquirrel](https://github.com/LarsTheGlidingSquirrel) in https://github.com/serlo/frontend/pull/4321
- feat(interactive-video): add tool to remove all marks. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4320
- feat(interactive-video): add plugin icon. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4319
- fix(input-exercise): use correct icon. Thank you [@hejtful](https://github.com/hejtful) in https://github.com/serlo/frontend/pull/4317
- refactor(plugin-injection): use open-iframe-resizer. Thank you [@hejtful](https://github.com/hejtful) in https://github.com/serlo/frontend/pull/4315
- fix(plugin-edusharing): use open-iframe-resizer. Thank you [@LarsTheGlidingSquirrel](https://github.com/LarsTheGlidingSquirrel) in https://github.com/serlo/frontend/pull/4314
- feat(plugin-rows): new plugin reorder buttons. Thank you [@hejtful](https://github.com/hejtful) in https://github.com/serlo/frontend/pull/4313
- Remove support to wikimedia videos due to data privacy reasons. Thank you [@hugotiburtino](https://github.com/hugotiburtino) in https://github.com/serlo/frontend/pull/4312
- fix(plugin-edusharing): keep overlay but let pointer events pass through. Thank you [@LarsTheGlidingSquirrel](https://github.com/LarsTheGlidingSquirrel) in https://github.com/serlo/frontend/pull/4309

**Full Changelog**: https://github.com/serlo/frontend/compare/v0.19.2-editor...v0.20.0-editor

## Changelog for version 0.19.2

- chore: upgrade Slate. Thank you [@hejtful](https://github.com/hejtful) in https://github.com/serlo/frontend/pull/4308
- fix(editor): Render toasts in Toaster. Thank you [@CodingDive](https://github.com/CodingDive) in https://github.com/serlo/frontend/pull/4307
- feat: plugin hover focus state frame shadow. Thank you [@hejtful](https://github.com/hejtful) in https://github.com/serlo/frontend/pull/4277

**Full Changelog**: https://github.com/serlo/frontend/compare/v0.19.1-editor...v0.19.2-editor

## Changelog for version 0.19.1

- fix(editor): remove fixed size from text area icon. Thank you [@LarsTheGlidingSquirrel](https://github.com/LarsTheGlidingSquirrel) in https://github.com/serlo/frontend/pull/4303
- fix(editor): allow state to be undefined/null in `SerloRenderer`. Thank you [@LarsTheGlidingSquirrel](https://github.com/LarsTheGlidingSquirrel) in https://github.com/serlo/frontend/pull/4302
- refactor(editor): normalize links only on serlo.org. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4301
- fix(plugin-edusharing): allow focusing the plugin by clicking on the content. Thank you [@LarsTheGlidingSquirrel](https://github.com/LarsTheGlidingSquirrel) in https://github.com/serlo/frontend/pull/4298
- chore: upgrade math packages and graphql-request. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4290
- fix(link-plugin): Allow absolute serlo urls in integrations. Thank you [@CodingDive](https://github.com/CodingDive) in https://github.com/serlo/frontend/pull/4289
- chore: upgrade redux etc. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4288
- chore: upgrade typescript version, bump target to es2018. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4286
- chore: upgrade react dom and misc. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4284
- chore: upgrade prettier. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4283
- chore: upgrade next & misc packages. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4282
- Add icon for text area exercise (frei text plugin). Thank you [@CodingDive](https://github.com/CodingDive) in https://github.com/serlo/frontend/pull/4276
- Revert \"chore(deps): bump @radix-ui/react-navigation-menu from 1.1.4 to 1.2.1\". Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4272
- chore(deps): bump @radix-ui/react-navigation-menu from 1.1.4 to 1.2.1. Thank you [@dependabot[bot]](https://github.com/dependabot[bot]) in https://github.com/serlo/frontend/pull/4266
- chore(deps): bump clsx from 2.1.0 to 2.1.1. Thank you [@dependabot[bot]](https://github.com/dependabot[bot]) in https://github.com/serlo/frontend/pull/4265
- refactor(editor): remove upload tagging code. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4260
- refactor(editor): adapt variable name from imgSrc to fileUrl. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4259
- fix(plugin-edusharing): fix visual errors in embeds. Thank you [@LarsTheGlidingSquirrel](https://github.com/LarsTheGlidingSquirrel) in https://github.com/serlo/frontend/pull/4258
- refactor(editor): adapt upload code to changes on server, get parent host for usage in iframe. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4257
- fix(editor): commit temporary actions to history only after resolving them. Thank you [@hejtful](https://github.com/hejtful) in https://github.com/serlo/frontend/pull/4252
- feat(editor): add user id to image upload. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4251
- fix(editor): adapt image proxy rule. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4250
- chore: migrate eslint to use new config format. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4249
- Production. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4245
- Deploy: fix(editor): update injection url for production. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4244
- Deployment. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4243
- refactor: move some tailwind theme stuff to frontend. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4240
- refactor(edusharing-asset): replace react-modal. Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4239
- refactor(editor): add image proxy for privacy (serlo-only). Thank you [@elbotho](https://github.com/elbotho) in https://github.com/serlo/frontend/pull/4224

**Full Changelog**: https://github.com/serlo/frontend/compare/v0.19.0-editor...v0.19.1-editor

## Changelog for version 0.19.0

- refactor(editor): remove css injected by js plugin. Thank you [@hejtful](https://github.com/hejtful) in https://github.com/serlo/frontend/pull/4234

**Full Changelog**: https://github.com/serlo/frontend/compare/v0.18.0-editor...v0.19.0-editor

## Changelog for version 0.18.0

- docs(editor): Document that plugins config can't be dynamically changed. Thank you [@CodingDive](https://github.com/CodingDive) in https://github.com/serlo/frontend/pull/4233
- fix(editor): Inline math should not have a line break when opening latex editor. Thank you [@CodingDive](https://github.com/CodingDive) in https://github.com/serlo/frontend/pull/4232
- fix(blanks-exercise): warn before switching between text and table. Thank you [@hejtful](https://github.com/hejtful) in https://github.com/serlo/frontend/pull/4228
- fix(dropzone-image): ignore empty dropzones for check button visibility logic. Thank you [@hejtful](https://github.com/hejtful) in https://github.com/serlo/frontend/pull/4227
- feat(editor): Enable video plugin for integrations. Thank you [@CodingDive](https://github.com/CodingDive) in https://github.com/serlo/frontend/pull/4226
- fix(plugin-image): pixabay search vertical scroll bug on narrow screens. Thank you [@hejtful](https://github.com/hejtful) in https://github.com/serlo/frontend/pull/4223

**Full Changelog**: https://github.com/serlo/frontend/compare/v0.17.0-editor...v0.18.0-editor

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
