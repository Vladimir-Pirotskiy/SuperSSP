/**
 * Помощник для преобразования формата pubProvidedIds в формат, который подходит для нашего сервера
 */
export function transformPubProvidedIds(pubProvidedIds) {
    const transformed = {};
    for (let source in pubProvidedIds) {
        transformed[source] = pubProvidedIds[source].map(id => id.id);
    }
    return transformed;
}

/**
 * Помощник для создания объекта mediaType, основанного на размерах.
 */
export function buildMediaType(sizes) {
    return {
        banner: {
            sizes: sizes,
        },
    };
}

/**
 * Помощник для создания объекта site, основанного на URL-адресе и домене
 */
export function buildSite(page, domain, publisherDomain) {
    return {
        page: page,
        domain: domain,
        publisher: {
            domain: publisherDomain,
        },
    };
}

/**
 * Помощник для создания объекта device, основанного на ширине и высоте
 */
export function buildDevice(w, h) {
    return {
        w: w,
        h: h,
    };
}
