export const ms = (input: string | number): number => {
	if (typeof input === 'number' && isFinite(input)) return input;

	if (typeof input !== 'string') {
		throw new Error('Invalid input: expected string or number');
	}

	const match = /^(\d+(?:\.\d+)?)(ms|s|m|h|d|w|y)?$/.exec(input.trim());

	if (!match) return NaN;

	const value = parseFloat(match[1]);
	const unit = match[2] || 'ms';

	switch (unit) {
		case 'ms':
			return value;
		case 's':
			return value * 1000;
		case 'm':
			return value * 60 * 1000;
		case 'h':
			return value * 60 * 60 * 1000;
		case 'd':
			return value * 24 * 60 * 60 * 1000;
		case 'w':
			return value * 7 * 24 * 60 * 60 * 1000;
		case 'y':
			return value * 365.25 * 24 * 60 * 60 * 1000;
		default:
			throw new Error(`Unsupported unit: "${unit}"`);
	}
};
