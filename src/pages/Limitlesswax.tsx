import { useState } from "react";
import { Box, Container, Button, Typography } from "@mui/material";
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
}));

const Limitlesswax = () => {
  const classes = useStyles();
  const [addActionOpen, setAddActionOpen] = useState<boolean>(false);
  const [actionData, setActionData] = useState<object[]>([
    { action: "", data: "" },
  ]);

  const addActionData = () => {
    setActionData((actionData) => [...actionData, { action: "", data: "" }]);
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
                <Button
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
                </Button>
              </Box>
            </Box>
            <Box
              sx={{
                width: { xs: "100%", md: "calc(50% - 25px)" },
                mb: "20px",
              }}
            >
              <Typography className={classes.label}>
                Name this action
              </Typography>
              <input
                type="text"
                className={classes.textInput}
                style={{ width: "100%" }}
              />
            </Box>
            <Box
              sx={{
                width: { xs: "100%", md: "calc(50% - 25px)" },
                mb: "20px",
              }}
            >
              <Typography className={classes.label}>
                Smart contract address
              </Typography>
              <input
                type="text"
                className={classes.textInput}
                style={{ width: "100%" }}
              />
            </Box>
            {actionData.map((data, key) => (
              <Box
                key={key}
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  mb: "20px",
                }}
              >
                <Box
                  sx={{
                    width: { xs: "100%", md: "calc(50% - 25px)" },
                    mb: { xs: "20px", md: 0 },
                  }}
                >
                  <Typography className={classes.label}>
                    Action #{key + 1}
                  </Typography>
                  <input
                    type="text"
                    className={classes.textInput}
                    style={{ width: "100%" }}
                  />
                </Box>
                <Box
                  sx={{
                    width: { xs: "100%", md: "calc(50% - 25px)" },
                  }}
                >
                  <Typography className={classes.label}>
                    Data #{key + 1}
                  </Typography>
                  <input
                    type="text"
                    className={classes.textInput}
                    style={{ width: "100%" }}
                  />
                </Box>
              </Box>
            ))}
            <Button
              variant="outlined"
              onClick={addActionData}
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
                  Name this action
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
                    style={{ width: "84px" }}
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
                </Box>
              </Box>
            </Box>
            <Box>
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
                Submit
              </Button>
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
                }}
              >
                Reset
              </Button>
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
