import React from 'react';
import { JsonRpc } from 'eosjs'


//@ts-ignore
const Account = ({ ual}) => {
  const multiplier = 0.01000000;
  var realCost =  multiplier;
  const demoTransaction = {
    actions:[
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
    ]
  }
 const limitlesswax = async() => {
    try {
      const response = await ual.activeUser.signTransaction(demoTransaction, {
        broadcast: true,
        blocksBehind: 3,
        expireSeconds: 60,
      })
      console.log(response)
    } catch(e) {
      console.log(e)
    }
 }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh'
      }}
    >
      {(!ual.activeUser) ? (
        <h1>"Not logged in"</h1>
      ) : (
        <h1>{ual.activeUser.accountName}</h1>
      )}
      <button onClick={limitlesswax}>Test</button>

    </div>
  );
};

export default Account;