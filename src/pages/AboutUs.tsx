import { Fragment } from "react";
import { Box, Container, Button, Typography } from "@mui/material";
import Slider from "react-slick";
import RectAngleBg from "../assets/images/Rectangle2.png";
import SliderImage from "../assets/images/slider-image.png";
import izay from "../assets/images/izay.png"
import deraxyna from "../assets/images/deraxyna.png"
import kuro from "../assets/images/kuro.png"
import degen from "../assets/images/degen.png";
import vaaan from "../assets/images/vaaan.png"
import crypto from "../assets/images/cryptolions.png"
import kyle from "../assets/images/kyle.png"

const userLists = [
  {
    image: izay,
    name: "Izay",
    description:
      "Founder / Smart Contract Dev",
  },
  {
    image: deraxyna,
    name: "deraXyna",
    description: "Backend / Web Dev",
  },
  { 
    image: kuro,
    name: 'kuro',
    description: 'Dev / Marketing',
  }

]



const userLists2 = [
  {
    image: degen,
    name: "Meliso",
    description: "Blockchain & Web developer",
  },
  {
    image: vaaan,
    name: "Vaaaan",
    description:
      "Original Backer, Avid Wax Blockchain Enthusiast",
  },
  {   
    image: crypto,
    name: "CryptoLions",
    description:
      "Smart Contract Auditor",
    
  },
  {
    image: kyle,
    name: "Kyle",
    description: 'Web Designer'
  }
];

const AboutUs = () => {
  const sliderSettings = {
    arrows: false,
    dots: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    cssEase: "linear",
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 0,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  const handleClick = () => {
    window.open("https://discord.gg/UJzBuRa9sY", "_blank")
  }

  return (
    <Fragment>
      <Container
        sx={{
          pt: { xs: "24px", md: "50px" },
          pb: { xs: "40px", md: "80px" },
        }}
      >
        <Box
          sx={{
            backgroundImage: `url(${RectAngleBg})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            borderRadius: { xs: "24px", md: "50px" },
            p: { xs: "30px 30px", md: "50px 72px" },
            mb: "50px",
          }}
        >
          <Typography
            sx={{
              fontWeight: "600",
              fontSize: { xs: "28px", md: "36px" },
              lineHeight: { xs: "36px", md: "42px" },
              textAlign: "center",
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
              fontSize: { xs: "20px", md: "24px" },
              lineHeight: { xs: "24px", md: "28px" },
              textAlign: "center",
              color: "#FFFFFF",
              mb: "20px",
            }}
          >
            The price is dynamically set between a 0.5% and 2% fee and it changes
            everytime someone
            <span style={{ wordBreak: "break-all" }}>
              {" "}
              deposits/withdraws/rents/returns{" "}
            </span>
            wax.
          </Typography>
          <Typography
            sx={{
              fontWeight: "300",
              fontSize: { xs: "20px", md: "24px" },
              lineHeight: { xs: "24px", md: "28px" },
              textAlign: "center",
              color: "#FFFFFF",
              mb: "20px",
            }}
          >
            Users are limited to how much they can rent in a single transaction
            but can make multiple requests as long as there is wax available.
            There is also a free system implemented but it has limits too.
          </Typography>
          <Typography
            sx={{
              fontWeight: "300",
              fontSize: { xs: "20px", md: "24px" },
              lineHeight: { xs: "24px", md: "28px" },
              textAlign: "center",
              color: "#FFFFFF",
              mb: "20px",
            }}
          >
            Users are limited to how much they can rent in a single transaction
            but can make multiple requests as long as there is wax available.
            There is also a free system implemented but it has limits too.
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            background: "rgba(57, 30, 36, 0.8)",
            boxShadow: "10px 10px 15px rgba(0, 0, 0, 0.15)",
            borderRadius: { xs: "24px", md: "50px" },
            p: { xs: "20px 24px", sm: "40px 42px", md: "56px 65px" },
            mb: "70px",
          }}
        >
          <Typography
            sx={{
              fontWeight: "700",
              fontSize: { xs: "24px", md: "36px" },
              lineHeight: { xs: "28px", md: "42px" },
              textAlign: "center",
              color: "#EFEFEF",
              mr: { sm: "20px" },
              mb: { xs: "20px", sm: "0" },
            }}
          >
            Stay up to date with Limitless WAX
          </Typography>
          <Button
            variant="contained"
            sx={{
              minWidth: 220,
              height: { xs: "45px", sm: "65px" },
              backgroundColor: "#882140!important",
              fontWeight: "400",
              fontSize: "24px",
              lineHeight: "28px",
              textAlign: "center",
              textTransform: "capitalize",
              color: "#FDFDFD",
            }}
            onClick={handleClick}
          >
            Join Community
          </Button>
        </Box>
        <Typography
            sx={{
              fontWeight: "700",
              fontSize: { xs: "30px", md: "50px" },
              lineHeight: { xs: "28px", md: "42px" },
              textAlign: "center",
              color: "#EFEFEF",
              mr: { sm: "20px" },
              mb: { xs: "20px", sm: "0" },
              p: '0px 0px 50px'
            }}
          >
            Team
          </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "center", sm: "flex-start" },
            justifyContent: "space-around",
          }}
        >
          
          {userLists.map((item, key) => (
            <Box
              key={key}
              sx={{
                maxWidth: "283px",
                mb: { xs: "20px", sm: "0" },
              }}
            >
              {item?.image ? (
                <Box
                  component="img"
                  src={item?.image}
                  sx={{
                    display: "block",
                    borderRadius: "50%",
                    width: { xs: "150px", md: "198px" },
                    aspectRatio: "1",
                    mx: "auto",
                    mb: "20px",
                  }}
                />
              ) : (
                <Box
                  sx={{
                    backgroundColor: "#8C243F",
                    borderRadius: "50%",
                    width: { xs: "150px", md: "198px" },
                    aspectRatio: "1",
                    mx: "auto",
                    mb: "20px",
                  }}
                ></Box>
              )}

              <Typography
                sx={{
                  fontWeight: "500",
                  fontSize: { xs: "36px", md: "48px" },
                  lineHeight: { xs: "42px", md: "56px" },
                  textAlign: "center",
                  color: "#F7F7F7",
                  mb: "20px",
                }}
              >
                {item.name}
              </Typography>
              <Typography
                sx={{
                  fontWeight: "400",
                  fontSize: { xs: "20px", md: "24px" },
                  lineHeight: "28px",
                  textAlign: "center",
                  color: "#EDEDED",
                }}
              >
                {item.description}
              </Typography>
            </Box>
          ))}
        </Box>
        <Typography
            sx={{
              fontWeight: "700",
              fontSize: { xs: "30px", md: "50px" },
              lineHeight: { xs: "28px", md: "42px" },
              textAlign: "center",
              color: "#EFEFEF",
              mr: { sm: "20px" },
              mb: { xs: "20px", sm: "0" },
              p: '50px 0px 50px'
            }}
          >
              Contributors
          </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "center", sm: "flex-start" },
            justifyContent: "space-around",
            gap: '50px'
          }}
        >

        {userLists2.map((item, key) => (
            <Box
              key={key}
              sx={{
                maxWidth: "220px",
                mb: { xs: "20px", sm: "0" },
              }}
            >
              {item?.image ? (
                <Box
                  component="img"
                  src={item?.image}
                  sx={{
                    display: "block",
                    borderRadius: "50%",
                    width: { xs: "125px", md: "150px" },
                    aspectRatio: "1",
                    mx: "auto",
                    mb: "20px",
                  }}
                />
              ) : (
                <Box
                  sx={{
                    backgroundColor: "#8C243F",
                    borderRadius: "50%",
                    width: { xs: "125px", md: "150px" },
                    aspectRatio: "1",
                    mx: "auto",
                    mb: "20px",
                  }}
                ></Box>
              )}

              <Typography
                sx={{
                  fontWeight: "500",
                  fontSize: { xs: "36px", md: "40px" },
                  lineHeight: { xs: "36px", md: "48px" },
                  textAlign: "center",
                  color: "#F7F7F7",
                  mb: "20px",
                }}
              >
                {item.name}
              </Typography>
              <Typography
                sx={{
                  fontWeight: "400",
                  fontSize: { xs: "18px", md: "20px" },
                  lineHeight: "28px",
                  textAlign: "center",
                  color: "#EDEDED",
                }}
              >
                {item.description}
              </Typography>
            </Box>
          ))}

        </Box>
      </Container>
      <Box
        sx={{
          pb: { xs: "40px", md: "100px" },
        }}
      >
        {/* <Typography
          sx={{
            fontWeight: "700",
            fontSize: { xs: "28px", md: "36px" },
            lineHeight: "42px",
            textAlign: "center",
            color: "#FFFFFF",
            mb: "50px",
          }}
        >
          Partners
        </Typography>
        <Slider {...sliderSettings}>
          {Array.from(Array(10).keys()).map((key) => (
            <Box key={key}>
              <Box component="img" src={SliderImage} sx={{ width: 174 }} />
            </Box>
          ))}
        </Slider> */}
      </Box>
    </Fragment>
  );
};

export default AboutUs;
