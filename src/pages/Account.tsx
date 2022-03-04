import React from "react";
import { JsonRpc } from "eosjs";
import { Transaction, Action } from "../types";

//@ts-ignore
const Account = ({ ual }) => {
  const demoTransactionUserWax = (
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
  const user_wax = async () => {
    const multiplier = 1;
    var realCost = 0.01;
    try {
      const table = await ual.activeUser.rpc.get_table_rows({
        json: true, // Get the response as json
        code: "limitlesswax", // Contract that we target
        scope: "limitlesswax", // Account that owns the data
        table: "config", // Table name
        limit: 1, // Maximum number of rows that we want to get
        reverse: false, // Optional: Get reversed data
        show_payer: false, // Optional: Show ram payer
      });

      // console.log(table.rows[0]);
      realCost = parseFloat(table.rows[0].cost) * multiplier;
      // console.log(realCost);

      console.log(demoTransactionUserWax(realCost, multiplier));
      const response = await ual.activeUser.signTransaction(
        demoTransactionUserWax(realCost, multiplier),
        {
          broadcast: true,
          blocksBehind: 3,
          expireSeconds: 60,
        }
      );
      console.log("Sucess", response);
    } catch (e) {
      console.log("Error", e);
      console.log("JSON", JSON.stringify(e));
    }
  };

  const demoTransactionContractWax = (
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
            from: "limitlessbnk",
            to: "limitlesscpu",
            quantity: realCost.toFixed(8) + " WAX",
            memo: "Limitlesswax CPU Payment",
          },
          authorization: [
            {
              actor: "limitlesswax",
              permission: "cosign",
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
  const contract_wax = async () => {
    const multiplier = 1;
    var realCost = 0.01;
    try {
      const table = await ual.activeUser.rpc.get_table_rows({
        json: true, // Get the response as json
        code: "limitlesswax", // Contract that we target
        scope: "limitlesswax", // Account that owns the data
        table: "config", // Table name
        limit: 1, // Maximum number of rows that we want to get
        reverse: false, // Optional: Get reversed data
        show_payer: false, // Optional: Show ram payer
      });

      // console.log(table.rows[0]);
      realCost = parseFloat(table.rows[0].cost) * multiplier;
      // console.log(realCost);

      console.log(demoTransactionContractWax(realCost, multiplier));
      const response = await ual.activeUser.signTransaction(
        demoTransactionContractWax(realCost, multiplier),
        {
          broadcast: true,
          blocksBehind: 3,
          expireSeconds: 60,
        }
      );
      console.log("Sucess", response);
    } catch (e) {
      console.log("Error", e);
      console.log("JSON", JSON.stringify(e));
    }
  };

  const demoTransactionUserToken = (
    realCost: string,
    multiplier: number,
    tokenContract: string
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
          account: tokenContract,
          name: "transfer",
          data: {
            from: ual.activeUser.accountName,
            to: "limitlesscvt",
            quantity: realCost,
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
  const user_token = async () => {
    const multiplier = 1.0;
    var realCost = 0.01;
    var symbol = "0,SNAKOIL";
    var symbol_string = " SNAKOIL";
    var symbol_decimals = 0;
    var contract = "novarallytok";
    try {
      const table = await ual.activeUser.rpc.get_table_rows({
        json: true, // Get the response as json
        code: "limitlesscvt", // Contract that we target
        scope: "limitlesscvt", // Account that owns the data
        table: "token", // Table name
        lower_bound: symbol,
        upper_bound: symbol,
        limit: 1, // Maximum number of rows that we want to get
        reverse: false, // Optional: Get reversed data
        show_payer: false, // Optional: Show ram payer
      });

      console.log(table.rows[0]);
      realCost = parseFloat(table.rows[0].price) * multiplier;
      console.log(realCost);
      console.log(realCost.toFixed(symbol_decimals) + symbol_string);

      console.log(
        demoTransactionUserToken(
          realCost.toFixed(symbol_decimals) + symbol_string,
          multiplier,
          contract
        )
      );
      const response = await ual.activeUser.signTransaction(
        demoTransactionUserToken(
          realCost.toFixed(symbol_decimals) + symbol_string,
          multiplier,
          contract
        ),
        {
          broadcast: true,
          blocksBehind: 3,
          expireSeconds: 60,
        }
      );
      console.log("Sucess", response);
    } catch (e) {
      console.log("Error", e);
      console.log("JSON", JSON.stringify(e));
    }
  };

  const demoTransactionContractToken = (
    realCost: string,
    multiplier: number,
    tokenContract: string
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
          account: tokenContract,
          name: "transfer",
          data: {
            from: "limitlessbnk",
            to: "limitlesscvt",
            quantity: realCost,
            memo: "Limitlesswax CPU Payment",
          },
          authorization: [
            {
              actor: "limitlesswax",
              permission: "cosign",
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
  const contract_token = async () => {
    const multiplier = 1;
    var realCost = 0.01;
    var symbol = "0,SNAKOIL";
    var symbol_string = " SNAKOIL";
    var symbol_decimals = 0;
    var contract = "novarallytok";
    try {
      const table = await ual.activeUser.rpc.get_table_rows({
        json: true, // Get the response as json
        code: "limitlesscvt", // Contract that we target
        scope: "limitlesscvt", // Account that owns the data
        table: "token", // Table name
        lower_bound: symbol,
        upper_bound: symbol,
        limit: 1, // Maximum number of rows that we want to get
        reverse: false, // Optional: Get reversed data
        show_payer: false, // Optional: Show ram payer
      });

      // console.log(table.rows[0]);
      realCost = parseFloat(table.rows[0].price) * multiplier;
      // console.log(realCost);

      console.log(
        demoTransactionContractToken(
          realCost.toFixed(symbol_decimals) + symbol_string,
          multiplier,
          contract
        )
      );
      const response = await ual.activeUser.signTransaction(
        demoTransactionContractToken(
          realCost.toFixed(symbol_decimals) + symbol_string,
          multiplier,
          contract
        ),
        {
          broadcast: true,
          blocksBehind: 3,
          expireSeconds: 60,
        }
      );
      console.log("Sucess", response);
    } catch (e) {
      console.log("Error", e);
      console.log("JSON", JSON.stringify(e));
    }
  };

  const demoTransactionExtraAction = (
    realCost: string,
    multiplier: number,
    tokenContract: string
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
          account: "somecontract",
          name: "something",
          data: {},
          authorization: [
            {
              actor: ual.activeUser.accountName,
              permission: "active",
            },
          ],
        },
        {
          account: tokenContract,
          name: "transfer",
          data: {
            from: "limitlessbnk",
            to: "limitlesscvt",
            quantity: realCost,
            memo: "Limitlesswax CPU Payment",
          },
          authorization: [
            {
              actor: "limitlesswax",
              permission: "cosign",
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
  const extra_action = async () => {
    const multiplier = 1;
    var realCost = 0.01;
    var symbol = "0,SNAKOIL";
    var symbol_string = " SNAKOIL";
    var symbol_decimals = 0;
    var contract = "novarallytok";
    try {
      console.log("ual: ", ual);
      const table = await ual.activeUser.rpc.get_table_rows({
        json: true, // Get the response as json
        code: "limitlesscvt", // Contract that we target
        scope: "limitlesscvt", // Account that owns the data
        table: "token", // Table name
        lower_bound: symbol,
        upper_bound: symbol,
        limit: 1, // Maximum number of rows that we want to get
        reverse: false, // Optional: Get reversed data
        show_payer: false, // Optional: Show ram payer
      });

      // console.log(table.rows[0]);
      realCost = parseFloat(table.rows[0].price) * multiplier;
      // console.log(realCost);

      console.log(
        demoTransactionExtraAction(
          realCost.toFixed(symbol_decimals) + symbol_string,
          multiplier,
          contract
        )
      );
      const response = await ual.activeUser.signTransaction(
        demoTransactionExtraAction(
          realCost.toFixed(symbol_decimals) + symbol_string,
          multiplier,
          contract
        ),
        {
          broadcast: true,
          blocksBehind: 3,
          expireSeconds: 60,
        }
      );
      console.log("Sucess", response);
    } catch (e) {
      console.log("Error", e);
      console.log("JSON", JSON.stringify(e));
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
      <button onClick={user_wax}>User Wax</button>
      <button onClick={contract_wax}>Contract Wax</button>
      <button onClick={user_token}>User Snakoil</button>
      <button onClick={contract_token}>Contract Token</button>
      <button onClick={extra_action}>Extra Action</button>
    </div>
  );
};

export default Account;
