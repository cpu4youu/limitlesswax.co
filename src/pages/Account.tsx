import { useHistory } from "react-router-dom";
import { Box, Container, Button, Typography, Link } from "@mui/material";

const Account = () => {
  const history = useHistory();
  return (
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
            ki.fg.wam
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
              6.12354672
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
              $1.9321245
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
          href="#"
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
                }}
              >
                Requested CPU for self total:
              </Typography>
              <Typography
                sx={{
                  fontWeight: "500",
                  fontSize: { xs: "28px", md: "40px" },
                  lineHeight: { xs: "44px", md: "60px" },
                  color: "#EBEBEB",
                }}
              >
                6.12354
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
                  Update Collected
                  <br />
                  Fees
                </Typography>
              </Box>
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
                >
                  Request Free
                  <br />
                  CPU
                </Typography>
              </Box>
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
                }}
              >
                Requested CPU for self total:
              </Typography>
              <Typography
                sx={{
                  fontWeight: "500",
                  fontSize: { xs: "28px", md: "40px" },
                  lineHeight: { xs: "44px", md: "60px" },
                  color: "#EBEBEB",
                }}
              >
                6.12354
              </Typography>
            </Box>
            <Box
              sx={{
                width: { xs: "100%", sm: "calc(50% - 15px)" },
                background: "#4A1E2A",
                boxShadow: "10px 10px 5px rgba(0, 0, 0, 0.15)",
                borderRadius: "30px",
                p: { xs: '20px', md: "38px 30px" },
              }}
            >
              <Typography
                sx={{
                  fontWeight: "400",
                  fontSize: { xs: "20px", md: "28px" },
                  lineHeight: { xs: "30px", md: "38px" },
                  color: "#EBEBEB",
                  mb: { xs: '24px', md: "50px" },
                }}
              >
                Deposited WAX to earn:
              </Typography>
              <Typography
                sx={{
                  fontWeight: "500",
                  fontSize: { xs: "28px", md: "40px" },
                  lineHeight: { xs: "44px", md: "60px" },
                  color: "#EBEBEB",
                }}
              >
                6.12354
              </Typography>
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
            Total Free CPU
          </Typography>
          <Typography
            sx={{
              fontWeight: "500",
              textAlign: "center",
              fontSize: { xs: "26px", md: "32px" },
              lineHeight: { xs: "44px", md: "60px" },
              color: "#EBEBEB",
              mb: "10px",
            }}
          >
            6.12354
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
            1 Day Earning
          </Typography>
          <Typography
            sx={{
              fontWeight: "500",
              textAlign: "center",
              fontSize: { xs: "26px", md: "32px" },
              lineHeight: { xs: "44px", md: "60px" },
              color: "#EBEBEB",
              mb: "10px",
            }}
          >
            6.12354
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
            15 Days Earning
          </Typography>
          <Typography
            sx={{
              fontWeight: "500",
              textAlign: "center",
              fontSize: { xs: "26px", md: "32px" },
              lineHeight: { xs: "44px", md: "60px" },
              color: "#EBEBEB",
              mb: "10px",
            }}
          >
            6.12354
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
            30 Days Earning
          </Typography>
          <Typography
            sx={{
              fontWeight: "500",
              textAlign: "center",
              fontSize: { xs: "26px", md: "32px" },
              lineHeight: { xs: "44px", md: "60px" },
              color: "#EBEBEB",
              mb: "10px",
            }}
          >
            6.12354
          </Typography>
        </Box>
      </Box>
      <Box
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
      </Box>
    </Container>
  );
};

export default Account;
