export function isObject(val) {
    return val !== null && typeof val === 'object' && Array.isArray(val) === false;
}

export function isArray(val) {
    return Array.isArray(val);
}

export function isNumber(val) {
    return typeof val === 'number';
}

export function isString(val) {
    return typeof val === 'string';
}