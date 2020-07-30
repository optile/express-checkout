import { getLongIdFromRedirectUrl } from "./actions.redux";

describe("test util function getLongIdFromRedirectUrl", () => {
    it("should return the longId from the url", () => {
        expect(getLongIdFromRedirectUrl("http://baseurl.com/123456789")).toBe("123456789");
    });
});
