import { spec } from '../../../src/adapters/supersspBidAdapter';
import expect from "expect";

// Тестовые данные
const bid = {
    bidder: 'superssp',
    params: {
        ssspUid: 123,
        adUnitCode: 'adUnit',
        auctionId: 'auction1',
        bidId: 'bid1',
        mediaType: {
            banner: {
                sizes: [[300, 250], [300, 600]]
            }
        },
        site: {
            page: 'www.example.com',
            domain: 'example.com',
            publisher: {
                domain: 'example.com'
            }
        },
        device: {
            w: 1024,
            h: 768
        },
        pubProvidedIds: {
            "adserver.org": ['xxxxxxxxxxxxxxxxx','yyyyyyyyyyyyyyyy'],
            "domain.com": ["adsfasdfasdfasdfasdfasdf"]
        },
        tdidRepetition: 2
    }
};

const bidderRequest = {
    bids: [bid],
};

const serverResponse = {
    body: {
        id: 'auction1',
        seatbid: [{
            bid: [{
                id: 'bid1',
                impid: 'adUnit',
                price: 2.3,
                w: 300,
                h: 250,
                crid: 'creative1',
                adomain: ['example.com'],
                ext: {
                    mediaType: 'banner'
                }
            }]
        }]
    }
};

test('should correctly build requests', () => {
    const requests = spec.buildRequests(bidderRequest.bids, bidderRequest);

    expect(requests[0].url).toBe('http://www.superssp.com:1234/api/v1');
    expect(requests[0].method).toBe('POST');
    expect(JSON.parse(requests[0].data)).toStrictEqual(bid.params);
});

test('should correctly interpret responses', () => {
    const result = spec.interpretResponse(serverResponse, requests[0]);

    expect(result[0].requestId).toBe(bid.params.bidId);
    expect(result[0].cpm).toBe(serverResponse.body.seatbid[0].bid[0].price);
    expect(result[0].width).toBe(serverResponse.body.seatbid[0].bid[0].w);
    expect(result[0].height).toBe(serverResponse.body.seatbid[0].bid[0].h);
    expect(result[0].creativeId).toBe(serverResponse.body.seatbid[0].bid[0].crid);
    expect(result[0].currency).toBe('USD');
    expect(result[0].netRevenue).toBe(true);
    expect(result[0].ttl).toBe(360);
    expect(result[0].mediaType).toBe(serverResponse.body.seatbid[0].bid[0].ext.mediaType);
});
