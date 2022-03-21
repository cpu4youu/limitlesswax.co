import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Box, Container, Typography, Link } from "@mui/material";
import Logo from "../assets/images/logo.png";

const useStyles = makeStyles((theme) => ({
  menuList: {
    display: "block",
    fontWeight: "300",
    fontSize: "18px",
    lineHeight: "21px",
    color: "#E9E9E9",
    textTransform: "capitalize",
    marginBottom: "20px",
  },
}));

export default function Footer() {
  const history = useHistory();
  const classes = useStyles();
  return (
    <Box
      sx={{
        background: "#331E22",
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "flex-start", md: "center" },
          justifyContent: "space-between",
          pt: { xs: "30px", md: "60px" },
          pb: { xs: "30px", md: "65px" },
        }}
      >
        <Box
          sx={{
            mb: { xs: "20px", md: 0 },
          }}
        >
          <Box
            component="img"
            src={Logo}
            onClick={() => history.push("/")}
            sx={{
              cursor: "pointer",
              width: 61,
            }}
          />
          <Typography
            sx={{
              fontWeight: "300",
              fontSize: "14px",
              lineHeight: "16px",
              color: "#E7E7E7",
              my: "15px",
            }}
          >
            If you need help or have any question
            <br />
            please go through our discord.
          </Typography>
          <Typography
            sx={{
              fontWeight: "300",
              fontSize: "14px",
              lineHeight: "16px",
              color: "#E7E7E7",
            }}
          >
            Limitlesswax &reg; Copyright &copy; {new Date().getFullYear()}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
          }}
        >
          <Box
            sx={{
              mr: { xs: "30px", sm: "80px", md: "100px" },
            }}
          >
            <Link href="/landing" underline="none" className={classes.menuList}>
              Home
            </Link>
            <Link href="/about-us" underline="none" className={classes.menuList}>
              About Us
            </Link>
            <Link href="/account" underline="none" className={classes.menuList}>
              Account
            </Link>
          </Box>
          <Box
            sx={{
              mr: { xs: "30px", sm: "80px", md: "100px" },
            }}
          >
            <Link href="/cpu4sale" underline="none" className={classes.menuList}>
              Cpu4sale
            </Link>
            <Link href="/limitlesswax" underline="none" className={classes.menuList}>
              LimitlessWAX
            </Link>
            <Link href="/privacy" underline="none" className={classes.menuList}>
              Privacy
            </Link>
          </Box>
          <Box
            sx={{
              mr: { xs: "30px", sm: "80px", md: "100px" },
            }}
          >
            <Link href="https://github.com/cpu4youu/limitlesswax.co" target="_blank" underline="none" className={classes.menuList}>
              Github
            </Link>
            <Link href="https://discord.gg/UJzBuRa9sY" target="_blank" underline="none" className={classes.menuList}>
              Discord
            </Link>
            <Link href="/terms" underline="none" className={classes.menuList}>
              Terms
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
