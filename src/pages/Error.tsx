import { Box, Container, Button, Typography } from "@mui/material";
import Side2 from "../assets/images/side2_1.png";

//@ts-ignore
const Error = ({ ual }) => {
  const openLoginModal = () => {
    if (!ual.activeUser) {
      ual.showModal();
    }
  };
  return (
    <Container
      sx={{
        pt: "30px",
        pb: "100px",
      }}
    >
      <Box
        component="img"
        src={Side2}
        sx={{
          display: "block",
          mx: "auto",
          mb: "42px",
          width: { xs: "100%", sm: "557px" },
        }}
      />
      <Typography
        sx={{
          maxWidth: 739,
          fontWeight: "700",
          fontSize: { xs: "32px", md: "48px" },
          lineHeight: { xs: "40px", md: "56px" },
          textAlign: "center",
          color: "#FFFFFF",
          mx: "auto",
          mb: "50px",
        }}
      >
        Please log in to to see this feature in LimitlessWAX.
      </Typography>
      <Button
        variant="outlined"
        sx={{
          display: "flex",
          width: "120px",
          height: "40px",
          borderRadius: "5px",
          fontWeight: "600",
          fontSize: 20,
          color: "#fff",
          textTransform: "capitalize",
          mx: "auto",
          borderColor: "#fff",
          "&:hover": {
            borderColor: "#fff",
          },
        }}
        onClick={openLoginModal}
      >
        Login
      </Button>
    </Container>
  );
};

export default Error;
