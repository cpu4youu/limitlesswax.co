import { useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Box,
  Container,
  Button,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import RectAngleBg from "../assets/images/Rectangle2.png";
import SideImage1 from "../assets/images/side1.svg";

const useStyles = makeStyles((theme) => ({
  actionButton: {
    background: "#882140",
    border: "1px solid #FFFFFF!important",
    fontWeight: "500",
    fontSize: 24,
    color: "#FFFFFF",
    width: "240px",
    height: "60px",
  },
  cardTitle: {
    fontWeight: "700",
    fontSize: "24px",
    lineHeight: "35px",
    textAlign: "center",
    color: "#FAFAFA",
    marginBottom: "5px",
    "@media (min-width: 900px)": {
      fontSize: "30px",
    },
  },
  cardText: {
    fontWeight: "300",
    fontSize: "15px",
    lineHeight: "18px",
    textAlign: "center",
    color: "#FAFAFA",
  },
}));

const Landing = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);

  const handleExpandedChange = (index: number) => {
    setExpanded([
      ...expanded.slice(0, index),
      !expanded[index],
      ...expanded.slice(index + 1, expanded.length),
    ]);
  };

  return (
    <Container
      sx={{
        pt: { xs: "30px", md: "50px" },
        pb: { xs: "30px", md: "100px" },
      }}
    >
      <Box
        sx={{
          maxWidth: 739,
          mx: "auto",
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "36px", md: "48px" },
            lineHeight: { xs: "44px", md: "56px" },
            textAlign: "center",
            color: "#FFFFFF",
            mb: "14px",
          }}
        >
          A new cpu renting system on the WAX blockchain
        </Typography>
        <Typography
          sx={{
            fontWeight: "300",
            fontSize: 24,
            lineHeight: "28px",
            textAlign: "center",
            color: "#FFFFFF",
            mb: "40px",
          }}
        >
          Created with help from the WAX development team and community members
          Vaaaan & deraXyna.
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyContent: "center",
            mb: { xs: "30px", md: "100px" },
          }}
        >
          <Button
            variant="outlined"
            className={classes.actionButton}
            sx={{
              mr: { sm: "60px" },
              mb: { xs: "20px", sm: 0 },
            }}
          >
            CPU4SALE
          </Button>
          <Button variant="outlined" className={classes.actionButton}>
            LIMITLESSWAX
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          position: "relative",
          backgroundImage: `url(${RectAngleBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: { xs: "24px", md: "50px" },
          zIndex: "1",
          p: { xs: "30px 30px", md: "80px 75px" },
          mb: "20px",
        }}
      >
        <Box
          component="img"
          src={SideImage1}
          sx={{
            position: "absolute",
            zIndex: "-1",
            top: "50%",
            opacity: { xs: "0.6", md: "1" },
            transform: "translateY(-50%)",
            right: { xs: "-100px", md: "-167px" },
            width: { xs: "600px", md: "942px" },
          }}
        />
        <Box
          sx={{
            maxWidth: 493,
          }}
        >
          <Typography
            sx={{
              fontWeight: "600",
              fontSize: 36,
              lineHeight: "42px",
              color: "#FFFFFF",
              mb: "20px",
            }}
          >
            Allowing anyone to rent cpu or deposit wax and earn from renting to
            others.
          </Typography>
          <Typography
            sx={{
              fontWeight: "300",
              fontSize: 24,
              lineHeight: "28px",
              color: "#FFFFFF",
              mb: "20px",
            }}
          >
            The price is dynamically set between a 1% and 10% fee and it changes
            everytime someone
            <span style={{ wordBreak: "break-all" }}>
              {" "}
              deposits/withdraws/rents/returns{" "}
            </span>{" "}
            wax.
          </Typography>
          <Typography
            sx={{
              fontWeight: "300",
              fontSize: 24,
              lineHeight: "28px",
              color: "#FFFFFF",
            }}
          >
            Users are limited to how much they can rent in a single transaction
            but can make multiple requests as long as there is wax available.
            There is also a free system implemented but it has limits too.
          </Typography>
        </Box>
      </Box>
      <Typography
        sx={{
          fontWeight: "200",
          fontSize: 18,
          wordBreak: "break-all",
          lineHeight: "21px",
          color: "#FFFFFF",
          ml: { sm: "40px", md: "70px" },
          mb: { xs: "30px", md: "60px" },
        }}
      >
        Public code: https://github.com/cpu4youu/cpu4youu.github.io
      </Typography>
      <Typography
        component="div"
        sx={{
          maxWidth: 867,
          fontWeight: "700",
          fontSize: { xs: "28px", md: "36px" },
          lineHeight: { xs: "32px", md: "42px" },
          textAlign: "center",
          color: "#FFFFFF",
          mx: "auto",
          mb: "16px",
        }}
      >
        Users can interact with the smart contract in a number of ways
      </Typography>
      <Typography
        sx={{
          fontWeight: "300",
          fontSize: { xs: "20px", md: "24px" },
          lineHeight: { xs: "20px", md: "24px" },
          textAlign: "center",
          color: "#FFFFFF",
          mb: "50px",
        }}
      >
        The system will be open for 1 week before allowing users to deposit
        their own wax to earn. If users find bugs there is a bug bounty program
        on discord.
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          mb: "10px",
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "calc(50% - 5px)" },
            background: "#331E22",
            border: "1px solid #FFFFFF",
            borderRadius: "25px",
            p: "25px 33px",
            mb: { xs: "10px", md: 0 },
          }}
        >
          <Typography className={classes.cardTitle}>
            Request CPU for Self
          </Typography>
          <Typography className={classes.cardText}>
            The system dynamically creates a price for the staked wax given the
            current supply, total loaned out, number of days, and amount user
            requests. Then that wax is sent to a minion account and staked to
            the user for the given time.
          </Typography>
        </Box>
        <Box
          sx={{
            width: { xs: "100%", md: "calc(50% - 5px)" },
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", sm: "calc(50% - 5px)" },
              background: "#331E22",
              border: "1px solid #FFFFFF",
              borderRadius: "25px",
              p: "25px 6px",
              mb: { xs: "10px", sm: 0 },
            }}
          >
            <Typography className={classes.cardTitle}>
              Request Free CPU
            </Typography>
            <Typography className={classes.cardText}>
              As long as this account has wax it will send in a specified amount
              to the main contract requesting cpu as if it was a regular user.
            </Typography>
          </Box>
          <Box
            sx={{
              width: { xs: "100%", sm: "calc(50% - 5px)" },
              background: "#331E22",
              border: "1px solid #FFFFFF",
              borderRadius: "25px",
              p: "25px 6px",
            }}
          >
            <Typography className={classes.cardTitle}>
              Deposit to Earn
            </Typography>
            <Typography className={classes.cardText}>
              Users can also deposit wax to earn 70% of the total fees
              collected.
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          mb: { xs: "30px", md: "80px" },
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "calc(50% - 5px)" },
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            mb: { xs: "10px", md: 0 },
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", sm: "calc(50% - 5px)" },
              background: "#4A1E2A",
              border: "1px solid #FFFFFF",
              borderRadius: "25px",
              p: "50px 14px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              mb: { xs: "10px", sm: 0 },
            }}
          >
            <Typography className={classes.cardTitle}>
              Request CPU for Others
            </Typography>
            <Typography className={classes.cardText}>
              Similar to requesting to yourself, this does the first few steps
              but then directly stakes to the user specified. This can be sent
              from anyone for anyone else.
            </Typography>
          </Box>
          <Box
            sx={{
              width: { xs: "100%", sm: "calc(50% - 5px)" },
              background: "#4A1E2A",
              border: "1px solid #FFFFFF",
              borderRadius: "25px",
              p: "50px 14px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography className={classes.cardTitle}>
              Update Collected Fees
            </Typography>
            <Typography className={classes.cardText}>
              This method is not required but will immediately update the table
              entry with how much wax the user has. This function will update
              the fees in the contract table and show you how much you could
              withdraw in total.
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: { xs: "100%", md: "calc(50% - 5px)" },
            background: "#4A1E2A",
            border: "1px solid #FFFFFF",
            borderRadius: "25px",
            p: "50px 33px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography className={classes.cardTitle}>
            Withdraw Deposited Wax
          </Typography>
          <Typography className={classes.cardText}>
            At any time a user can request to withdraw deposited wax. A user can
            make as many withdraw requests as they want up to the total wax they
            have deposited. If there is not enough liquid wax, as more gets
            unstaked it will be sent in order to users in line to withdraw.
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          background: "rgba(51, 30, 34, 0.8)",
          boxShadow: "10px 10px 15px rgba(0, 0, 0, 0.15)",
          borderRadius: { xs: "24px", md: "50px" },
          p: { xs: "30px 30px", md: "56px 50px" },
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          mb: { xs: "30px", md: "100px" },
        }}
      >
        <Typography
          sx={{
            fontWeight: "700",
            fontSize: { xs: "28px", md: "36px" },
            lineHeight: { xs: "36px", md: "42px" },
            textAlign: "center",
            color: "#EFEFEF",
            mr: { xs: 0, sm: "20px" },
            mb: { xs: "10px", sm: 0 },
          }}
        >
          Stay up to date with Limitless WAX
        </Typography>
        <Button
          variant="outlined"
          sx={{
            background: "#882140",
            border: "1px solid #FFFFFF!important",
            fontWeight: "400",
            fontSize: "24px",
            color: "#FDFDFD",
            height: "66px",
            textTransform: "capitalize",
            minWidth: 220,
          }}
        >
          Join Community
        </Button>
      </Box>
      <Typography
        sx={{
          fontWeight: "700",
          fontSize: "36px",
          lineHeight: "42px",
          textAlign: "center",
          color: "#FFFFFF",
          mb: "50px",
        }}
      >
        Frequently Asked Questions
      </Typography>
      <Box>
        {Array.from(Array(5).keys()).map((key) => (
          <Box
            key={key}
            sx={
              {
                background: "rgba(51, 30, 34, 0.8)",
                borderRadius: { xs: "24px", md: "50px" },
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: "2px 34px",
                mb: key !== 4 && "10px",
              } as any
            }
          >
            <Accordion
              expanded={expanded[key]}
              onChange={() => handleExpandedChange(key)}
              sx={{
                m: "0!important",
                width: "100%",
                backgroundColor: "transparent",
                boxShadow: "none",
              }}
            >
              <AccordionSummary
                sx={{
                  "& > div": {
                    justifyContent: "space-between",
                    alignItems: "center",
                    my: "12px!important",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "400",
                    fontSize: { xs: "20px", md: "36px" },
                    lineHeight: { xs: "28px", md: "42px" },
                    color: "#F0F0F0",
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Typography>
                {expanded[key] ? (
                  <RemoveIcon
                    sx={{
                      fontSize: { xs: "20px", md: "36px" },
                      color: "#F0F0F0",
                    }}
                  />
                ) : (
                  <AddIcon
                    sx={{
                      fontSize: { xs: "20px", md: "36px" },
                      color: "#F0F0F0",
                    }}
                  />
                )}
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  sx={{
                    fontWeight: "400",
                    fontSize: { xs: "14px", md: "18px" },
                    lineHeight: "24px",
                    color: "#F0F0F0",
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default Landing;
