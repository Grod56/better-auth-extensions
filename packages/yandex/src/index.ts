import type { GenericOAuthConfig } from "better-auth/plugins";

type Scope = "login:email" | "login:info" | "login:avatar";

export type YandexPermission = "email" | "user-info" | "profile-picture";

function getScope(permission: YandexPermission): Scope {
	switch (permission) {
		case "email":
			return "login:email";
		case "user-info":
			return "login:info";
		case "profile-picture":
			return "login:avatar";
	}
}

/**
 * Returns Yandex config which may be used as a Generic OAuth plugin.
 * 
 * @example 
 *  import { betterAuth } from "better-auth"
 *  import { genericOAuth } from "better-auth/plugins"

 *  const yandexConfig = getYandexOAuthPlugin(
 *		process.env.YANDEX_CLIENT_ID,
 *		process.env.YANDEX_CLIENT_SECRET
 *  )
 *   
 *  export const auth = betterAuth({
 *      // ... other config options
 *      plugins: [
 *          genericOAuth({ 
 *              config: [yandexConfig] 
 *          }) 
 *      ]
 *  })
 *  
 * @param clientId Yandex Client ID
 * @param clientSecret Yandex Client Secret
 * @param permissions OAuth Permissions to be used for application. Defaults to email, user info, and profile picture when left undefined.
 * @see https://better-auth.com/docs/plugins/generic-oauth
 */
export function getYandexOAuthPlugin(
	clientId: string,
	clientSecret: string,
	permissions?: YandexPermission[],
): GenericOAuthConfig {
	const uniquePermissions: YandexPermission[] =
		permissions != undefined
			? [...new Set(permissions)]
			: [...new Set(["email", "user-info", "profile-picture"] as const)];
	return {
		providerId: "yandex",
		clientId: clientId,
		clientSecret: clientSecret,
		authorizationUrl: "https://oauth.yandex.com/authorize",
		authorizationUrlParams: {
			scope: uniquePermissions
				.map(permission => getScope(permission))
				.join(" "),
		},
		tokenUrl: "https://oauth.yandex.com/token",
		userInfoUrl: "https://login.yandex.ru/info?format=json",
		mapProfileToUser(profile) {
			return {
				id: profile.id,
				name:
					profile.display_name ??
					profile.real_name ??
					profile.first_name,
				email: profile.default_email ?? profile.emails?.[0] ?? null,
				image:
					!profile.is_avatar_empty && profile.default_avatar_id
						? `https://avatars.yandex.net/get-yapic/${profile.default_avatar_id}/islands-200`
						: null,
			};
		},
	} satisfies GenericOAuthConfig;
}
