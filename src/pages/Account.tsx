import React from 'react';

//@ts-ignore
const Account = ({ ual}) => {
  
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

    </div>
  );
};

export default Account;