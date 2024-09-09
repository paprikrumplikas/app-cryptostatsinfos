// using crypto market prices API
// @crucial need to be added to store.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
    // @note this is coming from the options object (from rapid api), these are the headers.
    'x-rapidapi-key': '30564f6b2cmsh4d7f6ce331223b8p10156cjsn7e49f0de5564',
    'x-rapidapi-host': 'crypto-market-prices.p.rapidapi.com'
}

const baseUrl = "https://crypto-market-prices.p.rapidapi.com";


// @learning utility func that simply adds the header and url to our calls
const createRequest = (url) => ({ url, headers: cryptoApiHeaders });


export const cryptoMarketsApi = createApi({
    reducerPath: "cryptoMarketsApi",
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoMarkets: builder.query({
            query: (count) => createRequest(`/exchanges?limit=${count}`),
            keepUnusedDataFor: 1200,
        }),
        getListedTokens: builder.query({
            query: (exchange) => createRequest(`/exchanges/${exchange}?base=USDT`),
            keepUnusedDataFor: 1200,
        }),
    })
});


// @crucial @learning redux: this us a cutom hook redux automatically created
// redux toolkit creates a hook that we can call to instantly to get all data for the query
// It also gives loading states, finalize states and everything else needed while making API calls
export const {
    useGetCryptoMarketsQuery, useGetListedTokensQuery,
} = cryptoMarketsApi;