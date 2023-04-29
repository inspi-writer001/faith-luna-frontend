import React from "react";
import PortfolioBlock from "./PortfolioBlock";
import { Box, Grid } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import Style from "../home/Home.module.scss";
import { useState } from "react";
import { info } from "../../info/Info";
import { nft_contract } from "../../nft_contract";
import axios from "axios";
import { useEffect } from "react";

export default function Portfolio() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { isConnected, address } = useAccount();

  const [Nft, setNft] = useState([]);
  let nft_ = [];
  // console.log(state);

  //   useEffect(() => {
  //     if (!!state) {
  //       console.log(1);
  //     } else {
  //       navigate("/");
  //     }
  //   }, []);
  return (
    <Box>
      <Grid container display={"flex"} justifyContent={"center"}>
        {state?.one_of_us === true ? (
          <div style={{ display: " flex", overflow: "hidden" }}>
            <h1
              style={{
                display: " flex",
                flexDirection: "column",
                overflow: "hidden",
                fontSize: "0.9rem",
                marginTop: "20%"
              }}
            >
              You have some of our NFTs at{" "}
              <span
                style={{
                  background: info.gradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                {nft_contract}
              </span>
              <span className={Style.hand}>🎉</span>
            </h1>
          </div>
        ) : !isConnected ? (
          <div style={{ display: " flex", overflow: "hidden" }}>
            <h1
              style={{
                display: " flex",
                flexDirection: "column",
                overflow: "hidden",
                fontSize: "0.9rem",
                marginTop: "20%"
              }}
            >
              Return home and connect your wallet
            </h1>
          </div>
        ) : (
          <div style={{ display: " flex", overflow: "hidden" }}>
            <h1
              style={{
                display: " flex",
                flexDirection: "column",
                overflow: "hidden",
                fontSize: "0.9rem",
                marginTop: "20%"
              }}
            >
              OOps😖, You can't view this Page
              <div
                style={{
                  background: info.gradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                You don't have FaithLuna NFTs
              </div>
            </h1>
          </div>
        )}
        {/* {info.portfolio.map((project, index) => (
          <Grid item xs={12} md={6} key={index}>
            <PortfolioBlock
              image={project.image}
              live={project.live}
              source={project.source}
              title={project.title}
            />
          </Grid>
        ))} */}
      </Grid>
    </Box>
  );
}
