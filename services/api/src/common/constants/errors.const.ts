// create user validations errors

export const ERROR_NAME_TOO_SHORT = 'Name must have at least 2 characters.';
export const ERROR_USERNAME_TOO_SHORT =
	'Username must have at least 3 characters.';
export const ERROR_USERNAME_NOT_ALPHANUMERIC =
	'Username does not allow other than alpha numeric chars.';
export const ERROR_EMAIL_INVALID = 'Please provide valid Email.';
export const ERROR_PASSWORD_INVALID = `Password must contain:
- Minimum 8 and maximum 20 characters,
- At least one uppercase letter,
- One lowercase letter,
- One number,
- One special character.`;

// user CRUD errors
export const ERROR_USER_WITH_ID_NOT_FOUND = `User with id not found`;
