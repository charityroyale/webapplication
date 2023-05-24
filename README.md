# Charity Royale

[![Netlify Status](https://api.netlify.com/api/v1/badges/80d9e241-c904-43c5-8b4d-209773aca89b/deploy-status)](https://app.netlify.com/sites/charityroyale2020/deploys)

https://charityroyale.at/

![Logo of CharityRoyale](public/cr_logo_small.png)

# Setup

See [.nvmrc](/.nvmrc)  
Run `npm install`  
See [package.json](/package.json)

# Secrets

See [.env.local.example](/.env.local.example)

# Obtain App Access token

https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/#client-credentials-grant-flow

```
curl -X POST \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET&grant_type=client_credentials" \
  https://id.twitch.tv/oauth2/token
```
