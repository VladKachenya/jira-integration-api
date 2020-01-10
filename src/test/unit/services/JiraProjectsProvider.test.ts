import request from "request-promise";
import * as Provider from "../../../app/services/JiraProjectsProvider";

jest.mock("request-promise");

describe("JiraProjectsProvider", () => {
    test("an empty query string", async () => {
        (request as any).mockImplementation(() => '{"features": []}');
        const result = await Provider.getProjects("Some text", "Some text", "Some text");
        expect(result).toEqual({ features: [] });
    });

    test("an invalid non-json response", async () => {
        (request as any).mockImplementation(() => "Service Unavailable.");
        await expect(Provider.getProjects("Some text", "Some text", "Some text")).rejects.toThrow(SyntaxError);
    });
});