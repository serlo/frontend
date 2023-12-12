# @serlo/e2e-tests

integration tests for serlo.org

```sh
cd e2e-tests
yarn
# sometimes you might need to install playwright browsers manually
# npx playwright install
cd ..
yarn e2e
```

The output should look something like that:

![grafik](https://user-images.githubusercontent.com/13507950/210520199-ad502693-8f84-4956-9417-f750a243911d.png)

Tests are written with Playwright (wrapped by CodeceptJS), extensive documentation can be found at https://codecept.io/helpers/Playwright/

To run a single test, use `--grep`:

```sh
yarn e2e --grep "Quickbar"
```

You can also run a single file:

```sh
yarn e2e tests/000-general.ts
```

Run all editor tests:

```sh
yarn e2e tests/4*.ts
```

You can run tests on firefox instead of chromium with

```sh
yarn e2e-firefox
```

The tests are written in `/tests`, the file names are setting the order of execution. The browser session is stored between tests, TypeScript is supported.
