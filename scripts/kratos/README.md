# Integration frontend.serlo.org - Kratos

## Getting started

1. Run `yarn kratos`
2. Run `yarn kraros:prepare`
3. In the api.serlo.org/packages/server/src/internals/server/graphql-middleware.ts change to the following lines:

```
    const serviceToken = jwt.sign({}, process.env.SERLO_ORG_SECRET, {
    audience: 'api.serlo.org',
    issuer: Service.Serlo,
    })
    const user = authorizationHeader.replace('Bearer ', '')
    const headerFromCloudFlare =  `Serlo Service=${serviceToken};User=${user}`
    return handleAuthentication(headerFromCloudFlare, async (token) => {
```

4. Head to `localhost:3000/login`. ID: `dev`, password `123456`

Note: You may have to enable cors in you browser. Use an extension for that, like
