import { useHistory } from "react-router-dom";
import { Box, Container, Button, Typography, Link } from "@mui/material";
import React, { useEffect, useState  } from 'react';
import { CircularProgress } from "@mui/material";
import ProgressBar from "@ramonak/react-progress-bar";
import moment from 'moment'

const { JsonRpc } = require('eosjs');

const httpEndpoint = "http://wax.greymass.com/";
const rpc = new JsonRpc(httpEndpoint);

//@ts-expect-error
const Account = ({ ual }) => {
  const history = useHistory();
  const [user, setUser] = useState<string>('NaN');
  const [balance, setBalance] = useState<number>(0.00);
  const [loading, setLoading] = useState<boolean>(true);
  const [startdelay, setStartDelay] = useState<boolean>(true);
  const [rate, setRate] = useState<number>(0)
  const [usd, setUSD] = useState<string>('0.00')
  const [cooldown, setCooldown] = useState<string>('')
  const [time, setTime] = useState<number>(Date.now());
  //For countdown of free CPU
  const [timer, setTimer] = useState<number>(0)
  const [claimcpu, setClaimcpu] = useState(false)
  //RAM
  const [usedRAM, setUsedRAM] = useState<number>(0)
  const [totalRAM, setTotalRAM] = useState<number>(1)
  //CPU
  const [usedCPU, setUsedCPU] = useState<number>(0)
  const [totalCPU, setTotalCPU] = useState<number>(1)
  //NET
  const [usedNET, setUsedNET] = useState<number>(0)
  const [totalNET, setTotalNET] = useState<number>(1)
  //Vote
  const [lastVote, setLastVote] = useState<string>('')
  const [voteTimer, setVoteTimer] = useState<number>(0)
  const [voteCooldown, setVoteCooldown] = useState<string>('');
  const [claimVote, setClaimVote] = useState<boolean>(false)
  //Staked WAX
  const [stakedWAX, setStakedWAX] = useState<number>(0.0)

  const [freeStakes, setFreeStakes] = useState<number>(0)
  const [renderFreeButton, setRenderFreeButton] = useState<boolean>(false)

  useEffect(() => {
    if(!claimcpu && freeStakes < 0){
      setRenderFreeButton(false)
    } else {
      setRenderFreeButton(true)
    }
  },[claimcpu, freeStakes])
  //laoding time so it UAL can load
  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
    setTimeout(() => setStartDelay(false), 500);
  },[])
  //Setting User from UAL
  useEffect(() => {
    if(!startdelay){
      setUser(ual.activeUser.accountName)
    }

  },[startdelay])
 //Get Userdata and Free CPU transaction timer
  useEffect(() =>{
    async function getStakedWAX(){
      if(user !== 'NaN'){
        const response = await rpc.get_table_rows({
          json: true, // Get the response as json
          code: "cpu4", // Contract that we target
          scope: "cpu4", // Account that owns the data
          table: "minions", // Table name
          reverse: false, // Optional: Get reversed data
          index_position: 2,
          key_type: 'i64',
          upper_bound: user,
          lower_bound: user,
        })
        var WAX:  number = 0.0
        response['rows'].forEach((item: { [x: string]: string; }) => {
          const minion_wax = parseFloat(item['wax_staked'].slice(0, -4))
          WAX += minion_wax
        })
        setStakedWAX(WAX)
      }
    }

    async function getTime(){
      if(user !== 'NaN'){
        const response = await rpc.get_table_rows({
          json: true, // Get the response as json
          code: "free.cpu4", // Contract that we target
          scope: "free.cpu4", // Account that owns the data
          table: "users", // Table name
          limit: 1, // Maximum number of rows that we want to get
          reverse: false, // Optional: Get reversed data
          show_payer: false, // Optional: Show ram payer
          upper_bound: user,
          lower_bound: user,
        })
        if (response["rows"].length > 0) {
          const last_use = response['rows'][0]['last_request']
          setTimer(last_use + 172801);
          setClaimcpu(false)
        } else {
          setClaimcpu(true)
        }
    }    
  }
    async function fetchAccount() {
      const response = await rpc.get_account(user)
      //Balance
      setBalance(response['core_liquid_balance'].slice(0, -4))
      //RAM
      setUsedRAM(response['ram_usage'])
      setTotalRAM(response['ram_quota'])
      //CPU
      setUsedCPU(response['cpu_limit']['used'])
      setTotalCPU(response['cpu_limit']['max'])
      //NET
      setUsedNET(response['net_limit']['used'])
      setTotalNET(response['net_limit']['max'])
      //Vote
      var last_vote = response['voter_info']['last_claim_time']
      last_vote = moment(last_vote).valueOf() / 1000
      var timestamp = moment.unix(last_vote).format('YYYY-MM-DD hh:mm:ss a')
      setLastVote(timestamp)
      setVoteTimer(last_vote + 90001) 
    }
    async function fetchRate() {
      fetch('https://www.api.bloks.io/wax/ticker/%5Bobject%20Object%5D')
        .then(res => res.json())
        .then(
          (result) => {
            setRate(result)
          }
        )
      
    }
    async function getFreeStakes(){
      const response = await rpc.get_table_rows({
            json: true, // Get the response as json
            code: "eosio.token", // Contract that we target
            scope: "free.cpu4", // Account that owns the data
            table: "accounts", // Table name
            limit: 10, // Maximum number of rows that we want to get
            reverse: false, // Optional: Get reversed data
            show_payer: false, // Optional: Show ram payer
      })
      var wax = parseFloat(response["rows"][0]["balance"].slice(0, -4));
      if(wax < 0.5){
        setFreeStakes(0)
      } else{
        var amount = Math.floor(wax / 0.5)
        console.log(amount)
        setFreeStakes(amount)
      }
    }
    if(user !== 'NaN'){
      fetchAccount()
      fetchRate()
      getTime()
      getStakedWAX()
      getFreeStakes()
    }
  }, [user])
  //Set USD value if rate or balance is changed
  useEffect(() => {
    if(rate !== 0){
      const value = rate * balance
      setUSD(`$ ${value.toFixed(2)}`);
    }
  }, [rate,balance])
  //Set Timer for User to see when free cpu is rdy to use again
  useEffect(() => {
    const interval = setInterval(()=> setTime(Date.now()), 1000);

    if(timer >= Math.floor(Date.now()/1000)){
      let SECONDS = timer - Math.floor(Date.now()/1000)
      setCooldown(secondsToString(SECONDS))
      setClaimcpu(false)
    } else {
      setClaimcpu(true)
    }
    return () =>{
      clearInterval(interval)
    }
  }, [time])
  //Set Vote Timer
   useEffect(() => {
    const interval = setInterval(()=> setTime(Date.now()), 1000);

    if(voteTimer >= Math.floor(Date.now()/1000)){
      let SECONDS = voteTimer - Math.floor(Date.now()/1000)
      setVoteCooldown(secondsToString(SECONDS))
      setClaimVote(false)
    } else {
      setClaimVote(true)
    }
    return () =>{
      clearInterval(interval)
    }
  }, [time]) 
  //Free cpu transaction
  const transactionFreeCPU = async () => {
    if(!claimcpu){
      alert('Cant use free cpu');
      return
    }
    var actions = {};
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
        setClaimcpu(false)
        setTimer(Date.now()/1000 + 172801);
      } catch (e) {
        console.error(e);
        // process.exit();
        alert(e);
        console.log(JSON.stringify(e));
      } 
  }
  const transactionClaimVote = async () => {
    if(!claimVote){
      alert('Cant use claim Vote yet');
      return
    }
    var actions = {};
      actions = {
        max_cpu_usage_ms: 5,
        max_net_usage_words: 5000,
        actions: [
          {
            account: "eosio",
            name: "claimgenesis",
            data: {
              claimer: ual.activeUser.accountName,
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
            name: "claimgbmvote",
            data: {
              owner: ual.activeUser.accountName,
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
        setClaimVote(false)
        setVoteTimer(Date.now()/1000 + 90001)
      } catch (e) {
        console.error(e);
        // process.exit();
        alert(e);
        console.log(JSON.stringify(e));
      } 
  }
  return (
  <>{loading === false ? (
    <Container
        sx={{
          pt: { xs: "30px", md: "50px" },
          pb: { xs: "30px", md: "100px" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            mb: "70px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: { xs: "20px", md: 0 },
            }}
          >
            <Box
              sx={{
                background: "#8C243F",
                boxShadow: "10px 10px 8px rgba(0, 0, 0, 0.15)",
                width: { xs: 132, md: 172 },
                aspectRatio: "1",
                borderRadius: "50%",
              }}
            ></Box>
            <Typography
              sx={{
                fontWeight: "700",
                fontSize: { xs: "36px", md: "48px" },
                lineHeight: { xs: "44px", md: "56px" },
                color: "#EBEBEB",
                ml: { xs: "20px", md: "40px" },
              }}
            >
              {user}
            </Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Box
              sx={{
                background: "#391E24",
                boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.15)",
                borderRadius: "25px",
                maxWidth: { xs: 160, md: 192 },
                p: "20px",
                mr: "27px",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "400",
                  fontSize: { xs: "20px", md: "26px" },
                  lineHeight: { xs: "24px", md: "30px" },
                  color: "#EBEBEB",
                  mb: "21px",
                }}
              >
                Total WAX Balance:
              </Typography>
              <Typography
                sx={{
                  fontWeight: "500",
                  fontSize: { xs: "20px", md: "26px" },
                  lineHeight: { xs: "24px", md: "30px" },
                  color: "#EBEBEB",
                }}
              >
                {balance}
              </Typography>
            </Box>
            <Box
              sx={{
                background: "#391E24",
                boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.15)",
                borderRadius: "25px",
                maxWidth: { xs: 160, md: 192 },
                p: "20px",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "400",
                  fontSize: { xs: "20px", md: "26px" },
                  lineHeight: { xs: "24px", md: "30px" },
                  color: "#EBEBEB",
                  mb: "21px",
                }}
              >
                Total USD Balance:
              </Typography>
              <Typography
                sx={{
                  fontWeight: "500",
                  fontSize: { xs: "20px", md: "26px" },
                  lineHeight: { xs: "24px", md: "30px" },
                  color: "#EBEBEB",
                }}
              >
                {usd}
              </Typography>
              <Typography
                sx={{
                  fontWeight: "100",
                  fontSize: { xs: "12px", md: "16px" },
                  lineHeight: { xs: "24px", md: "30px" },
                  color: "#EBEBEB",
                }}
              >
                {`(@ $${rate}/WAX)`}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: { xs: '24px', md: "50px" },
          }}
        >
          <Typography
            sx={{
              fontWeight: "700",
              fontSize: { xs: "36px", md: "48px" },
              lineHeight: { xs: "44px", md: "56px" },
              color: "#EBEBEB",
            }}
          >
            Dashboard
          </Typography>
          <Link
            href={'https://wax.bloks.io/account/' + user}
            target="_blank"
            sx={{
              fontWeight: "400",
              fontSize: { xs: "20px", md: "24px" },
              lineHeight: { xs: "24px", md: "28px" },
              textAlign: "center",
              color: "#EBEBEB",
              textDecoration: "none",
            }}
          >
            View on wax.bloks.io
          </Link>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            mb: "20px",
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", lg: "calc(65% - 15px)" },
              mb: { xs: "20px", lg: 0 },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                mb: "20px",
              }}
            >
              <Box
                sx={{
                  width: { xs: "100%", sm: "calc(50% - 15px)" },
                  background: "#4A1E2A",
                  boxShadow: "10px 10px 5px rgba(0, 0, 0, 0.15)",
                  borderRadius: "30px",
                  p: { xs: '20px', md: "38px 30px" },
                  mb: { xs: "20px", sm: 0 },
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "400",
                    fontSize: { xs: "20px", md: "28px" },
                    lineHeight: { xs: "30px", md: "38px" },
                    color: "#EBEBEB",
                    mb: { xs: '24px', md: "50px" },
                    textAlign: "center",
                  }}
                >
                  Free Stakes Left:
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "500",
                    fontSize: { xs: "20px", md: "40px" },
                    lineHeight: { xs: "44px", md: "60px" },
                    color: "#EBEBEB",
                    textAlign: "center",
                  }}
                >
                  {freeStakes}
                </Typography>
              </Box>
              <Box sx={{ width: { xs: "100%", sm: "calc(50% - 15px)" } }}>
                <Box
                  sx={{
                    background: "#391E24",
                    boxShadow: "10px 10px 5px rgba(0, 0, 0, 0.15)",
                    borderRadius: "30px",
                    p: "24px 20px",
                    mb: "20px",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "600",
                      fontSize: { xs: "20px", md: "28px" },
                      lineHeight: { xs: "30px", md: "38px" },
                      textAlign: "center",
                      color: "#EBEBEB",
                    }}
                  >
                    Time until next free CPU
                    <br />
                    {cooldown}
                  </Typography>
                </Box>
                {renderFreeButton  ? (
                  <Box
                    sx={{
                      background: "#391E24",
                      boxShadow: "10px 10px 5px rgba(0, 0, 0, 0.15)",
                      borderRadius: "30px",
                      p: "24px 20px",
                      opacity: '50%'
                    }}
                  >
                        <Typography
                        sx={{
                          fontWeight: "600",
                          fontSize: { xs: "20px", md: "28px" },
                          lineHeight: { xs: "30px", md: "38px" },
                          textAlign: "center",
                          color: "#EBEBEB",
                        }}
                        
                      >
                        Request Free
                        <br />
                        CPU
                      </Typography>
                     </Box>
                  ) : (
                    <Box
                    sx={{
                      background: "#391E24",
                      boxShadow: "10px 10px 5px rgba(0, 0, 0, 0.15)",
                      borderRadius: "30px",
                      p: "24px 20px",
                    }}
                    >
                        <Typography
                        sx={{
                          fontWeight: "600",
                          fontSize: { xs: "20px", md: "28px" },
                          lineHeight: { xs: "30px", md: "38px" },
                          textAlign: "center",
                          color: "#EBEBEB",
                        }}
                        onClick={transactionFreeCPU}
                      >
                        Request Free
                        <br />
                        CPU
                      </Typography>
                     </Box>
                  )}
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  width: { xs: "100%", sm: "calc(50% - 15px)" },
                  background: "#4A1E2A",
                  boxShadow: "10px 10px 5px rgba(0, 0, 0, 0.15)",
                  borderRadius: "30px",
                  p: { xs: '20px', md: "38px 30px" },
                  mb: { xs: "20px", sm: 0 },
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "400",
                    fontSize: { xs: "20px", md: "28px" },
                    lineHeight: { xs: "30px", md: "38px" },
                    color: "#EBEBEB",
                    mb: { xs: '24px', md: "50px" },
                    textAlign: "center",
                  }}
                >
                  Requested CPU for self total:
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "500",
                    fontSize: { xs: "20px", md: "30px" },
                    lineHeight: { xs: "44px", md: "60px" },
                    color: "#EBEBEB",
                    textAlign: "center",
                  }}
                >
                  {`${stakedWAX.toFixed(3)} WAX`}
                </Typography>
              </Box>
              <Box sx={{ width: { xs: "100%", sm: "calc(50% - 15px)" } }}>
                <Box
                  sx={{
                    background: "#391E24",
                    boxShadow: "10px 10px 5px rgba(0, 0, 0, 0.15)",
                    borderRadius: "30px",
                    p: "24px 20px",
                    mb: "20px",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "600",
                      fontSize: { xs: "20px", md: "28px" },
                      lineHeight: { xs: "30px", md: "38px" },
                      textAlign: "center",
                      color: "#EBEBEB",
                    }}
                  >
                    Time until next Vote
                    <br />
                    {voteCooldown}
                  </Typography>
                </Box>
                {!claimVote ? (
                  <Box
                    sx={{
                      background: "#391E24",
                      boxShadow: "10px 10px 5px rgba(0, 0, 0, 0.15)",
                      borderRadius: "30px",
                      p: "24px 20px",
                      opacity: '50%'
                    }}
                  >
                        <Typography
                        sx={{
                          fontWeight: "600",
                          fontSize: { xs: "20px", md: "28px" },
                          lineHeight: { xs: "30px", md: "38px" },
                          textAlign: "center",
                          color: "#EBEBEB",
                        }}
                        
                      >
                        Claim Vote
                      </Typography>
                     </Box>
                  ) : (
                    <Box
                    sx={{
                      background: "#391E24",
                      boxShadow: "10px 10px 5px rgba(0, 0, 0, 0.15)",
                      borderRadius: "30px",
                      p: "24px 20px",
                    }}
                    >
                        <Typography
                        sx={{
                          fontWeight: "600",
                          fontSize: { xs: "20px", md: "28px" },
                          lineHeight: { xs: "30px", md: "38px" },
                          textAlign: "center",
                          color: "#EBEBEB",
                        }}
                        onClick={transactionClaimVote}
                      >
                        Claim Vote
                       
                      </Typography>
                     </Box>
                  )}
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: { xs: "100%", lg: "calc(35% - 15px)" },
              background: "#831F3F",
              boxShadow: "10px 10px 5px rgba(0, 0, 0, 0.15)",
              borderRadius: "30px",
              p: "32px",
            }}
          >
            <Typography
              sx={{
                fontWeight: "400",
                fontSize: { xs: "24px", md: "30px" },
                textAlign: "center",
                lineHeight: { xs: "36px", md: "42px" },
                color: "#EBEBEB",
                mb: "5px",
              }}
            >
              Resources
            </Typography>
            <Typography
              sx={{
                fontWeight: "400",
                fontSize: { xs: "20px", md: "25px" },
                textAlign: "center",
                lineHeight: { xs: "36px", md: "42px" },
                color: "#EBEBEB",
                mb: "5px",
              }}
            >
              RAM:
            </Typography>
            <ProgressBar 
              completed={usedRAM/totalRAM * 100 + 4} 
              customLabel={`${Math.floor(usedRAM/totalRAM * 100)}%`}
              bgColor='#00B5AD'
              baseBgColor='#391E24'
              labelAlignment='outside'
              maxCompleted={104}
              />
            <Typography
              sx={{
                fontWeight: "500",
                textAlign: "center",
                fontSize: { xs: "16px", md: "14px" },
                lineHeight: { xs: "44px", md: "60px" },
                color: "#EBEBEB",
                mb: "10px",
              }}
            >
              {`RAM used - ${formatByte(usedRAM)} / ${formatByte(totalRAM)}`}
            </Typography>
            <Typography
              sx={{
                fontWeight: "400",
                fontSize: { xs: "24px", md: "30px" },
                textAlign: "center",
                lineHeight: { xs: "36px", md: "42px" },
                color: "#EBEBEB",
                mb: "5px",
              }}
            >
              CPU:
            </Typography>
            <ProgressBar 
              completed={usedCPU/totalCPU * 100 + 4} 
              customLabel={`${Math.floor(usedCPU/totalCPU * 100)}%`}
              bgColor='#2185D0'
              baseBgColor='#391E24'
              labelAlignment='outside'
              maxCompleted={104}
              />
            <Typography
              sx={{
                fontWeight: "500",
                textAlign: "center",
                fontSize: { xs: "16px", md: "14px" },
                lineHeight: { xs: "44px", md: "60px" },
                color: "#EBEBEB",
                mb: "10px",
              }}
            >
              {`CPU used - ${formatSecs(usedCPU)} / ${formatSecs(totalCPU)}`}
            </Typography>
            <Typography
              sx={{
                fontWeight: "400",
                fontSize: { xs: "24px", md: "30px" },
                textAlign: "center",
                lineHeight: { xs: "36px", md: "42px" },
                color: "#EBEBEB",
                mb: "5px",
              }}
            >
              NET:
            </Typography>
            <ProgressBar 
              completed={usedNET/totalNET * 100 + 4} 
              customLabel={`${Math.floor(usedNET/totalNET * 100)}%`}
              bgColor='#21BA45'
              baseBgColor='#391E24'
              labelAlignment='outside'
              maxCompleted={104}
              />
            <Typography
              sx={{
                fontWeight: "500",
                textAlign: "center",
                fontSize: { xs: "16px", md: "14px" },
                lineHeight: { xs: "44px", md: "60px" },
                color: "#EBEBEB",
                mb: "10px",
              }}
            >
              {`CPU used - ${formatSecs(usedNET)} / ${formatSecs(totalNET)}`}
            </Typography>
          </Box>
        </Box>
        {/* <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
          }}
        >
          <Button
            onClick={() => history.push("/cpu4sale")}
            sx={{
              width: { xs: "100%", sm: "calc(50% - 10px)" },
              p: { xs: "20px 20px", md: "20px 20px", lg: "37px 80px" },
              alignItems: "center",
              justifyContent: "space-between",
              background: "#5C2736",
              boxShadow: "10px 10px 5px rgba(0, 0, 0, 0.15)",
              borderRadius: "30px",
              cursor: "pointer",
              textTransform: "capitalize",
              mb: { xs: "20px", sm: 0 },
            }}
          >
            <Typography
              sx={{
                fontWeight: "600",
                fontSize: { xs: "24px", lg: "32px" },
                textAlign: "center",
                color: "#EBEBEB",
              }}
            >
              Go to Cpu4Sale
            </Typography>
            <Typography
              sx={{
                fontWeight: "800",
                fontSize: { xs: "36px", lg: "52px" },
                textAlign: "center",
                color: "#F0F0F0",
              }}
            >
              &gt;
            </Typography>
          </Button>
          <Button
            onClick={() => history.push("/limitlesswax")}
            sx={{
              width: { xs: "100%", sm: "calc(50% - 10px)" },
              p: { xs: "20px 20px", md: "20px 20px", lg: "37px 80px" },
              alignItems: "center",
              justifyContent: "space-between",
              background: "#5C2736",
              boxShadow: "10px 10px 5px rgba(0, 0, 0, 0.15)",
              borderRadius: "30px",
              cursor: "pointer",
              textTransform: "capitalize",
            }}
          >
            <Typography
              sx={{
                fontWeight: "600",
                fontSize: { xs: "24px", lg: "32px" },
                textAlign: "center",
                color: "#EBEBEB",
              }}
            >
              Go to LimitlessWAX
            </Typography>
            <Typography
              sx={{
                fontWeight: "800",
                fontSize: { xs: "36px", lg: "52px" },
                textAlign: "center",
                color: "#F0F0F0",
              }}
            >
              &gt;
            </Typography>
          </Button>
        </Box> */}
      </Container>
      
  ): (
    <Container
        sx={{
          pt: { xs: "30px", md: "50px" },
          pb: { xs: "30px", md: "100px" },
          alignContent : 'center'
        }}
      >
        <CircularProgress sx={{
          color: '#ffffff',
          size: '10rem'
        }}/>
    </Container>
  )}
  </>
    )
  }  
;


const intervalToLevels = (interval: any, levels: { scale: any; units: any; }) => {
  const cbFun = (d: any, c: any) => {
    let bb = d[1] % c[0],
      aa = (d[1] - bb) / c[0];
    aa = aa > 0 ? aa + c[1] : '';

    return [d[0] + aa, bb];
  };

  let rslt = levels.scale.map((d: any, i: any, a: any[]) => a.slice(i).reduce((d: number, c: number) => d * c))
    .map((d: any, i: any) => ([d, levels.units[i]]))
    .reduce(cbFun, ['', interval]);
  return rslt[0];
};

const TimeLevels = {
  scale: [24, 60, 60, 1],
  units: ['d ', 'h ', 'm ', 's ']
};


const secondsToString = (interval: any) => intervalToLevels(interval, TimeLevels);


const formatSecs = (num: number) => {
  var formated: string
  var number: number
  if( num < 1000 ){
    formated = num.toString() + ' μs'
    return formated
  }
  if (num > 1000 && num < 1000000){
      number = Math.round((num / 1000) * 100) / 100
      formated = number.toString() + ' ms'
      return formated
  }
  if (num > 1000000 && num < 60000000){
      number = Math.round((num / 1000000) * 100) / 100
      formated = number.toString() + ' s'
      return formated
  }
  if ( num > 60000000){
    number = Math.round((num / 60000000) * 100) / 100
    formated = number.toString() + ' min'
    return formated
  }
}

const formatByte = (num: number) => {
  var formated: string
  var number : number
  num = num / 1.024
  if(num < 1000){
    number = Math.round(num * 100) / 100
    formated = number.toString() + ' B'
  }
  if(num > 1000 && num < 1000000){
    number = Math.round((num / 1000) * 100) / 100
      formated = number.toString() + ' KB'
      return formated
  }
  if(num > 1000000){
    number = Math.round((num / 1000000) * 100) / 100
      formated = number.toString() + ' MB'
      return formated
  }
}

export default Account;

