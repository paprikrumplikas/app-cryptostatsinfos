

1. SETUP
    1. create new react app: `npx create-react-app ./`
    2. recreate src
        1. create index.js (equivalent to main.jsx), the starting point of every react app
        2. create App.js, use rafce snippet (from extension ES7 React/Redux/... extension)
        3. start local host with `npm start` (not with `npm run dev` this time)
    3. install dependencies @learning: `npm install antd @ant-design/icons react-redux @reduxjs/toolkit axios chart.js html-react-parser millify moment react-chartjs-2 react-router-dom`
        @note @crucial this leaves some vulns, but unable fo fix them, just proceeded
        1. Ant Design for the design (instead of Tailwind) @learning antd: UI component library with a strong design system, best suited for applications that need a polished and consistent UI quickly.
        @note instrucor mentioned Material UI that is somewhere in btw TailWind and And design
        2. Redux: for managing the state of a JS app. Helps manage complex state logic.
        3. Axios: to make API request
        4. Chart.js: for charts
        5. html-react-parser: to parse html data
        6. millify: transfer extremely large numbers to strings
        7. moment: to parse times, dates
        8. react.chartjs-2: to render the charts
        9. react-router-dom: for routing
    4. Create App.css for custom layout styling and tweaks, this is provided by the instructor
       It is mainly vars, colors, mobile responsiveness. (The majority of styling is done via antd though)



2. REDUX, APIs,
   Data fetching from APIs with Redux. Redux is a predictable state container.
    ((@learning The store in Redux and the Context.Provider in React serve similar purposes in that they both provide a way to manage and share state across components, but they differ in their implementation and use cases:
    State Management:
    Redux Store: Centralizes application state in a single store, allowing for predictable state management through actions and reducers. It is designed for larger applications with complex state logic.
    Context.Provider: Part of React's built-in context API, it allows you to share values (like state) between components without passing props down manually. It's simpler and more suitable for smaller applications or specific use cases.))
    1. On Rapid API, search for Coinranking API
        1. In the Code Snippets section, set Target=Node.js, Client=Axios, and then
            1. copy the options object
            2. Create folder src/services, then cryptoAPI.js which will contain the logic. Copy the options object therein and comment it out
    2. Create a store @learning @crucial. A store is one central state of truth. Create new folder: app/store.js with contents
                import { configureStore } from "@reduxjs/toolkit";

                export default configureStore({
                    reducer: {},
                    middleware: (getDefaultMiddleware) =>
                        getDefaultMiddleware().concat(cryptoApi.middleware)
                });`
    3. In index.js (main.jsx) wrap the entire app with the Provider with store as a prop. @note We basically pass the Store var with the provider
    4. In crypAPI.js implement the data fetching func.
    5. Connect the API to the store, in store.js:
        1. `import { cryptoApi } from "../services/cryptoApi";`
        2. add to reducer: `[cryptoApi.reducerPath]: cryptoApi.reducer,`
    6. In cryptoApi.js, export the custom hook created automatically by Redux





3. Learnings from troubleshootings
    1. If data logged from an API call is undefined, it is probably becasue the data is still being fetched. 
    We should prevent the component from mounting before data fetching ends:     `if (isFetching) return 'Loading...';`


