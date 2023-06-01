import {registerBidder} from '../../src/adapters/bidderFactory';

const BIDDER_CODE = 'superssp';
const BID_URL = 'http://www.superssp.com:1234/api/v1';

function isBidRequestValid(bid) {
    return !!(bid.params.ssspUid && bid.params.adUnitCode && bid.params.auctionId && bid.params.bidId);
}

function buildRequests(validBidRequests, bidderRequest) {
    return validBidRequests.map(bidRequest => {
        const payload = {
            ssspUid: bidRequest.params.ssspUid,
            adUnitCode: bidRequest.params.adUnitCode,
            auctionId: bidRequest.params.auctionId,
            bidId: bidRequest.params.bidId,
            mediaType: bidRequest.params.mediaType,
            site: bidRequest.params.site,
            device: bidRequest.params.device,
            pubProvidedIds: bidRequest.params.pubProvidedIds,
            tdidRepetition: bidRequest.params.tdidRepetition
        };

        return {
            method: 'POST',
            url: BID_URL,
            data: JSON.stringify(payload),
            options: {
                withCredentials: false
            },
        };
    });
}

function interpretResponse(serverResponse, request) {
    const serverBody = serverResponse.body;
    const bidResponses = [];

    serverBody.seatbid.forEach(seatbid => {
        seatbid.bid.forEach(bid => {
            bidResponses.push({
                requestId: request.data.bidId,
                cpm: bid.price,
                width: bid.w,
                height: bid.h,
                creativeId: bid.crid,
                currency: 'USD',
                netRevenue: true,
                ttl: 360,
                ad: bid.adm,
                mediaType: bid.ext.mediaType
            });
        });
    });

    return bidResponses;
}

const spec = {
    code: BIDDER_CODE,
    isBidRequestValid,
    buildRequests,
    interpretResponse,
};

registerBidder(spec);

export {spec};
