# Charity Royale

[![Netlify Status](https://api.netlify.com/api/v1/badges/80d9e241-c904-43c5-8b4d-209773aca89b/deploy-status)](https://app.netlify.com/sites/charityroyale2020/deploys)

https://charityroyale.at/

![Logo of CharityRoyale](public/cr_logo_small.png)

# Setup

See [.nvmrc](/.nvmrc)  
Run `npm install`  
See [package.json](/package.json)

## Secrets

See [.env.local.example](/.env.local.example)

## Obtain App Access token

https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/#client-credentials-grant-flow

```
curl -X POST \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET&grant_type=client_credentials" \
  https://id.twitch.tv/oauth2/token
```

# Development

## Feature Development and Release Cycle

The project uses a netlify hosting plan to build, deploy and host charityroyale.at. `main` is defined as development branch and is expected to stay in sync with `release`. Any feature development is expected to a pullrequest to `main`. Once merged to `main`, the latest version is merged into `release` by hand. Changes to `release` trigger the netlify build pipeline and is automatically deployed.
The project uses the nextjs static export which exports at build time all code in static html pages and bundles the relevant assets into the `out` folder which are then served by netlify (ssg pages).

## Decap CMS (formerly Netlify CMS)

This is especially useful when changes through the Decap CMS interface are done, which changes `/_cms/charity-royale.md` in the `release` branch as a new commit. Changes to `/_cms/charity-royale.md` should not be done by hand.  
Changes to the Decap CMS UI are done via `config.yml` changes.
