// Mock modules that contain JSX/TSX to avoid transformation issues
jest.mock("../app/components/ui-lib", () => ({
  showToast: jest.fn(),
}));

jest.mock("../app/requests", () => ({
  ControllerPool: { addController: jest.fn(), remove: jest.fn() },
  requestChatStream: jest.fn(),
  requestWithPrompt: jest.fn(),
}));

import {
  createMessage,
  limitNumber,
  limitModel,
  ModalConfigValidator,
  ALL_MODELS,
  SubmitKey,
  Theme,
} from "../app/store/app";

describe("createMessage", () => {
  it("should create a message with default values", () => {
    const msg = createMessage({});
    expect(msg.role).toBe("user");
    expect(msg.content).toBe("");
    expect(msg.date).toBeDefined();
    expect(msg.id).toBeDefined();
  });

  it("should allow overriding role and content", () => {
    const msg = createMessage({ role: "assistant", content: "Hello!" });
    expect(msg.role).toBe("assistant");
    expect(msg.content).toBe("Hello!");
  });

  it("should allow setting streaming flag", () => {
    const msg = createMessage({ streaming: true });
    expect(msg.streaming).toBe(true);
  });

  it("should allow setting error flag", () => {
    const msg = createMessage({ isError: true });
    expect(msg.isError).toBe(true);
  });
});

describe("limitNumber", () => {
  it("should clamp number within range", () => {
    expect(limitNumber(5, 0, 10, 0)).toBe(5);
    expect(limitNumber(-1, 0, 10, 0)).toBe(0);
    expect(limitNumber(15, 0, 10, 0)).toBe(10);
  });

  it("should return default for NaN", () => {
    expect(limitNumber(NaN, 0, 10, 5)).toBe(5);
  });

  it("should return default for non-number types", () => {
    expect(limitNumber("abc" as any, 0, 10, 5)).toBe(5);
    expect(limitNumber(undefined as any, 0, 10, 5)).toBe(5);
    expect(limitNumber(null as any, 0, 10, 5)).toBe(5);
  });

  it("should handle boundary values", () => {
    expect(limitNumber(0, 0, 10, 5)).toBe(0);
    expect(limitNumber(10, 0, 10, 5)).toBe(10);
  });

  it("should handle negative ranges", () => {
    expect(limitNumber(-1, -2, 2, 0)).toBe(-1);
    expect(limitNumber(-3, -2, 2, 0)).toBe(-2);
    expect(limitNumber(3, -2, 2, 0)).toBe(2);
  });
});

describe("limitModel", () => {
  it("should return the model name if it's available", () => {
    expect(limitModel("gpt-3.5-turbo")).toBe("gpt-3.5-turbo");
    expect(limitModel("gpt-3.5-turbo-0301")).toBe("gpt-3.5-turbo-0301");
  });

  it("should return default model for unknown model names", () => {
    expect(limitModel("unknown-model")).toBe("gpt-3.5-turbo");
  });

  it("should return default model for empty string", () => {
    expect(limitModel("")).toBe("gpt-3.5-turbo");
  });
});

describe("ModalConfigValidator", () => {
  describe("model", () => {
    it("should validate known models", () => {
      expect(ModalConfigValidator.model("gpt-3.5-turbo")).toBe(
        "gpt-3.5-turbo",
      );
    });

    it("should fall back for unknown models", () => {
      expect(ModalConfigValidator.model("unknown")).toBe("gpt-3.5-turbo");
    });
  });

  describe("max_tokens", () => {
    it("should clamp max_tokens to valid range", () => {
      expect(ModalConfigValidator.max_tokens(2000)).toBe(2000);
      expect(ModalConfigValidator.max_tokens(-1)).toBe(0);
      expect(ModalConfigValidator.max_tokens(50000)).toBe(32000);
    });

    it("should return default for NaN", () => {
      expect(ModalConfigValidator.max_tokens(NaN)).toBe(2000);
    });
  });

  describe("presence_penalty", () => {
    it("should clamp presence_penalty to valid range", () => {
      expect(ModalConfigValidator.presence_penalty(0)).toBe(0);
      expect(ModalConfigValidator.presence_penalty(-3)).toBe(-2);
      expect(ModalConfigValidator.presence_penalty(3)).toBe(2);
    });

    it("should return default for NaN", () => {
      expect(ModalConfigValidator.presence_penalty(NaN)).toBe(0);
    });
  });

  describe("temperature", () => {
    it("should clamp temperature to valid range", () => {
      expect(ModalConfigValidator.temperature(1)).toBe(1);
      expect(ModalConfigValidator.temperature(-1)).toBe(0);
      expect(ModalConfigValidator.temperature(3)).toBe(2);
    });

    it("should return default for NaN", () => {
      expect(ModalConfigValidator.temperature(NaN)).toBe(1);
    });
  });
});

describe("ALL_MODELS", () => {
  it("should contain gpt-3.5-turbo", () => {
    const model = ALL_MODELS.find((m) => m.name === "gpt-3.5-turbo");
    expect(model).toBeDefined();
    expect(model?.available).toBe(true);
  });

  it("should contain gpt-4", () => {
    const model = ALL_MODELS.find((m) => m.name === "gpt-4");
    expect(model).toBeDefined();
  });

  it("should have 6 models", () => {
    expect(ALL_MODELS).toHaveLength(6);
  });
});

describe("Enums", () => {
  it("should define SubmitKey values", () => {
    expect(SubmitKey.Enter).toBe("Enter");
    expect(SubmitKey.CtrlEnter).toBe("Ctrl + Enter");
    expect(SubmitKey.ShiftEnter).toBe("Shift + Enter");
    expect(SubmitKey.AltEnter).toBe("Alt + Enter");
    expect(SubmitKey.MetaEnter).toBe("Meta + Enter");
  });

  it("should define Theme values", () => {
    expect(Theme.Auto).toBe("auto");
    expect(Theme.Dark).toBe("dark");
    expect(Theme.Light).toBe("light");
  });
});
