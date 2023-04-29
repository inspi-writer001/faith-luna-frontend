import React from "react";
import Style from "./Home.module.scss";
import me from "../../img/self.png";
import classNames from "classnames";
import EmojiBullet from "./EmojiBullet";
import SocialIcon from "./SocialIcon";
import { Box } from "@mui/material";
import { info } from "../../info/Info";
import { Button } from "@pancakeswap/uikit";

import { useAccount, useConnect, useSignMessage, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

export default function Home() {
  return (
    <Box
      component={"main"}
      display={"flex"}
      flexDirection={{ xs: "column", md: "row" }}
      alignItems={"center"}
      justifyContent={"center"}
      minHeight={"calc(100vh - 175px)"}
    >
      <Box
        className={classNames(Style.avatar, Style.shadowed)}
        alt={"FaithLuna NFT"}
        style={{ background: info.gradient }}
        component={"img"}
        src={
          "https://ipfs.io/ipfs/QmZSiQtfWkmha6HVTh9BpL96FyYB5m8cN3eCc6t4UogcUQ/1.jpg"
        }
        width={{ xs: "35vh", md: "40vh" }}
        height={{ xs: "35vh", md: "40vh" }}
        borderRadius={"50%"}
        p={"0.75rem"}
        mb={{ xs: "1rem", sm: 0 }}
        mr={{ xs: 0, md: "2rem" }}
      />
      <Box>
        <h1>A New Way to</h1>
        <h1>
          Appreciate the{" "}
          <span
            style={{
              background: info.gradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            Artwork
          </span>
          <span className={Style.hand}>🎉</span>
        </h1>
        {/* <h2>I'm {info.position}.</h2> */}
        <Box component={"ul"} p={"0.8rem"}>
          {/* {info.miniBio.map((bio, index) => (
            <EmojiBullet key={index} emoji={bio.emoji} text={bio.text} />
          ))} */}
        </Box>
        {/* <Box
          display={"flex"}
          gap={"1.5rem"}
          justifyContent={"flex-start"}
          fontSize={{ xs: "2rem", md: "2.5rem" }}
        >
          <Button>Connect Wallet</Button>
         
        </Box> */}
      </Box>
    </Box>
  );
}
