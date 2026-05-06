import { YandexPermission } from "../index.js";

export const testData = {
	clientId: "Testing_Client_ID",
	clientSecret: "Testing_Secret",
	permissions: ["user-info", "email"] satisfies YandexPermission[],
};
