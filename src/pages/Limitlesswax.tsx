import {useEffect, useState } from "react";
import { 
  Box, 
  Container, 
  Button, 
  Typography, 
  TextField, 
  Collapse, 
  IconButton, 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import ClearIcon from '@mui/icons-material/Clear';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Autocomplete from '@mui/material/Autocomplete';
import * as _ from 'lodash';
import Cookies from 'universal-cookie';


const cookies = new Cookies();

const sleep = (milliseconds: number) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
const { JsonRpc } = require('eosjs');

const httpEndpoint = "https://wax.greymass.com/";
const rpc = new JsonRpc(httpEndpoint);

const columnsTable = ['Transaction ID', 'Actions']


interface TableEntry{
  id: string,
  requested_cpu: number,
  payment:  string,
  amount_actions: number,
  actions: Array<any>

}

const useStyles = makeStyles((theme) => ({
  textInput: {
    background: "#831F3F",
    border: "none",
    outline: "none",
    height: "47px",
    color: "#fff",
    fontSize: "18px",
    padding: "10px 20px",
  },
  label: {
    fontWeight: "400",
    fontSize: "18px",
    lineHeight: "24px",
    color: "#EDEDED",
    marginBottom: "10px",
    "@media (min-width: 900px)": {
      fontSize: "24px",
      lineHeight: "28px",
    },
  },
  labelAccount: {
    fontWeight: "600",
    fontSize: "40px",
    lineHeight: "50px",
    color: "#EDEDED",
    marginBottom: "10px",
    "@media (min-width: 900px)": {
      fontSize: "24px",
      lineHeight: "28px",
    },
  },
  data: {
    fontWeight: "200",
    fontSize: "40px",
    lineHeight: "50px",
    color: "#EDEDED",
    marginBottom: "10px",
    overflowWrap:'break-word',
    "@media (min-width: 900px)": {
      fontSize: "18px",
      lineHeight: "28px",
    },
  }
}));
//@ts-expect-error
const Limitlesswax = ({ ual }) => {
  const classes = useStyles();
  const [addActionOpen, setAddActionOpen] = useState<boolean>(true);
  const [actionName, setActionName] = useState<string>('')
  const [actionData, setActionData] = useState<object[]>([]);
  const [account, setAccount] = useState<string>()
  const [userResults, setUserResults] = useState<object[]>([]);
  const [getQuery, setQuery] = useState<string>()
  const [lastQuery, setLastQuery] = useState<string>()
  const [finishedAction, setFinishedAction] = useState<boolean>(true)
  const [accountActions, setAccountActions] = useState<string[]>([])
  const [actionString, setActionString] = useState<string>()
  const [fields, setFields] = useState<object[]>()
  const [data, setData] = useState<object[]>([{},{},{},{},{},{},{},{},{}])
  const [actions, setActions] = useState<object[]>([])
  const [open, setOpen]  = useState<boolean[]>([])
  const [transactionms, setTransactionms] = useState<number>(2)
  const [mult_Fee, setMult_Fee] = useState<number>(0)
  const [fee, setFee]  = useState<number>(0)

  const [transactions, setTransactions] = useState<TableEntry[]>([])

  const [timer, setTimer] = useState<number>(0)

 
  useEffect(() =>{
    if(getQuery && getQuery.length > 2){
      getUserFromBC(getQuery)
      setLastQuery(getQuery)
    }
  }, [getQuery])

  useEffect(() => {
    if(account !== undefined){
      const Actions: string[] = getABI(account)

      setAccountActions(Actions)
    }
  },[account])

  useEffect(() => {
    const interval = setInterval(()=> setTimer(Date.now()), 2000);
    return () =>{
      clearInterval(interval)
    }
  }, [timer])

  useEffect(() => {
    if(account !== undefined && actionString !== undefined){
      getActionfromABI(account, actionString)
    }
    
  },[actionString])


  useEffect(()=>{
    var x: object[] = []
    actions.map((value) =>{
      //@ts-ignore
      if(value.account !== ""){
        //@ts-ignore
        x.push({account: value.account, name: value.name, data: value.data})
      }
    })
    setActionData(x)
    
  }, [actions])

  useEffect(()=>{
    if(mult_Fee !== 0){
      setFee(mult_Fee * transactionms)
    }
  }, [transactionms])

  useEffect(() => {
    var states: any = []
    if(transactions.length > 5){
      var  arr = transactions.slice(0, 5)
      setTransactions(arr)
    } else {
      if(transactions  !== [] && transactions.length !== 0){
        cookies.set('Transactions', JSON.stringify(transactions), { path: '/' })
        localStorage.setItem('Transactions', JSON.stringify(transactions))
      }
      transactions.map((value) => {
        states.push(false)
      })
      setOpen(states)
    }

    
   
  },[transactions])

  useEffect(() => {
    async function getFee() {
      const response = await rpc.get_table_rows({
        json: true, // Get the response as json
        code: "limitlesswax", // Contract that we target
        scope: "limitlesswax", // Account that owns the data
        table: "config", // Table name
        reverse: false, // Optional: Get reversed data
      })
      var WAX = response.rows[0].cost
      WAX = parseFloat(WAX.slice(0, -4))
      setMult_Fee(WAX)
      setFee(WAX)
    }
    getFee()
    console.log('cookie')
    //setTransactions(cookies.get('Transactions'))
    if(localStorage.getItem('Transactions')){
      //@ts-ignore
      setTransactions(JSON.parse(localStorage.getItem('Transactions')))
    }
  }, [])

  const getTransaction = (key: number) => {

  }

  const payWithWax = () => {

    async function sign(transaction:any, payment: string, amount: number){
      try {
        const r = await ual.activeUser.signTransaction(transaction, {
          blocksBehind: 5,
          expireSeconds: 300,
          broadcast: true,
          sign: true,
        });
        console.log(r);
        alert("Transaction ID: " + r.transactionId);
        const result = {
          id: r.transactionId,
          requested_cpu: transactionms,
          payment:  payment,
          amount_actions: amount,
          actions: transaction.actions
        }
        setTransactions([result, ...transactions ]) 
      } catch (e) {
        console.error(e);
        // process.exit();
        alert(e);
        console.log(JSON.stringify(e));
      }
    }
    var amount = 2
    var rdy_actions: object[] = [
      {
        account: "limitlesswax",
        name: "paycpu",
        data: {
          user: ual.activeUser.accountName,
          info: `${transactionms} ms max`,
        },
        authorization: [
          {
            actor: "limitlesswax",
            permission: "cosign",
          }
        ]
      },
      {
        account: "eosio.token",
        name: "transfer",
        data: {
          from: ual.activeUser.accountName,
          to: "limitlesscpu",
          quantity: fee + "000000 WAX",
          memo: `${transactionms} ms`
        },
        authorization: [
          {
            actor: ual.activeUser.accountName,
            permission: "active",
          },
        ],
      }
    ]
    actions.map((value) =>{
      //@ts-ignore
      var action = {
        //@ts-ignore
        account: value.account, 
        //@ts-ignore
        name: value.name, 
        //@ts-ignore
        data: value.data, 
        authorization: [{
          actor: ual.activeUser.accountName,
          permission: ual.activeUser.requestPermission
        }]}
      amount = amount + 1
      rdy_actions.push(action)
    })
    const transaction = {
      max_cpu_usage_ms: transactionms,
      max_net_usage_words: transactionms * 1000,
      actions: rdy_actions
    }

    console.log(transaction)
    sign(transaction, fee + "000000 WAX", amount)
    
    
  }

  const reset = () => {
    resetActionSelector()
    setTransactionms(2)
    setLastQuery('')
    setActionData([])
    setAccount(undefined)
  }

  const resetActionSelector = () => {
    setFinishedAction(true)
    setAccount(undefined)
    setAccountActions([])
    setData([{},{},{},{},{},{},{},{},{}])
    setFields(undefined)
    setActionString(undefined)
  }

  const submitAction = () => {
    var datas = {}
    var empty:boolean = false
    data.map((value, index) => {
      if(empty){
        var action = {account: account, name : actionString, data:  {}}
        setActions([...actions, action])
        setTransactionms(transactionms +1)
      } else{
        //@ts-ignore
        if(value.name === undefined &&  index === 0){
          resetActionSelector()
          empty = true
        }
        //@ts-ignore
        if(value.name !== undefined){
          //@ts-ignore
          datas[value.name] = value.value
        }
      }
    })
    if(!empty){
      var action = {account: account, name : actionString, data:  datas}
      setActions([...actions, action])
      setTransactionms(transactionms +1)
    }
    resetActionSelector()
  }

  const removeAction = (index:number) =>{
    var arr = [...actions]
    arr.splice(index, 1)
    setActions(arr)
  }

  const addActionParams = (name:string, value: string, index: number) => {
      var old_data = [...data]
      old_data[index] = {name: name, value: value}
      setData(old_data)
  }

  const getActionfromABI = (account: string, name: string) => {
    if(account !== ""){
      fetch("https://wax.cryptolions.io/v1/chain/get_abi", {
        "headers": {
          "accept": "*/*",
          "accept-language": "nl-NL,nl;q=0.9,en-US;q=0.8,en;q=0.7",
          "content-type": "text/plain;charset=UTF-8",
        },
        "referrer": "https://wax.bloks.io/",
        "body": `{\"account_name\": \"${account}\"}`,
        "method": "POST",
        "mode": "cors",
        "credentials": "omit"
        })
        .then(response => response.json())
        .then(data => data.abi.structs)
        .then(actions => 
          actions.map((value:any) =>{
          if(value.name === name){

            setFields(value)
            return
          }
        }))
        .catch(e => {
          console.log(e)
        })
    }
  }

  const startActionSelector = () => {
    setFinishedAction(false)

  }

  const getUserFromBC = async(input:string) => {
    var upperlimit = input
    var underlimit = input
    if(input.indexOf('.') !== -1  && input.charAt(input.length -1) === '.'){
        upperlimit = upperlimit + 'a'
      }
    if(underlimit.length <= 12){
      for(var i = 12 - underlimit.length; i >= 1; i -= 1){
        underlimit = underlimit + 'z'
        
      }
    }
    fetch("https://wax.greymass.com/v1/chain/get_table_by_scope", {
      method: 'POST',
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        code: "eosio",
        limit: 10,
        lower_bound: upperlimit,
        table: "userres",
        upper_bound: underlimit
      })})
      .then(response => response.json())
      .then(data => forceReloadUsers(data, input))
    }
  

  const replaceAccount = (input: string) => {
      setAccount(input)
  }

  const handleAutoCompleteTextChange = (event: any) => {
    setQuery(event.target.value)
  }


  const forceReloadUsers = (results: any, input: any) => {
    const userResults: any = []
    if(results == undefined){
      return
    }
    if(results.rows.length === 1){
      var account = results.rows[0].scope
      replaceAccount(account)
    } else {
      if(results.rows !== "") {
        results.rows.map((item: any, index: any) => {
          userResults.push({
            id: index,
            name: item.scope
          })
        })
        setUserResults(userResults)
      }
    }
    if(results.rows.length === 0){
      if(input.includes('eosio.t')){
        replaceAccount('eosio.token')
      } else {
        replaceAccount('Not Found')
      }
    }
  }

  function getABI(input: string): Array<string> {
    var action_names: string[] = []
    if(input !== ""){
      fetch("https://wax.cryptolions.io/v1/chain/get_abi", {
        "headers": {
          "accept": "*/*",
          "accept-language": "nl-NL,nl;q=0.9,en-US;q=0.8,en;q=0.7",
          "content-type": "text/plain;charset=UTF-8",
        },
        "referrer": "https://wax.bloks.io/",
        "body": `{\"account_name\": \"${input}\"}`,
        "method": "POST",
        "mode": "cors",
        "credentials": "omit"
        })
        .then(response => response.json())
        .then(data => data.abi.actions)
        .then(action => {

          action.map((item:any) => {
            action_names.push(item.name)
          })
        })
        .catch(e => {
          console.log(e)
        })
        //@ts-ignore
        return action_names  
    } else {
      return ['No Actions Fround']
    }
  }

  function redoTransaction(index:number){

    async function sign(transaction:any, payment: string, amount: number, cpu: number){
      try {
        const r = await ual.activeUser.signTransaction(transaction, {
          blocksBehind: 5,
          expireSeconds: 300,
          broadcast: true,
          sign: true,
        });

        console.log(r);

        alert("Transaction ID: " + r.transactionId);
        const result = {
          id: r.transactionId,
          requested_cpu: cpu,
          payment:  payment,
          amount_actions: amount,
          actions: transaction.actions
        }
        setTransactions([result, ...transactions ]) 
      } catch (e) {
        console.error(e);
        // process.exit();
        alert(e);
        console.log(JSON.stringify(e));
      }
    }
    
    
    const transaction = {
      max_cpu_usage_ms: transactions[index]['requested_cpu'],
      max_net_usage_words: transactions[index]['requested_cpu'] * 1000,
      actions: transactions[index]['actions']
    }

    console.log(transaction)
    sign(transaction, transactions[index]['payment'], transactions[index]['amount_actions'],transactions[index]['requested_cpu'])
    
    
  }

  function Row(input: any){
    //@ts-nocheck
    var row = input.row
    var actions = row.actions
    var id = input.index
    function setBoolean(val: boolean){
      var values = open
      values[id] = val
      setOpen(values)
    }
    return(
      <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton onClick={() => (redoTransaction(id))}>
            <CheckCircleOutlineIcon sx={{color: '#006200 '}}/>
          </IconButton> 
        </TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setBoolean(!open[id])}
          >
            {open[id] ? <KeyboardArrowUpIcon sx= {{color: "#EDEDED",}}/> : <KeyboardArrowDownIcon sx= {{color: "#EDEDED",}}/>}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" sx= {{color: "#EDEDED",}}>
          {row.id}
        </TableCell>
        <TableCell align="center" sx= {{color: "#EDEDED",}}>{row.requested_cpu}</TableCell>
        <TableCell align="center" sx= {{color: "#EDEDED",}}>{row.payment}</TableCell>
        <TableCell align="center" sx= {{color: "#EDEDED",}}>{row.amount_actions}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open[id]} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell sx= {{color: "#EDEDED",}}>Action Nr.</TableCell>
                    <TableCell sx= {{color: "#EDEDED",}}>Account</TableCell>
                    <TableCell align="center" sx= {{color: "#EDEDED",}}>Name</TableCell>
                    <TableCell align="center" sx= {{color: "#EDEDED",}}>Data</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {actions.map((action: any, index2: any) => (
                    <TableRow key={index2}>
                      <TableCell align="center" sx= {{color: "#EDEDED",}}>{index2}</TableCell>
                      <TableCell align="center" sx= {{color: "#EDEDED",}}>{action.account}</TableCell>
                      <TableCell align="center" sx= {{color: "#EDEDED",}}>{action.name}</TableCell>
                      <TableCell align="left" sx= {{color: "#EDEDED",}}>{JSON.stringify(action.data)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
    )
  }



  return (
    <Container
      sx={{
        pt: { xs: "30px", md: "50px" },
        pb: { xs: "30px", md: "100px" },
      }}
    >
      <Box
        sx={{
          background: "#4A1E2A",
          boxShadow: "10px 10px 5px rgba(0, 0, 0, 0.15)",
          p: "20px 30px 26px",
        }}
      >
        {addActionOpen ? (
          <Box sx={{ pb: { xs: "50px", md: "130px" } }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "flex-start", sm: "center" },
                justifyContent: "space-between",
                mb: "20px",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "600",
                  fontSize: { xs: "28px", md: "36px" },
                  lineHeight: "42px",
                  color: "#EDEDED",
                  mb: { xs: "20px", sm: 0 },
                }}
              >
                LimitlessWAX
              </Typography>
              <Box>
                {/* <Button
                  variant="contained"
                  onClick={() => setAddActionOpen(false)}
                  sx={{
                    backgroundColor: "#882140!important",
                    fontWeight: "600",
                    fontSize: "18px",
                    lineHeight: "21px",
                    color: "#FAFAFA",
                    textTransform: "capitalize",
                    p: "6px 18px",
                    mr: "10px",
                  }}
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#882140!important",
                    fontWeight: "600",
                    fontSize: "18px",
                    lineHeight: "21px",
                    color: "#FAFAFA",
                    textTransform: "capitalize",
                    p: "6px 18px",
                  }}
                >
                  Load
                </Button> */}
              </Box>
            </Box>
            <Box
              sx={{
                width: { xs: "100%", md: "calc(50% - 25px)" },
                mb: "20px",
              }}
            >
              {/* <Typography className={classes.label}>
                Name this Transaction
              </Typography>
              <input
                type="text"
                className={classes.textInput}
                style={{ width: "100%" }}
                onChange={e =>  setActionName(e.target.value)}
                defaultValue={''}
                placeholder={'Name for Saving...'}
              /> */}
            </Box>
            <Box>
              <Typography 
                className={classes.label}
                sx={{
                  p:'5px 0px 10px'
                }}
                >
                  Actions
              </Typography>
              <Box
                sx={{
                  background: "#831F3F",
                  boxShadow: "10px 10px 5px rgba(0, 0, 0, 0.15)",
                  mt: '20px',
                  mb: '50px',
                  mx: '20px',
                }}
              >
                <TableContainer component={Paper} sx={{background:'#33151D'}}>
                  <Table sx ={{ minWidth: 650, }} size='small'>
                    <TableHead>
                      <TableRow>
                        <TableCell align="center" sx= {{color: "#EDEDED", width: '160px'}}>Account</TableCell>
                        <TableCell align="center" sx= {{color: "#EDEDED", width: '160px'}}>Name</TableCell>
                        <TableCell align="center" sx= {{color: "#EDEDED",}}>Data</TableCell>
                        <TableCell align="center" sx= {{color: "#EDEDED", width: '160px'}}>Remove Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {actionData.map((data, key) =>(
                        <TableRow key={key}>
                          <TableCell align="center" sx= {{color: "#EDEDED",}}>{ //@ts-ignore
                                                                                data.account}</TableCell>
                          <TableCell align="center" sx= {{color: "#EDEDED",}}>{//@ts-ignore
                                                                                data.name}</TableCell>
                          <TableCell align="center" sx= {{color: "#EDEDED",}}>{//@ts-ignore
                                                                                JSON.stringify(data.data)}</TableCell>
                          <TableCell align="center" sx= {{color: "#EDEDED",}}>
                            {
                                <IconButton onClick={() => (removeAction(key))}>
                                  <ClearIcon sx={{color: '#831F3F'}}/>
                                </IconButton>
                              }
                          </TableCell>
                      </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
            
            {finishedAction ? (
              <Button
              variant="outlined"
              onClick={startActionSelector}
              sx={{
                border: "2px dashed #A6A6A6!important",
                p: "9px 15px",
                fontWeight: "700",
                fontSize: "18px",
                lineHeight: "21px",
                color: "#EEEEEE",
                textTransform: "capitalize",
              }}
            >
              Add Action +
            </Button>

            ) : (
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: { xs: "flex-start", sm: "center" },
                    justifyContent: "space-between",
                    m: '10px',
                  }}
                > {account !== undefined ? (
                  <>
                    <Typography className={classes.labelAccount}>{account}</Typography>
                  </>
      
                ) : (
                  <Autocomplete
                    id="autocompleteLocations"
                    freeSolo
                    options={userResults} 
                    //@ts-ignore
                    getOptionLabel={(option) => (option.name)}      
                    autoHighlight={true}   
                    autoSelect={true}                    
                    style={{ width: "calc(48%)", marginTop: 20 }}        
                    clearOnEscape                                     
                    onChange={e => {//@ts-ignore     
                                    replaceAccount(e.target.textContent)}}
                    renderInput={params => <TextField {...params} label="Search Account" variant="standard" onChange={e => handleAutoCompleteTextChange(e)} />}
                    sx={{
                      backgroundColor: "#882140!important",
                      fontWeight: "600",
                      fontSize: "18px",
                      lineHeight: "21px",
                      color: "#FAFAFA",
                      textTransform: "capitalize",
                      p: "6px 18px",
                    }}
                  />
                )}
                </Box>
                {accountActions.length > 0 ? (
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: 'repeat(6, 1fr)',
                      gap: 1,
                      flexDirection: { xs: "column", sm: "row" },
                      alignItems: { xs: "flex-start", sm: "center" },
                      mt: "25px",
                      mb: "20px",
                      flexWrap: 'wrap',
                      alignContent: 'baseline',       
                      
                    }}
                  >
                  {accountActions.map((action, key)  => (
                     <Button
                      key={key}
                      variant="outlined"
                      onClick={()=>(setActionString(action))}
                      sx={{
                        background: "#831F3F",
                        border: "1px solid #FFFFFF!important",
                        fontWeight: "700",
                        fontSize: "18px",
                        lineHeight: "21px",
                        color: "#EDEDED",
                        textTransform: "capitalize",
                        p: "9px 15px",
                        
                      }}
                    >
                   {action}
                   </Button>
                  )
                  )}
                  
                </Box>
                ) : (
                <></>
                )}
                <Typography
                  sx={{
                    fontWeight: "700",
                    fontSize: { xs: "18px", md: "24px" },
                    lineHeight: { xs: "24px", md: "28px" },
                    color: "#EDEDED",
                    ml: "10px",
                    width: '250px',
                    textTransform: 'capitalize',
                    p: '0px 0px 9px 0px'
                  }}
                >
                  {actionString}
                </Typography>
                    {fields !== undefined ? (
                        <Box
                        sx={{
                          width: { xs: "100%", md: "calc(100% - 50px)" },
                          mb: "20px",
                          background: "FAF0F0",
                          p:  "20px 50px",
                          outlineColor: '#EDEDED',
                          outlineWidth: '2px',
                          outlineStyle:  'solid',
                        }}
                      >
                          {//@ts-ignore
                            fields.fields.map((value, key) =>  ( 
                              <Box
                                key={key}
                                sx={{
                                  display: "grid",
                                  gridTemplateColumns: 'repeat(3, 1fr)',
                                  gridAutoColumns: '300px 100px',
                                  gap: '10px',
                                  flexDirection: { xs: "column", sm: "row" },
                                  justifyItems: 'start',
                                  justifyContent: 'flex-start',
                                  mb: "20px",
                                  
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontWeight: "700",
                                    fontSize: { xs: "18px", md: "24px" },
                                    lineHeight: { xs: "24px", md: "28px" },
                                    color: "#EDEDED",
                                    ml: "10px",
                                    width: '250px'
                                  }}
                                >
                                  {value.name}
                                </Typography>
                                <input
                                  type="text"
                                  className={classes.textInput}
                                  style={{ width: "400px" }}
                                  onChange={e => addActionParams(value.name, e.target.value, key)}
                                  defaultValue={''}
                                  placeholder={value.type === 'name' ? ('Enter account name...') : 
                                              (value.type === 'asset' ? ('0.0000 SYMBOL') : 
                                              (value.type === 'symbol' ? ('Enter SYMBOL (e.g. WAX)') : 
                                              ('Enter string....')))}
                                />
                                <Typography
                                  sx={{
                                    fontWeight: "700",
                                    fontSize: { xs: "18px", md: "24px" },
                                    lineHeight: { xs: "24px", md: "28px" },
                                    color: "#EDEDED",
                                    ml: "10px",
                                  }}
                                >
                                  {value.type}
                                </Typography>
                              </Box>
                            ))}
                        </Box>
                      ) : (
                        <></>
                      )}
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: 'repeat(9, 1fr)',
                    gap: '10px',
                    flexDirection: { xs: "column", sm: "row" },
                    justifyItems: 'start',
                    justifyContent: 'flex-start',
                    mb: "20px",
                    
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={resetActionSelector}
                    sx={{
                      background: "#831F3F",
                      border: "1px solid #FFFFFF!important",
                      fontWeight: "700",
                      fontSize: "18px",
                      lineHeight: "21px",
                      color: "#EDEDED",
                      textTransform: "capitalize",
                      p: "9px 15px",
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={submitAction}
                    sx={{
                      background: "#831F3F",
                      border: "1px solid #FFFFFF!important",
                      fontWeight: "700",
                      fontSize: "18px",
                      lineHeight: "21px",
                      color: "#EDEDED",
                      textTransform: "capitalize",
                      p: "9px 15px",
                    }}
                  >
                    Submit
                  </Button>      
                </Box>
                
              </Box>
            )}
            
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                mt: "20px",
                mb: "50px",
              }}
            >
              <Box
                sx={{
                  mr: { xs: 0, sm: "10px", md: "60px" },
                  mb: { xs: "20px", sm: 0 },
                }}
              >
                <Typography className={classes.label}>
                  CPU requested in ms
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="number"
                    className={classes.textInput}
                    style={{ width: "84px" }}
                    onChange={e => setTransactionms(parseInt(e.target.value))}
                    value={transactionms}
                    
                  />
                  <Typography
                    sx={{
                      fontWeight: "700",
                      fontSize: { xs: "18px", md: "24px" },
                      lineHeight: { xs: "24px", md: "28px" },
                      color: "#EDEDED",
                      ml: "10px",
                    }}
                  >
                    ms
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "700",
                      fontSize: { xs: "18px", md: "24px" },
                      lineHeight: { xs: "24px", md: "28px" },
                      color: "#EDEDED",
                      ml: "10px",
                      p: '0px 10px '
                    }}
                  >
                    {`${fee} WAX`}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{}}>
                <Typography className={classes.label}>Pay with</Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={payWithWax}
                    sx={{
                      width: 82,
                      height: 47,
                      backgroundColor: "#831F3F!important",
                    }}
                  >
                    WAX
                  </Button>
                  <Typography
                    sx={{
                      fontWeight: "400",
                      fontSize: { xs: "18px", md: "24px" },
                      lineHeight: { xs: "24px", md: "28px" },
                      color: "#EDEDED",
                      mx: "20px",
                    }}
                  >
                    or
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={payWithWax}
                    sx={{
                      border: "2px dashed #A6A6A6!important",
                      p: "9px 15px",
                      fontWeight: "700",
                      fontSize: "18px",
                      lineHeight: "21px",
                      color: "#EEEEEE",
                      textTransform: "capitalize",
                    }}
                  >
                    Coming Soon!
                  </Button>
                </Box>
              </Box>
            </Box>
            <Box>
              <Button
                variant="outlined"
                sx={{
                  background: "#831F3F",
                  border: "1px solid #FFFFFF!important",
                  fontWeight: "700",
                  fontSize: { xs: "18px", md: "22px" },
                  lineHeight: { xs: "22px", md: "26px" },
                  color: "#EDEDED",
                  textTransform: "capitalize",
                  p: "10px 24px",
                  mr: "20px",
                }}
                onClick={reset}
              >
                Reset
              </Button>
              <Button
                variant="outlined"
                onClick={() => setAddActionOpen(false)}
                sx={{
                  background: "#831F3F",
                  border: "1px solid #FFFFFF!important",
                  fontWeight: "700",
                  fontSize: { xs: "18px", md: "22px" },
                  lineHeight: { xs: "22px", md: "26px" },
                  color: "#EDEDED",
                  textTransform: "capitalize",
                  p: "10px 24px",
                  mr: "20px",
                }}
              >
                Back
              </Button>
            </Box>
            <Box
              sx={{
                background: "#831F3F",
                boxShadow: "10px 10px 5px rgba(0, 0, 0, 0.15)",
                mt: '50px',
                mx: '20px',  
              }}
            >
                <TableContainer component={Paper} sx={{background:'#33151D'}}>
                  <Table sx ={{ minWidth: 650, }} size='small'>
                    <TableHead>
                      <TableRow>
                      <TableCell sx= {{color: "#EDEDED",}}>Redo Transaction</TableCell>
                        <TableCell sx= {{color: "#EDEDED",}}>Show Actions</TableCell>
                        <TableCell sx= {{color: "#EDEDED",}}>Transaction ID</TableCell>
                        <TableCell sx= {{color: "#EDEDED",}}>Requested CPU</TableCell>
                        <TableCell sx= {{color: "#EDEDED",}}>Payment</TableCell>
                        <TableCell sx= {{color: "#EDEDED",}}>Action Amount</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {transactions.map((row, key)=>(
                        <Row row={row} index={key} key={key}/>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
            </Box>
          </Box>
          


        ) : (
          <Box>
            <Typography
              sx={{
                fontWeight: "600",
                fontSize: "36px",
                lineHeight: "42px",
                color: "#EDEDED",
              }}
            >
              LimitlessWAX
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: "200px 0 118px",
              }}
            >
              <Button
                variant="outlined"
                onClick={() => setAddActionOpen(true)}
                sx={{
                  border: "1px solid #FFFFFF!important",
                  background: "#882140",
                  p: "8px 22px",
                  fontWeight: "600",
                  fontSize: "24px",
                  lineHeight: "28px",
                  color: "#FAFAFA",
                  textTransform: "capitalize",
                }}
              >
                Create
              </Button>
              <Typography
                sx={{
                  fontWeight: "600",
                  fontSize: "24px",
                  lineHeight: "28px",
                  color: "#F0F0F0",
                  mx: "35px",
                }}
              >
                or
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  border: "1px solid #FFFFFF!important",
                  background: "#882140",
                  p: "8px 22px",
                  fontWeight: "600",
                  fontSize: "24px",
                  lineHeight: "28px",
                  color: "#FAFAFA",
                  textTransform: "capitalize",
                }}
              >
                Load 
              </Button>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                background: "#831F3F",
                p: { xs: "20px 20px", sm: "27px 70px" },
                borderRadius: "15px",
                maxWidth: 551,
                mx: "auto",
              }}
            >
              {Array.from(Array(4).keys()).map((key) => (
                <Button
                  key={key}
                  variant="outlined"
                  sx={{
                    border: "2px dashed #A6A6A6!important",
                    fontWeight: "800",
                    width: 65,
                    aspectRatio: "1",
                    fontSize: "46px",
                    lineHeight: "46px",
                    color: "#EEEEEE",
                  }}
                >
                  +
                </Button>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Limitlesswax;



