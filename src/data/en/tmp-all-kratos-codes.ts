// temporary storage of all code strings. we probably need only a small portion of them
// source: https://github.com/ory/docs/blob/master/docs/kratos/concepts/messages.json

export const codes = {
  1010001: 'Sign in',
  // 1010001: 'Sign in with security key',
  1010002: 'Sign in with %provider%',
  // 1010003: 'Please confirm this action by verifying that it is you.',
  1010004: 'Please complete the second authentication challenge.',
  1010005: 'Verify',
  1010006: 'Authentication code',
  1010007: 'Backup recovery code',
  1010008: 'Use security key',
  1010009: 'Use Authenticator',
  1010010: 'Use backup recovery code',
  1010011: 'Continue with security key',
  1010012:
    'Prepare your WebAuthn device (e.g. security key, biometrics scanner, ...) and press continue.',
  1010013: 'Continue',
  1040001: 'Sign up',
  1040002: 'Sign up with %provider%',
  1040003: 'Continue',
  1040004: 'Sign up with security key',
  1050001: 'Your changes have been saved!',
  // 1050002: 'Link %provider%',
  // 1050003: 'Unlink %provider%',
  // 1050004: 'Unlink TOTP Authenticator App',
  // 1050005: 'Authenticator app QR code',
  // 1050006: '%secret%',
  // 1050007: 'Reveal backup recovery codes',
  // 1050008: 'Generate new backup recovery codes',
  // 1050009: '%secret%',
  // 1050010:
  //   'These are your back up recovery codes. Please keep them in a safe place!',
  // 1050011: 'Confirm backup recovery codes',
  // 1050012: 'Add security key',
  // 1050012: 'Add security key',
  // 1050013: 'Name of the security key',
  // 1050014: 'Secret was used at %used_at%',
  1050015: '', // %code-1%, %code-2%
  // 1050016: 'Disable this method',
  // 1050017:
  //   'This is your authenticator app secret. Use it if you can not scan the QR code.',
  // 1050018: 'Remove security key "%name%"',
  1060001:
    'You successfully recovered your account. Please change your password within the next 2 minutes.',
  // 1060002:
  //   'An email containing a recovery link has been sent to the email address you provided.',
  1070001: 'Password',
  1070002: '%title%',
  // 1070003: 'Save',
  1070004: 'ID',
  // 1070005: 'Submit',
  1070006: 'Verify code',
  1070007: 'Email',
  1080001:
    'An email containing a verification link has been sent to the email address you provided.',
  1080002: 'You successfully verified your email address.',
  4000001: '%reason%',
  4000002: 'Property %field% is missing.',
  4000003: 'Length must be \u003e= %expected_length%, but got %actual_length%.',
  4000004: '"%value%" is not valid "%format%"',
  4000005: 'The password can not be used because %reason%.',
  4000006:
    'The provided credentials are invalid, check for spelling mistakes in your password, username or email address.',
  4000007: 'An account with the same email and/or username exists already.',
  4000008: 'The provided authentication code is invalid, please try again.',
  // 4000009:
  //   'Could not find any login identifiers. Did you forget to set them? This could also be caused by a server misconfiguration.',
  4000010:
    'Account not active yet. Did you forget to verify your email address?',
  // 4000011: 'You have no TOTP device set up.',
  // 4000012: 'This backup recovery code has already been used.',
  // 4000013: 'You have no WebAuthn device set up.',
  // 4000014: 'You have no backup recovery codes set up.',
  // 4000015: 'This account does not exist or has no security key set up.',
  // 4000016: 'The backup recovery code is not valid.',
  // 4010001: 'The login flow expired 0.02 minutes ago, please try again.',
  // 4010002:
  //   'Could not find a strategy to log you in with. Did you fill out the form correctly?',
  // 4010003:
  //   'Could not find a strategy to sign you up with. Did you fill out the form correctly?',
  // 4010004:
  //   'Could not find a strategy to update your settings. Did you fill out the form correctly?',
  // 4010005:
  //   'Could not find a strategy to recover your account with. Did you fill out the form correctly?',
  // 4010006:
  //   'Could not find a strategy to verify your account with. Did you fill out the form correctly?',
  4040001: 'The registration flow expired 2 minutes ago, please try again.',
  4050001: 'The settings flow expired 2 minutes ago, please try again.',
  4060001:
    'The request was already completed successfully and can not be retried.',
  4060002: 'The recovery flow reached a failure state and must be retried.',
  // 4060004:
  //   'The recovery token is invalid or has already been used. Please retry the flow.',
  4060005: 'The recovery flow expired 2 minutes ago, please try again.',
  // 4070001:
  //   'The verification token is invalid or has already been used. Please retry the flow.',
  4070002:
    'The request was already completed successfully and can not be retried.',
  4070003: 'The verification flow reached a failure state and must be retried.',
  4070005: 'The verification flow expired 2 minutes ago, please try again.',
  5000001: '%reason%',
}
