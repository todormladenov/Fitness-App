export function setItem(key: string, value: string) {
    sessionStorage.setItem(key, value);
}

export function getItem(key: string) {
    return sessionStorage.getItem(key);
}

export function removeItem(key: string) {
    sessionStorage.removeItem(key);
}