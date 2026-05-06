# better-auth-extensions/yandex

[![build](https://github.com/Grod56/better-auth-extensions/actions/workflows/yandex-build.yml/badge.svg)](https://github.com/Grod56/better-auth-extensions/actions/workflows/yandex-build.yml) [![npm](https://img.shields.io/npm/v/%40better-auth-extensions%2Fyandex)](https://www.npmjs.com/package/@better-auth-extensions/yandex) [![NPM Downloads](https://img.shields.io/npm/d18m/%40better-auth-extensions%2Fyandex)](https://www.npmjs.com/package/better-auth-extensions/yandex)

Yandex extensions and plugins for better-auth.

## Installation

```console
npm install @better-auth-extensions/yandex
```

## Documentation

### `getYandexOAuthPlugin(clientId, clientSecret, permissions?)`

Produces Yandex [`GenericOAuthConfig`](https://better-auth.com/docs/plugins/generic-oauth) object which may be used as a Generic OAuth plugin. It takes in the Client ID, and Client Secret of the Yandex Application and an optional list of permissions to be used for the application.

#### Example

Including the Yandex plugin in the `better-auth` configuration:

`auth.ts`

```typescript
import { betterAuth } from "better-auth";
import { genericOAuth } from "better-auth/plugins";

const yandexConfig = getYandexOAuthPlugin(
	process.env.YANDEX_CLIENT_ID,
	process.env.YANDEX_CLIENT_SECRET,
);

export const auth = betterAuth({
	// ... other config options
	plugins: [
		genericOAuth({
			config: [yandexConfig],
		}),
	],
});
```

Setting up the `better-auth` client:

`lib/auth-client.ts`

```typescript
import { createAuthClient } from "better-auth/react";
import { genericOAuthClient } from "better-auth/client/plugins";

export const { signIn, signUp, useSession } = createAuthClient({
	plugins: [genericOAuthClient()],
});
```

Using the Yandex plugin to sign in:

`lib/components/SignInButton.tsx`

```tsx
import { signIn } from "../auth-client";

export default function SignInButton({ endpoint }: { endpoint: string }) {
	return (
		<button
			onClick={() => {
				signIn.oauth2({
					providerId: "yandex",
					callbackURL: endpoint,
				});
			}}
		>
			{"Sign in with Yandex"}
		</button>
	);
}
```

## See More

- [Better-Auth Documentation](https://better-auth.com/docs/installation)
