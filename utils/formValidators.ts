export function validatePassword(p: string, minLength = 6) {
  let errors = [];
  if (p.length < minLength) {
    errors.push(`Your password must be at least ${minLength} characters`);
  }
  if (p.search(/[a-z]/i) < 0) {
    errors.push(AuthValidationErrors.NoletterInPass);
  }
  if (errors.length > 0) {
    return errors.join("\n");
  }
  return null;
}

export function validatePasswordRepeat(
  passwordRepeat: string,
  password: string
) {
  return passwordRepeat === password
    ? null
    : AuthValidationErrors.DiffPassValues;
}

export function validateEmail(email: string) {
  const emailRegexp = new RegExp(
    /^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i
  );
  return !emailRegexp.test(email) ? AuthValidationErrors.InvalidMail : null;
}

export class FormValidation {
  private pass = "";

  login(v: string) {
    return validateEmail(v);
  }
  password(v: string) {
    this.pass = v;
    return validatePassword(v);
  }
  passwordRepeat(v: string) {
    return validatePasswordRepeat(v, this.pass);
  }
}

export const validateForm = (data: FormData) => {
  let formValidation = new FormValidation();
  let errors = {} as any;
  for (let [key, value] of data) {
    if (!!formValidation[key as keyof FormValidation]) {
      errors[key] = formValidation[key as keyof FormValidation](
        value as string
      );
    }
  }
  return errors;
};

export enum AuthValidationErrors {
  NoletterInPass = "Your password must contain at least one letter.",
  InvalidMail = "e-mail is not valid",
  DiffPassValues = "passwords are different",
}
