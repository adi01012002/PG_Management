// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";
// import { Provider } from "react-redux";
// import { createStore, applyMiddleware, compose } from "redux";
// import { thunk } from "redux-thunk"; // Correct import for redux-thunk
// // import reducers from "./redux/reducers"; // Make sure this path points to your reducers
// import reducers from "./redux";

// // Redux DevTools extension setup
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(
//   reducers,
//   composeEnhancers(applyMiddleware(thunk)) // No error should appear here now
// );
// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </StrictMode>
// );


import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import {thunk} from "redux-thunk"; // Corrected import for redux-thunk (default export)
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
// import reducers from "./redux"; // Ensure this path points to your reducers
import rootReducer from './redux'; // Ensure this points to your root reducer

// Set up Redux DevTools integration with middleware
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter> {/* Wrap your App with BrowserRouter */}
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
