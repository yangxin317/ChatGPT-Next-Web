// Mock modules that contain JSX/TSX or browser APIs to avoid issues in Node
jest.mock("../app/components/ui-lib", () => ({
  showToast: jest.fn(),
}));

jest.mock("../app/locales", () => ({
  __esModule: true,
  default: {
    Copy: { Success: "Copied", Failed: "Failed" },
  },
}));

import { trimTopic } from "../app/utils";

describe("trimTopic", () => {
  it("should remove trailing Chinese punctuation", () => {
    expect(trimTopic("你好，")).toBe("你好");
    expect(trimTopic("你好。")).toBe("你好");
    expect(trimTopic("你好！")).toBe("你好");
    expect(trimTopic("你好？")).toBe("你好");
  });

  it("should remove trailing English punctuation", () => {
    expect(trimTopic("hello,")).toBe("hello");
    expect(trimTopic("hello.")).toBe("hello");
    expect(trimTopic("hello!")).toBe("hello");
    expect(trimTopic("hello?")).toBe("hello");
  });

  it("should remove trailing quotes", () => {
    expect(trimTopic('hello"')).toBe("hello");
    expect(trimTopic("hello\u201C")).toBe("hello");
    expect(trimTopic("hello\u201D")).toBe("hello");
  });

  it("should remove multiple trailing punctuation marks", () => {
    expect(trimTopic("hello...")).toBe("hello");
    expect(trimTopic("hello！！")).toBe("hello");
    expect(trimTopic("hello,.!?")).toBe("hello");
  });

  it("should not modify strings without trailing punctuation", () => {
    expect(trimTopic("hello")).toBe("hello");
    expect(trimTopic("你好")).toBe("你好");
    expect(trimTopic("")).toBe("");
  });

  it("should only remove trailing punctuation, not internal", () => {
    expect(trimTopic("hello, world")).toBe("hello, world");
    expect(trimTopic("你好，世界")).toBe("你好，世界");
  });
});
