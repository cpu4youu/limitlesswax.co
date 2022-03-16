import { useState } from "react";
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

const Cpu4sale = () => {
  const classes = useStyles();
  const [tabItem, setTabItem] = useState<string>("tab1");
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
            517892.24469852
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
            517892.24469852
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
                  11.349123158 WAX
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
                >
                  Request self stake
                </Button>
              </Box>
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
                  ROI
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
                  Daily
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
                  11.349 WAX
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
                  Weekly
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
                  11.349 WAX
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
                  Monthly
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
                  11.349 WAX
                </Typography>
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
                11.349123158 WAX
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
                    11.3491 WAX
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
                    11.3491 WAX
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
                  11.3491 WAX
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
              >
                Withdraw
              </Button>
            </Box>
          ) : null}
        </Box>
      </Box>
    </Container>
  );
};

export default Cpu4sale;
