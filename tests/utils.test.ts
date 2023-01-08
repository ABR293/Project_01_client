import { DataArraySharp } from "@mui/icons-material";
import {
  AuthValidationErrors,
  FormValidation,
  validateEmail,
  validateForm,
  validatePassword,
  validatePasswordRepeat,
} from "../utils/formValidators";

describe("validateEmail testing", () => {
  test("e-mail correct", () => {
    expect(validateEmail("test@trol.ru")).toBeNull();
  });
  test("e-mail have no text between @ and .", () => {
    expect(validateEmail("test@.ru")).toBe(AuthValidationErrors.InvalidMail);
  });

  test("e-mail isn`t e-mail", () => {
    expect(validateEmail("tsadse")).toBe(AuthValidationErrors.InvalidMail);
  });

  test("e-mail have a lot of trash", () => {
    expect(validateEmail("@tr@.d@l.l.ru")).toBe(
      AuthValidationErrors.InvalidMail
    );
  });

  test("e-mail have no start", () => {
    expect(validateEmail("@troll.ru")).toBe(AuthValidationErrors.InvalidMail);
  });
});

describe("validatePassword testing", () => {
  test("password correct", () => {
    expect(validatePassword("qw68sd")).toBeNull();
  });

  test("password is less then 6 symbols", () => {
    expect(validatePassword("qwe", 6)).toBe(
      "Your password must be at least 6 characters"
    );
  });

  test("password have no letters", () => {
    expect(validatePassword("123456", 6)).toBe(
      AuthValidationErrors.NoletterInPass
    );
  });
});

describe("validatePasswordRepeat testing", () => {
  test("equal passwords", () => {
    expect(validatePasswordRepeat("qw68sd", "qw68sd")).toBeNull();
  });
  test("not equal passwords", () => {
    expect(validatePasswordRepeat("qw68sd", "qw68zd")).toBe(
      AuthValidationErrors.DiffPassValues
    );
  });
});

describe("validateForm testing", () => {
  beforeAll(() => {});

  const validateEmail = jest.fn().mockReturnValue(null);
  const validatePassword = jest.fn().mockReturnValue(null);
  const validatePasswordRepeat = jest.fn().mockReturnValue(null);

  test("Form validation functions calls", () => {
    const data = new FormData();
    data.append("login", "login");
    data.append("password", "password");
    data.append("passwordRepeat", "passwordRepeat");

    // validateForm(data);
    // applyToAll(validateEmail);

    // expect(validateEmail).toHaveBeenCalled();
  });
});
