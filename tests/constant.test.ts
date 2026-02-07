import { OWNER, REPO, REPO_URL, ISSUE_URL, UPDATE_URL } from "../app/constant";

describe("Constants", () => {
  it("should have correct OWNER", () => {
    expect(OWNER).toBe("Yidadaa");
  });

  it("should have correct REPO", () => {
    expect(REPO).toBe("ChatGPT-Next-Web");
  });

  it("should have correct REPO_URL", () => {
    expect(REPO_URL).toBe("https://github.com/Yidadaa/ChatGPT-Next-Web");
  });

  it("should have correct ISSUE_URL", () => {
    expect(ISSUE_URL).toBe(
      "https://github.com/Yidadaa/ChatGPT-Next-Web/issues",
    );
  });

  it("should have correct UPDATE_URL", () => {
    expect(UPDATE_URL).toBe(
      "https://github.com/Yidadaa/ChatGPT-Next-Web#keep-updated",
    );
  });
});
