

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