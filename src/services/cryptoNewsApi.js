// @note API used: Google News (BING news search was not working)

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsHeaders = {
    'x-rapidapi-key': '30564f6b2cmsh4d7f6ce331223b8p10156cjsn7e49f0de5564',
    'x-rapidapi-host': 'google-news13.p.rapidapi.com'
}

const baseUrl = "https://google-news13.p.rapidapi.com";


// @learning utility func that simply adds the header and url to our calls
const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });


export const cryptoNewsApi = createApi({
    reducerPath: "cryptoNewsApi",
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({ searchTerm, count }) => createRequest(`/search?keyword=${searchTerm}&limit=${count}`),
            keepUnusedDataFor: 1200, // @crucial @learning Limit API calls for saving money. Cache data for 5 minutes (300 seconds)

        })
    })
});



export const {
    useGetCryptoNewsQuery,
} = cryptoNewsApi;