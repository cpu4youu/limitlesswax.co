import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { Wax } from "../node_modules/@deraxyna/ual-wax/dist";
import { Anchor } from 'ual-anchor'
//@ts-expect-error
import { UALProvider, withUAL } from "ual-reactjs-renderer";


const myChain = {
  chainId: "1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4",
  rpcEndpoints: [
    {
      protocol: "https",
      host: "wax.eosrio.io",
      port: "443",
    },
  ],
};

// @ts-ignore
const anchor = new Anchor([myChain], { appName: "cpu4" });
// @ts-ignore
const wax = new Wax([myChain], { appName: "cpu4" });

const MyUALConsumer = withUAL(App);

ReactDOM.render(
  <React.StrictMode>
     <UALProvider
      chains={[myChain]}
      authenticators={[wax, anchor]}
      appName={"cpu4"}
    >
      <MyUALConsumer />
    </UALProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
