import React from 'react';
//@ts-expect-error
const Cpu4 = ({ual}) =>{

  const transactionFreeCPU = async () => {
    var actions = {};
      console.log("Yes a wcw user");
      actions = {
        max_cpu_usage_ms: 5,
        max_net_usage_words: 5000,
        actions: [
          {
            account: "limitlesswax",
            name: "paycpu",
            data: {
              user: ual.activeUser.accountName,
              info: "5 ms max",
            },
            authorization: [
              {
                actor: "limitlesswax",
                permission: "cosign",
              },
            ],
          },
          {
            account: "free.cpu4",
            name: "getcpu",
            data: {
              username: ual.activeUser.accountName,
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
    
    try {
      const r = await ual.activeUser.signTransaction(actions, {
        blocksBehind: 5,
        expireSeconds: 300,
        broadcast: true,
        sign: true,
      });
      console.log(r);
      alert("Transaction ID: " + r.transactionId);
    } catch (e) {
      console.error(e);
      // process.exit();
      alert(e);
      console.log(JSON.stringify(e));
    }
  };
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
        <h1>{ual.activeUser.accountName}<button onClick={transactionFreeCPU}>Test</button></h1>
      )}

    </div>
  );
    

}

export default Cpu4;
