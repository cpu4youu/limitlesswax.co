import React from "react";
import { JsonRpc } from "eosjs";
import { Transaction, Action } from "../types";

//@ts-ignore
const Account = ({ ual }) => {
  const demoTransaction = (
    realCost: number,
    multiplier: number
  ): Transaction => {
    return {
      max_cpu_usage_ms: multiplier,
      max_net_usage_words: multiplier * 1000,
      actions: [
        {
          account: "limitlesswax",
          name: "paycpu",
          data: {
            user: ual.activeUser.accountName,
            info: multiplier + " ms max",
          },
          authorization: [
            {
              actor: "limitlesswax",
              permission: "cosign",
            },
          ],
        },
        {
          account: "eosio.token",
          name: "transfer",
          data: {
            from: ual.activeUser.accountName,
            to: "limitlesscpu",
            quantity: realCost.toFixed(8) + " WAX",
            memo: "Limitlesswax CPU Payment",
          },
          authorization: [
            {
              actor: ual.activeUser.accountName,
              permission: "active",
            },
          ],
        },
        {
          account: "eosio",
          name: "buyrambytes",
          data: {
            payer: ual.activeUser.accountName,
            receiver: ual.activeUser.accountName,
            bytes: 100,
          },
          authorization: [
            {
              actor: ual.activeUser.accountName,
              permission: "active",
            },
          ],
        },
      ],
    };
  };
  const limitlesswax = async () => {
    const multiplier = 1;
    var realCost = 0.01;
    try {
      const table = await ual.api.rpc.get_table_rows({
        json: true, // Get the response as json
        code: "limitlesswax", // Contract that we target
        scope: "limitlesswax", // Account that owns the data
        table: "config", // Table name
        limit: 1, // Maximum number of rows that we want to get
        reverse: false, // Optional: Get reversed data
        show_payer: false, // Optional: Show ram payer
      });

      console.log(table.rows[0]);
      realCost = parseFloat(table.rows[0].cost) * multiplier;
      console.log(realCost);

      console.log(demoTransaction(realCost, multiplier));
      const response = await ual.activeUser.signTransaction(
        demoTransaction(realCost, multiplier),
        {
          broadcast: true,
          blocksBehind: 3,
          expireSeconds: 60,
        }
      );
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      {!ual.activeUser ? (
        <h1>"Not logged in"</h1>
      ) : (
        <h1>{ual.activeUser.accountName}</h1>
      )}
      <button onClick={limitlesswax}>Test</button>
    </div>
  );
};

export default Account;
