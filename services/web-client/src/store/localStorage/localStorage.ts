const PREFIX = 'dotaFight_';

const getKeyWithPrefix = (key: string) => PREFIX + key;

export const getItemFromLocalStorage = <T>(key: string): T | null => {
	const keyWithPrefix = getKeyWithPrefix(key);
	const item = localStorage.getItem(keyWithPrefix);
	if (item === null) return null;
	try {
		return JSON.parse(item) as T;
	} catch (e) {
		console.error(`Error parsing localStorage key "${key}":`, e);
		return null;
	}
}

export const setItemInLocalStorage = <T>(key: string, value: T): boolean => {
	try {
		const keyWithPrefix = getKeyWithPrefix(key);
		localStorage.setItem(keyWithPrefix, JSON.stringify(value));
		return true
	} catch (error) {
		console.error(`Error setting localStorage key "${key}":`, error);
		return false
	}
}

export const removeItemFromLocalStorage = (key: string): void => {
	const keyWithPrefix = getKeyWithPrefix(key);
	localStorage.removeItem(keyWithPrefix);
}

export const clearLocalStorage = (): void => {
	localStorage.clear();
}