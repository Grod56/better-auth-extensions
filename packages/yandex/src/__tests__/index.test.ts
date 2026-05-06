import { YandexPermission, getYandexOAuthPlugin } from "../index.js";
import { testData } from "./data.js";

describe("getYandexOAuthPlugin()", () => {
	it("produces corresponding output from input", () => {
		const permissionScopeMap = new Map<YandexPermission, string>([
			["user-info", "login:info"],
			["email", "login:email"],
			["profile-picture", "login:avatar"],
		]);
		const result = getYandexOAuthPlugin(
			testData.clientId,
			testData.clientSecret,
			testData.permissions,
		);

		expect(result.clientId).toBe(testData.clientId);
		expect(result.clientSecret).toBe(testData.clientSecret);
		expect(result.authorizationUrlParams).toBeDefined();
		if ("scope" in result.authorizationUrlParams!) {
			const scopes = result.authorizationUrlParams.scope.split(" ");
			testData.permissions.forEach(permission =>
				expect(scopes).toContain(permissionScopeMap.get(permission)),
			);
		} else {
			fail("No scope in authorizationUrlParams");
		}
	});
});
