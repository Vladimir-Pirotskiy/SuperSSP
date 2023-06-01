let registeredBidders = {};

function registerBidder(spec) {
    if (!spec || !spec.code) {
        throw new Error('Bidder spec is not correctly formed. "code" is required.');
    }

    if (registeredBidders[spec.code]) {
        throw new Error(`Bidder with code "${spec.code}" is already registered.`);
    }

    registeredBidders[spec.code] = spec;
}

function getRegisteredBidders() {
    return registeredBidders;
}

module.exports = {
    registerBidder,
    getRegisteredBidders
};
