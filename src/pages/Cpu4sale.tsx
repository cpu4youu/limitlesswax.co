import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Button,
  Typography,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
const { JsonRpc } = require('eosjs');

const httpEndpoint = "http://wax.greymass.com/";
const rpc = new JsonRpc(httpEndpoint);

const MIN_FEE_RATE = 20
const MAX_FEE_RATE = 300

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
}));
//@ts-expect-error
const Cpu4sale = ({ ual }) => {
  const classes = useStyles();
  const [tabItem, setTabItem] = useState<string>("tab1");
  const [timer, setTimer] = useState<number>(0)

  const [totalWAX, setTotalWAX] = useState<number>(0)
  const [freeWAX, setFreeWAX] = useState<number>(0)
  const [rateWAX, setRateWAX] = useState<number>(0)
  const [multiDayFee, setMultiDayFee] = useState<number>(0)
  const [exponent, setExponent] = useState<number>(0)
  const [multiplier, setMultiplier] = useState<number>(0)
  const [daily, setDaily] = useState<number>(0)
  const [weekly, setWeekly] = useState<number>(0)
  const [monthly, setMonthly] = useState<number>(0)

  const [amountSend, setAmountSend] = useState(0)
  const [amountDays, setAmountDays] = useState<number>(0)
  const [amounttobeStaked, setAmounttobeStaked] = useState<number>(0)
  const [usertoStake, setUsertoStake] = useState<string>('')

  const [userBalance, setUserBalance] = useState<number>(0)
  const [userBalanceSystem, setUserBalanceSystem] = useState<number>(0)

  const [amountWithdraw, setAmountWithdraw] = useState<number>(0)

  useEffect(()=> {
    async function getConfig(){
      const response = await rpc.get_table_rows({
        json: true, // Get the response as json
        code: "cpu4", // Contract that we target
        scope: "cpu4", // Account that owns the data
        table: "config", // Table name
        reverse: false, // Optional: Get reversed data
      })
      const TotalWAX: number = Math.round(parseFloat(response['rows'][0]['total_wax'].slice(0, -4)) * 100) / 100
      const Rate: number = parseFloat(response['rows'][0]['total_wax'])
      const LoanedWAX: number =  Math.round(parseFloat(response['rows'][0]['current_loaned'].slice(0, -4)) * 100) / 100
      const FreeWAX: number = Math.round((TotalWAX- LoanedWAX) * 100)  / 100
      const MultiDayFee: number = parseFloat(response['rows'][0]['multi_day_fee'])
      const Exponent: number = parseFloat(response['rows'][0]['exponent'])
      setTotalWAX(TotalWAX)
      setFreeWAX(FreeWAX)
      setRateWAX(Rate)
      setMultiDayFee(MultiDayFee)
      setExponent(exponent)
      //var Multiplier: number = (1.0 -(LoanedWAX / TotalWAX)) ** exponent * 100
      var Multiplier: number = Math.pow(1.0 - LoanedWAX / TotalWAX, Exponent)  *  MAX_FEE_RATE
      if(Multiplier < MIN_FEE_RATE){
        Multiplier = MIN_FEE_RATE
      }
      setMultiplier(Multiplier)
      const Daily = calculatedStakedWAX(Multiplier, MultiDayFee,1,1)
      const Weekly = calculatedStakedWAX(Multiplier, MultiDayFee,7,7)
      const Monthly = calculatedStakedWAX(Multiplier, MultiDayFee,31,31)
      setDaily(Daily)
      setWeekly(Weekly)
      setMonthly(Monthly)
      
    }
    getConfig()
  }, [])
  useEffect(() => {
    const interval = setInterval(()=> setTimer(Date.now()), 60000);
    async function getConfig(){
      const response = await rpc.get_table_rows({
        json: true, // Get the response as json
        code: "cpu4", // Contract that we target
        scope: "cpu4", // Account that owns the data
        table: "config", // Table name
        reverse: false, // Optional: Get reversed data
      })
      const TotalWAX: number = Math.round(parseFloat(response['rows'][0]['total_wax'].slice(0, -4)) * 100) / 100
      const Rate: number = parseFloat(response['rows'][0]['total_wax'])
      const LoanedWAX: number =  Math.round(parseFloat(response['rows'][0]['current_loaned'].slice(0, -4)) * 100) / 100
      const FreeWAX: number = Math.round((TotalWAX- LoanedWAX) * 100)  / 100
      const MultiDayFee: number = parseFloat(response['rows'][0]['multi_day_fee'])
      const Exponent: number = parseFloat(response['rows'][0]['exponent'])
      setTotalWAX(TotalWAX)
      setFreeWAX(FreeWAX)
      setRateWAX(Rate)
      setMultiDayFee(MultiDayFee)
      setExponent(exponent)
      //var Multiplier: number = (1.0 -(LoanedWAX / TotalWAX)) ** exponent * 100
      var Multiplier: number = Math.pow(1.0 - LoanedWAX / TotalWAX, Exponent)  *  MAX_FEE_RATE
      if(Multiplier < MIN_FEE_RATE){
        Multiplier = MIN_FEE_RATE
      }
      setMultiplier(Multiplier)
      
      const Daily = calculatedStakedWAX(Multiplier, MultiDayFee,1,1)
      const Weekly = calculatedStakedWAX(Multiplier, MultiDayFee,7,7)
      const Monthly = calculatedStakedWAX(Multiplier, MultiDayFee,31,31)

      setDaily(Daily)
      setWeekly(Weekly)
      setMonthly(Monthly)
      
    }

    if(timer >= Math.floor(Date.now()/1000)){
      getConfig()
    } 
    return () =>{
      clearInterval(interval)
    }
  }, [timer])

  useEffect(() => {
    async function getBalance(){
      const response = await rpc.get_account(ual.activeUser.accountName)
      var amount = response['core_liquid_balance'].slice(0, -4)
      setUserBalance(parseFloat(amount))
    }
    async function getSystemBalance(){
      const response = await rpc.get_table_rows({
        json: true, // Get the response as json
        code: "cpu4", // Contract that we target
        scope: "cpu4", // Account that owns the data
        table: "deposits", // Table name
        limit: 1, // Maximum number of rows that we want to get
        reverse: false, // Optional: Get reversed data
        show_payer: false, // Optional: Show ram payer
        upper_bound: ual.activeUser.accountName,
        lower_bound: ual.activeUser.accountName,
      })
      var amount = response['rows'][0]['wax'].slice(0, -4)
      setUserBalanceSystem(parseFloat(amount))
    }
    if(tabItem === 'tab3' || tabItem  === 'tab4'){
      getBalance()
      getSystemBalance()
    }
  },[tabItem])

  useEffect(()=>{
    async function getConfig(){
      const response = await rpc.get_table_rows({
        json: true, // Get the response as json
        code: "cpu4", // Contract that we target
        scope: "cpu4", // Account that owns the data
        table: "config", // Table name
        reverse: false, // Optional: Get reversed data
      })
      const TotalWAX: number = Math.round(parseFloat(response['rows'][0]['total_wax'].slice(0, -4)) * 100) / 100
      const Rate: number = parseFloat(response['rows'][0]['total_wax'])
      const LoanedWAX: number =  Math.round(parseFloat(response['rows'][0]['current_loaned'].slice(0, -4)) * 100) / 100
      const FreeWAX: number = Math.round((TotalWAX- LoanedWAX) * 100)  / 100
      const MultiDayFee: number = parseFloat(response['rows'][0]['multi_day_fee'])
      const Exponent: number = parseFloat(response['rows'][0]['exponent'])
      setTotalWAX(TotalWAX)
      setFreeWAX(FreeWAX)
      setRateWAX(Rate)
      setMultiDayFee(MultiDayFee)
      setExponent(exponent)
      //var Multiplier: number = (1.0 -(LoanedWAX / TotalWAX)) ** exponent * 100
      var Multiplier: number = Math.pow(1.0 - LoanedWAX / TotalWAX, Exponent)  *  MAX_FEE_RATE
      if(Multiplier < MIN_FEE_RATE){
        Multiplier = MIN_FEE_RATE
      }
      setMultiplier(Multiplier)
      const Daily = calculatedStakedWAX(Multiplier, MultiDayFee,1,1)
      const Weekly = calculatedStakedWAX(Multiplier, MultiDayFee,7,7)
      const Monthly = calculatedStakedWAX(Multiplier, MultiDayFee,14,14)
      setDaily(Daily)
      setWeekly(Weekly)
      setMonthly(Monthly)
      
    }
    getConfig()
    if(amountDays === 0 || amountSend === 0){
      setAmounttobeStaked(0)
    } else {
      var amount: any = calculatedStakedWAX(multiplier, multiDayFee, amountDays, amountSend)
      amount = amount.toFixed(3)
      setAmounttobeStaked(amount)
    }
  },[amountSend, amountDays])
  const requestCPUforSelf = async() => {
    var actions = {};
    var response = {};
    try {
      response = await fetch("https://api.limitlesswax.co/", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      console.log(response);
    } catch (e) {
      console.error(e);
      // process.exit();
      // alert(e);
      console.log(JSON.stringify(e));
      //@ts-ignore
      response.status = 400;
    }
    var enough_cpu = false;
    try {
      var account_info = await fetch(
        "https://api.wax.greeneosio.com/v2/state/get_account?limit=1&skip=0&account=limitlesswax",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      var account_info_json = await account_info.json();
      console.log(account_info_json.account.cpu_limit);

      if (parseInt(account_info_json.account.cpu_limit.available) > 5000) {
        console.log("Enough cpu left");
        enough_cpu = true;
      } else {
        console.log("Not enough cpu");
        enough_cpu = false;
      }
    } catch (e) {
      console.error(e);
      // process.exit();
      // alert(e);
      console.log(JSON.stringify(e));
      enough_cpu = false;
    }
    //@ts-ignore
    if (response.status != 200 || enough_cpu == false) {
      console.log("Server is down.");
      // exclude the server signing part
      actions = {
        actions: [
          {
            account: "eosio.token",
            name: "transfer",
            data: {
              from: ual.activeUser.accountName,
              to: "cpu4",
              quantity: amountSend.toFixed(8) + " WAX",
              memo: amountDays + "",
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
    } else {
      console.log("Server is up.");
      // include the server signing part
      actions = {
        max_cpu_usage_ms: 8,
        max_net_usage_words: 5000,
        actions: [
          {
            account: "limitlesswax",
            name: "paycpu",
            data: {
              user: ual.activeUser.accountName,
              info: "8 ms max",
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
              to: "cpu4",
              quantity: amountSend.toFixed(8) + " WAX",
              memo: amountDays + "",
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
    }
    try {
      const r = await ual.activeUser.signTransaction(actions, {
        blocksBehind: 5,
        expireSeconds: 300,
        broadcast: true,
        sign: true,
      });
      console.log(r);
      alert("Transaction ID: " + r.transactionId);
      setAmountDays(3)
      setAmountSend(0)
    } catch (e) {
      console.error(e);
      // process.exit();
      alert(e);
      console.log(JSON.stringify(e));
    }


  }
  const requestCPUforUser = async() => {
    var actions = {};
    var response = {};
    try {
      response = await fetch("https://api.limitlesswax.co/", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      console.log(response);
    } catch (e) {
      console.error(e);
      // process.exit();
      // alert(e);
      console.log(JSON.stringify(e));
      //@ts-ignore
      response.status = 400;
    }

    var enough_cpu = false;
    try {
      var account_info = await fetch(
        "https://api.wax.greeneosio.com/v2/state/get_account?limit=1&skip=0&account=limitlesswax",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      var account_info_json = await account_info.json();
      console.log(account_info_json.account.cpu_limit);

      if (parseInt(account_info_json.account.cpu_limit.available) > 5000) {
        console.log("Enough cpu left");
        enough_cpu = true;
      } else {
        console.log("Not enough cpu");
        enough_cpu = false;
      }
    } catch (e) {
      console.error(e);
      // process.exit();
      // alert(e);
      console.log(JSON.stringify(e));
      enough_cpu = false;
    }
    //@ts-ignore
    if (response.status != 200 || enough_cpu == false) {
      console.log("Server is down.");
      // exclude the server signing part
      actions = {
        actions: [
          {
            account: "eosio.token",
            name: "transfer",
            data: {
              from: ual.activeUser.accountName,
              to: "cpu4",
              quantity: amountSend.toFixed(8) + " WAX",
              memo: "USER:" + usertoStake + "," + amountDays,
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
    } else {
      console.log("Server is up.");
      // include the server signing part
      actions = {
        max_cpu_usage_ms: 8,
        max_net_usage_words: 5000,
        actions: [
          {
            account: "limitlesswax",
            name: "paycpu",
            data: {
              user: ual.activeUser.accountName,
              info: "8 ms max",
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
              to: "cpu4",
              quantity: amountSend.toFixed(8) + " WAX",
              memo: "USER:" + usertoStake + "," + amountDays,
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
    }

    try {
      const r = await ual.activeUser.signTransaction(actions, {
        blocksBehind: 5,
        expireSeconds: 300,
        broadcast: true,
        sign: true,
      });
      console.log(r);
      alert("Transaction ID: " + r.transactionId);
      setAmountDays(3)
      setAmountSend(0)
      setUsertoStake('')
    } catch (e) {
      console.error(e);
      // process.exit();
      alert(e);
      console.log(JSON.stringify(e));
    }
  }
  const depositWAX = async() =>{
    var actions = {};
    var response = {};
    try {
      response = await fetch("https://api.limitlesswax.co/", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      console.log(response);
    } catch (e) {
      console.error(e);
      // process.exit();
      // alert(e);
      console.log(JSON.stringify(e));
      //@ts-ignore
      response.status = 400;
    }

    var enough_cpu = false;
    try {
      var account_info = await fetch(
        "https://api.wax.greeneosio.com/v2/state/get_account?limit=1&skip=0&account=limitlesswax",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      var account_info_json = await account_info.json();
      console.log(account_info_json.account.cpu_limit);

      if (parseInt(account_info_json.account.cpu_limit.available) > 5000) {
        console.log("Enough cpu left");
        enough_cpu = true;
      } else {
        console.log("Not enough cpu");
        enough_cpu = false;
      }
    } catch (e) {
      console.error(e);
      // process.exit();
      // alert(e);
      console.log(JSON.stringify(e));
      enough_cpu = false;
    }
    //@ts-ignore
    if (response.status != 200 || enough_cpu == false) {
      console.log("Server is down.");
      // exclude the server signing part
      actions = {
        actions: [
          {
            account: "eosio.token",
            name: "transfer",
            data: {
              from: ual.activeUser.accountName,
              to: "cpu4",
              quantity: amountSend.toFixed(8) + " WAX",
              memo: "Deposit",
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
    } else {
      console.log("Server is up.");
      // include the server signing part
      actions = {
        max_cpu_usage_ms: 8,
        max_net_usage_words: 5000,
        actions: [
          {
            account: "limitlesswax",
            name: "paycpu",
            data: {
              user: ual.activeUser.accountName,
              info: "8 ms max",
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
              to: "cpu4",
              quantity: amountSend.toFixed(8) + " WAX",
              memo: "Deposit",
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
    }
    try {
      const r = await ual.activeUser.signTransaction(actions, {
        blocksBehind: 5,
        expireSeconds: 300,
        broadcast: true,
        sign: true,
      });
      console.log(r);
      alert("Transaction ID: " + r.transactionId);
      setUserBalanceSystem(userBalanceSystem + amountSend)
      setUserBalance(userBalance - amountSend)
      setAmountSend(0)
    } catch (e) {
      console.error(e);
      // process.exit();
      alert(e);
      console.log(JSON.stringify(e));
    }
  }
  const transactionWithdraw = async () => {
    var actions = {};
    var response = {};
    try {
      response = await fetch("https://api.limitlesswax.co/", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      console.log(response);
    } catch (e) {
      console.error(e);
      // process.exit();
      // alert(e);
      console.log(JSON.stringify(e));
      //@ts-ignore
      response.status = 400;
    }

    var enough_cpu = false;
    try {
      var account_info = await fetch(
        "https://api.wax.greeneosio.com/v2/state/get_account?limit=1&skip=0&account=limitlesswax",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      var account_info_json = await account_info.json();
      console.log(account_info_json.account.cpu_limit);

      if (parseInt(account_info_json.account.cpu_limit.available) > 5000) {
        console.log("Enough cpu left");
        enough_cpu = true;
      } else {
        console.log("Not enough cpu");
        enough_cpu = false;
      }
    } catch (e) {
      console.error(e);
      // process.exit();
      // alert(e);
      console.log(JSON.stringify(e));
      enough_cpu = false;
    }
    //@ts-ignore
    if (response.status != 200 || enough_cpu == false) {
      console.log("Server is down.");
      // exclude the server signing part
      actions = {
        actions: [
          {
            account: "cpu4",
            name: "withdraw",
            data: {
              username: ual.activeUser.accountName,
              amount: amountWithdraw.toFixed(8) + " WAX",
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
    } else {
      console.log("Server is up.");
      // include the server signing part
      actions = {
        max_cpu_usage_ms: 8,
        max_net_usage_words: 5000,
        actions: [
          {
            account: "limitlesswax",
            name: "paycpu",
            data: {
              user: ual.activeUser.accountName,
              info: "8 ms max",
            },
            authorization: [
              {
                actor: "limitlesswax",
                permission: "cosign",
              },
            ],
          },
          {
            account: "cpu4",
            name: "withdraw",
            data: {
              username: ual.activeUser.accountName,
              amount: amountWithdraw.toFixed(8) + " WAX",
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
    }

    try {
      const r = await ual.activeUser.signTransaction(actions, {
        blocksBehind: 5,
        expireSeconds: 300,
        broadcast: true,
        sign: true,
      });
      console.log(r);
      alert("Transaction ID: " + r.transactionId);
      setUserBalanceSystem(userBalanceSystem - amountWithdraw)
      setAmountWithdraw(0);
    } catch (e) {
      console.error(e);
      // process.exit();
      alert(e);
      console.log(JSON.stringify(e));
    }
  };
  return (
    <Container
      sx={{
        pt: { xs: "30px", md: "60px" },
        pb: { xs: "30px", md: "100px" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "center",
          alignItems: "center",
          mb: "50px",
        }}
      >
        <Box
          sx={{
            background: "#5C2736",
            boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.15)",
            borderRadius: "30px",
            p: { xs: "20px", md: "20px 38px" },
            maxWidth: 375,
            mr: { sm: "20px", md: "60px" },
            mb: { xs: "20px", sm: 0 },
          }}
        >
          <Typography
            sx={{
              fontWeight: "600",
              fontSize: { xs: "28px", md: "36px" },
              lineHeight: { xs: "36px", md: "42px" },
              color: "#FFFFFF",
              textAlign: "center",
              mb: "15px",
            }}
          >
            {`${totalWAX} WAX`}
          </Typography>
          <Typography
            sx={{
              fontWeight: "400",
              fontSize: "24px",
              lineHeight: "28px",
              color: "#FFFFFF",
              textAlign: "center",
            }}
          >
            Total Wax in System
          </Typography>
        </Box>
        <Box
          sx={{
            background: "#5C2736",
            boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.15)",
            borderRadius: "30px",
            p: { xs: "20px", md: "20px 38px" },
            maxWidth: 375,
          }}
        >
          <Typography
            sx={{
              fontWeight: "600",
              fontSize: { xs: "28px", md: "36px" },
              lineHeight: { xs: "36px", md: "42px" },
              color: "#FFFFFF",
              textAlign: "center",
              mb: "15px",
            }}
          >
            {`${freeWAX} WAX`}
          </Typography>
          <Typography
            sx={{
              fontWeight: "400",
              fontSize: "24px",
              lineHeight: "28px",
              color: "#FFFFFF",
              textAlign: "center",
            }}
          >
            Free Wax in System
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          background: "#4A1E2A",
          boxShadow: "10px 10px 5px rgba(0, 0, 0, 0.15)",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          minHeight: 390,
        }}
      >
        <Box
          sx={{
            minWidth: 300,
            background: "#831F3F",
          }}
        >
          <List sx={{ p: 0 }}>
            <ListItemButton
              onClick={() => setTabItem("tab1")}
              sx={{
                minHeight: { xs: "40px", md: "60px" },
                background: tabItem === "tab1" ? "#391E24" : "transparent",
                "&:hover": {
                  background: tabItem === "tab1" ? "#391E24" : "transparent",
                },
              }}
            >
              <ListItemText
                primary="Request CPU for Self"
                primaryTypographyProps={{
                  fontWeight: "500",
                  fontSize: { xs: "18px", md: "24px" },
                  lineHeight: { xs: "24px", md: "28px" },
                  color: "#EDEDED",
                }}
              ></ListItemText>
            </ListItemButton>
            <ListItemButton
              onClick={() => setTabItem("tab2")}
              sx={{
                minHeight: { xs: "40px", md: "60px" },
                background: tabItem === "tab2" ? "#391E24" : "transparent",
                "&:hover": {
                  background: tabItem === "tab2" ? "#391E24" : "transparent",
                },
              }}
            >
              <ListItemText
                primary="Stake to User"
                primaryTypographyProps={{
                  fontWeight: "500",
                  fontSize: { xs: "18px", md: "24px" },
                  lineHeight: { xs: "24px", md: "28px" },
                  color: "#EDEDED",
                }}
              ></ListItemText>
            </ListItemButton>
            <ListItemButton
              onClick={() => setTabItem("tab3")}
              sx={{
                minHeight: { xs: "40px", md: "60px" },
                background: tabItem === "tab3" ? "#391E24" : "transparent",
                "&:hover": {
                  background: tabItem === "tab3" ? "#391E24" : "transparent",
                },
              }}
            >
              <ListItemText
                primary="Deposit and Earn"
                primaryTypographyProps={{
                  fontWeight: "500",
                  fontSize: { xs: "18px", md: "24px" },
                  lineHeight: { xs: "24px", md: "28px" },
                  color: "#EDEDED",
                }}
              ></ListItemText>
            </ListItemButton>
            <ListItemButton
              onClick={() => setTabItem("tab4")}
              sx={{
                minHeight: { xs: "40px", md: "60px" },
                background: tabItem === "tab4" ? "#391E24" : "transparent",
                "&:hover": {
                  background: tabItem === "tab4" ? "#391E24" : "transparent",
                },
              }}
            >
              <ListItemText
                primary="Withdraw"
                primaryTypographyProps={{
                  fontWeight: "500",
                  fontSize: { xs: "18px", md: "24px" },
                  lineHeight: { xs: "24px", md: "28px" },
                  color: "#EDEDED",
                }}
              ></ListItemText>
            </ListItemButton>
          </List>
        </Box>
        <Box
          sx={{
            width: "100%",
            p: "20px 30px",
          }}
        >
          {tabItem === "tab1" ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ mb: { xs: "20px", sm: 0 } }}>
                <Box sx={{ mb: "10px" }}>
                  <Typography
                    sx={{
                      fontWeight: "400",
                      fontSize: { xs: "20px", md: "24px" },
                      lineHeight: { xs: "24px", md: "28px" },
                      color: "#EDEDED",
                      mb: "10px",
                    }}
                  >
                    Amount to send
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <input
                      type="text"
                      className={classes.textInput}
                      style={{ width: "250px" }}
                      onChange={e => setAmountSend(parseFloat(e.target.value))}
                      defaultValue={amountSend}
                    />
                    <Typography
                      sx={{
                        fontWeight: "700",
                        fontSize: { xs: "20px", md: "24px" },
                        lineHeight: { xs: "24px", md: "28px" },
                        color: "#EDEDED",
                        ml: "10px",
                      }}
                    >
                      WAX
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ mb: "10px" }}>
                  <Typography
                    sx={{
                      fontWeight: "400",
                      fontSize: { xs: "20px", md: "24px" },
                      lineHeight: { xs: "24px", md: "28px" },
                      color: "#EDEDED",
                      mb: "10px",
                    }}
                  >
                    Number of days
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <input
                      type="text"
                      className={classes.textInput}
                      style={{ width: "85px" }}
                      onChange={e => setAmountDays(parseFloat(e.target.value))}
                      defaultValue={amountDays}
                    />
                    <Typography
                      sx={{
                        fontWeight: "700",
                        fontSize: { xs: "20px", md: "24px" },
                        lineHeight: { xs: "24px", md: "28px" },
                        color: "#EDEDED",
                        ml: "10px",
                      }}
                    >
                      Days
                    </Typography>
                  </Box>
                </Box>
                <Typography
                  sx={{
                    fontWeight: "400",
                    fontSize: { xs: "20px", md: "24px" },
                    lineHeight: { xs: "24px", md: "28px" },
                    color: "#EDEDED",
                    mb: "10px",
                  }}
                >
                  Amount to be staked
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "700",
                    fontSize: { xs: "20px", md: "24px" },
                    lineHeight: { xs: "24px", md: "28px" },
                    color: "#EDEDED",
                    mb: "20px",
                  }}
                >
                  {`${amounttobeStaked} WAX`}
                </Typography>
                <Button
                  sx={{
                    background: "#882140",
                    border: "1px solid #FFFFFF",
                    fontWeight: "700",
                    fontSize: { xs: "18px", md: "22px" },
                    lineHeight: { xs: "22px", md: "26px" },
                    color: "#EDEDED",
                    p: "10px 13px",
                    textTransform: "capitalize",
                  }}
                  onClick={() =>{requestCPUforSelf()}}
                >
                  Request self stake
                </Button>
              </Box>
             
            </Box>
          ) : null}
          {tabItem === "tab2" ? (
            <Box>
              <Box sx={{ mb: "10px" }}>
                <Typography
                  sx={{
                    fontWeight: "400",
                    fontSize: { xs: "20px", md: "24px" },
                    lineHeight: { xs: "24px", md: "28px" },
                    color: "#EDEDED",
                    mb: "10px",
                  }}
                >
                  Amount to send
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="text"
                    className={classes.textInput}
                    style={{ width: "250px" }}
                    onChange={e => {setAmountSend(parseFloat(e.target.value))}}
                    defaultValue={amountSend}
                  />
                  <Typography
                    sx={{
                      fontWeight: "700",
                      fontSize: { xs: "20px", md: "24px" },
                      lineHeight: { xs: "24px", md: "28px" },
                      color: "#EDEDED",
                      ml: "10px",
                    }}
                  >
                    WAX
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  mb: "10px",
                }}
              >
                <Box
                  sx={{
                    mr: { xs: 0, sm: "50px" },
                    mb: { xs: "10px", sm: 0 },
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "400",
                      fontSize: { xs: "20px", md: "24px" },
                      lineHeight: { xs: "24px", md: "28px" },
                      color: "#EDEDED",
                      mb: "10px",
                    }}
                  >
                    Number of days
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <input
                      type="text"
                      className={classes.textInput}
                      style={{ width: "85px" }}
                      onChange={e => setAmountDays(parseFloat(e.target.value))}
                      defaultValue={amountDays}
                    />
                    <Typography
                      sx={{
                        fontWeight: "700",
                        fontSize: { xs: "20px", md: "24px" },
                        lineHeight: { xs: "24px", md: "28px" },
                        color: "#EDEDED",
                        ml: "10px",
                      }}
                    >
                      Days
                    </Typography>
                  </Box>
                </Box>
                
                <Box>
                  <Typography
                    sx={{
                      fontWeight: "400",
                      fontSize: { xs: "20px", md: "24px" },
                      lineHeight: { xs: "24px", md: "28px" },
                      color: "#EDEDED",
                      mb: "10px",
                    }}
                  >
                    User to stake to
                  </Typography>
                  <Box>
                    <input
                      type="text"
                      className={classes.textInput}
                      style={{ width: "250px" }}
                      onChange={e => setUsertoStake(e.target.value)}
                    />
                  </Box>
                </Box>
              </Box>
              
              <Typography
                sx={{
                  fontWeight: "400",
                  fontSize: { xs: "20px", md: "24px" },
                  lineHeight: { xs: "24px", md: "28px" },
                  color: "#EDEDED",
                  mb: "10px",
                }}
              >
                Amount to be staked
              </Typography>
              <Typography
                sx={{
                  fontWeight: "700",
                  fontSize: { xs: "20px", md: "24px" },
                  lineHeight: { xs: "24px", md: "28px" },
                  color: "#EDEDED",
                  mb: "20px",
                }}
              >
                {`${amounttobeStaked} WAX`}
              </Typography>
              
              <Button
                sx={{
                  background: "#882140",
                  border: "1px solid #FFFFFF",
                  fontWeight: "700",
                  fontSize: { xs: "18px", md: "22px" },
                  lineHeight: { xs: "22px", md: "26px" },
                  color: "#EDEDED",
                  p: "10px 13px",
                  textTransform: "capitalize",
                }}
                onClick={() => {requestCPUforUser()}}
              >
                Stake to user
              </Button>
            </Box>
          ) : null}
          {tabItem === "tab3" ? (
            <Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  mb: "15px",
                }}
              >
                <Box
                  sx={{
                    mr: { xs: 0, sm: "45px" },
                    mb: { xs: "10px", md: 0 },
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "400",
                      fontSize: { xs: "20px", md: "24px" },
                      lineHeight: { xs: "24px", md: "28px" },
                      color: "#EDEDED",
                      mb: "10px",
                    }}
                  >
                    WAX Balance
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "700",
                      fontSize: { xs: "20px", md: "24px" },
                      lineHeight: { xs: "24px", md: "28px" },
                      color: "#EDEDED",
                    }}
                  >
                    {`${userBalance} WAX`}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontWeight: "400",
                      fontSize: { xs: "20px", md: "24px" },
                      lineHeight: { xs: "24px", md: "28px" },
                      color: "#EDEDED",
                      mb: "10px",
                    }}
                  >
                    WAX in System
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "700",
                      fontSize: { xs: "20px", md: "24px" },
                      lineHeight: { xs: "24px", md: "28px" },
                      color: "#EDEDED",
                    }}
                  >
                    {`${userBalanceSystem} WAX`}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ mb: "20px" }}>
                <Typography
                  sx={{
                    fontWeight: "400",
                    fontSize: { xs: "20px", md: "24px" },
                    lineHeight: { xs: "24px", md: "28px" },
                    color: "#EDEDED",
                    mb: "10px",
                  }}
                >
                  Amount to send
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="text"
                    className={classes.textInput}
                    style={{ width: "250px" }}
                    onChange={e => {setAmountSend(parseFloat(e.target.value))}}
                    defaultValue={amountSend}
                  />
                  <Typography
                    sx={{
                      fontWeight: "700",
                      fontSize: { xs: "20px", md: "24px" },
                      lineHeight: { xs: "24px", md: "28px" },
                      color: "#EDEDED",
                      ml: "10px",
                    }}
                  >
                    WAX
                  </Typography>
                </Box>
              </Box>
              <Button
                sx={{
                  background: "#882140",
                  border: "1px solid #FFFFFF",
                  fontWeight: "700",
                  fontSize: { xs: "18px", md: "22px" },
                  lineHeight: { xs: "22px", md: "26px" },
                  color: "#EDEDED",
                  p: "10px 13px",
                  textTransform: "capitalize",
                }}
                onClick={()=>{depositWAX()}}
              >
                Deposit and Earn
              </Button>
            </Box>
          ) : null}
          {tabItem === "tab4" ? (
            <Box>
              <Box sx={{ mb: "15px" }}>
                <Typography
                  sx={{
                    fontWeight: "400",
                    fontSize: { xs: "20px", md: "24px" },
                    lineHeight: { xs: "24px", md: "28px" },
                    color: "#EDEDED",
                    mb: "10px",
                  }}
                >
                  WAX in System
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "700",
                    fontSize: { xs: "20px", md: "24px" },
                    lineHeight: { xs: "24px", md: "28px" },
                    color: "#EDEDED",
                  }}
                >
                  {`${userBalanceSystem} WAX`}
                </Typography>
              </Box>
              <Box sx={{ mb: "20px" }}>
                <Typography
                  sx={{
                    fontWeight: "400",
                    fontSize: { xs: "20px", md: "24px" },
                    lineHeight: { xs: "24px", md: "28px" },
                    color: "#EDEDED",
                    mb: "10px",
                  }}
                >
                  Amount to withdraw
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="text"
                    className={classes.textInput}
                    style={{ width: "250px" }}
                    onChange={e => {setAmountWithdraw(parseFloat(e.target.value))}}
                    defaultValue={0}
                  />
                  <Typography
                    sx={{
                      fontWeight: "700",
                      fontSize: { xs: "20px", md: "24px" },
                      lineHeight: { xs: "24px", md: "28px" },
                      color: "#EDEDED",
                      ml: "10px",
                    }}
                  >
                    WAX
                  </Typography>
                </Box>
              </Box>
              <Button
                sx={{
                  background: "#882140",
                  border: "1px solid #FFFFFF",
                  fontWeight: "700",
                  fontSize: { xs: "18px", md: "22px" },
                  lineHeight: { xs: "22px", md: "26px" },
                  color: "#EDEDED",
                  p: "10px 13px",
                  textTransform: "capitalize",
                }}
                onClick={()=>{transactionWithdraw()}}
              >
                Withdraw
              </Button>
            </Box>
          ) : null}
        </Box>
        {tabItem === 'tab1' || tabItem === 'tab2' ? (
          <Box
          sx={{
            background: "#831F3F",
            boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.15)",
            borderRadius: "30px",
            p: "15px",
            minWidth: 195,
            width: 195,
            mx: { xs: "auto", sm: "unset" },
          }}
        >
          <Typography
            sx={{
              fontWeight: "700",
              fontSize: { xs: "28px", md: "36px" },
              lineHeight: { xs: "36px", md: "42px" },
              textAlign: "center",
              color: "#EDEDED",
              mb: { xs: "16px", md: "26px" },
            }}
          >
            Rate per WAX
            
          </Typography>
          
          <Typography
            sx={{
              fontWeight: "700",
              fontSize: { xs: "16px", md: "18px" },
              lineHeight: { xs: "18px", md: "21px" },
              textAlign: "center",
              color: "#EDEDED",
              mb: "10px",
            }}
          >
            Day = 1 WAX
          </Typography>
          <Typography
            sx={{
              fontWeight: "700",
              fontSize: { xs: "20px", md: "24px" },
              lineHeight: { xs: "24px", md: "28px" },
              textAlign: "center",
              color: "#EDEDED",
              mb: "12px",
            }}
          >
            {`${daily.toFixed(3)} WAX`}
          </Typography>
          <Typography
            sx={{
              fontWeight: "700",
              fontSize: { xs: "16px", md: "18px" },
              lineHeight: { xs: "18px", md: "21px" },
              textAlign: "center",
              color: "#EDEDED",
              mb: "10px",
            }}
          >
            Week = 7 WAX
          </Typography>
          <Typography
            sx={{
              fontWeight: "700",
              fontSize: { xs: "20px", md: "24px" },
              lineHeight: { xs: "24px", md: "28px" },
              textAlign: "center",
              color: "#EDEDED",
              mb: "12px",
            }}
          >
            {`${weekly.toFixed(3)} WAX`}
          </Typography>
          <Typography
            sx={{
              fontWeight: "700",
              fontSize: { xs: "16px", md: "18px" },
              lineHeight: { xs: "18px", md: "21px" },
              textAlign: "center",
              color: "#EDEDED",
              mb: "10px",
            }}
          >
            2 Weeks = 14 WAX
          </Typography>
          <Typography
            sx={{
              fontWeight: "700",
              fontSize: { xs: "20px", md: "24px" },
              lineHeight: { xs: "24px", md: "28px" },
              textAlign: "center",
              color: "#EDEDED",
            }}
          >
            {`${monthly.toFixed(3)} WAX`}
          </Typography>
        </Box>
        ) : null }
        
      </Box>
    </Container>
  );
};

const calculatedStakedWAX = (mult: number, fee: number, days: number, WAX: number) => {
  const result = mult * (1 - (fee * (days - 1))) * (WAX / days)
  if(isNaN(result)){
    return 0
  }
  return result
}

export default Cpu4sale;
