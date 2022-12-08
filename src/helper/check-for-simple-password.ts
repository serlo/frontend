export function checkForSimplePassword(password?: string) {
  if (!password) return false
  if (/^[0-9]+$/.test(password)) return true
  if (password.length < 12) {
    const withoutCommonNumbers = password
      .replace('123', '')
      .replace('1234', '')
      .replace('1', '')
    if (/^[a-z]+$/.test(withoutCommonNumbers)) return true
  }
  if (veryCommonPasswords.includes(password)) return true
  return false
}

const veryCommonPasswords = [
  '1q2w3e',
  'aa12345678',
  'million2',
  'aaron431',
  'qqww1122',
  'qwer123456',
  'jacket025',
  "1'q2w3e4r",
  'ohmnamah23',
  "1'q2w3e4r5t",
  'a123456789',
  "1234'qwer",
  'jordan23',
  "123456789'a",
  'blink182',
  "x4ivyg'a51f",
  'jakcgt333',
  'q1w2e3r4',
  'passw0rd',
]
