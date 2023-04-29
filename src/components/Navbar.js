/* eslint-disable */

import React, { useState } from "react";
import Style from "./Navbar.module.scss";
import Toggler from "./home/Toggler";
import { Link, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import { info } from "../info/Info";
import { Button } from "@pancakeswap/uikit";
import { useNavigate } from "react-router-dom";
import { nft_contract } from "../nft_contract";

import { useAccount, useConnect, useSignMessage, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import axios from "axios";
import TextTruncate from "react-text-truncate";
import { useEffect } from "react";

const Navbar = ({ darkMode, handleClick }) => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(
    JSON.parse(localStorage.getItem("isMoralisAuth")) || false
  );

  const [userAccount, setUserAccount] = useState();
  const [buttonContent, setButtonContent] = useState("Connect Wallet");
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected, address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [session, setSession] = useState({});
  const [Nft, setNft] = useState(
    JSON.parse(localStorage.getItem("myNFT")) || []
  );

  const handleAuth = async () => {
    //disconnects the web3 provider if it's already active
    const signOut = async () => {
      await axios(`${process.env.REACT_APP_SERVER_URL}/logout`, {});

      //   navigate("/signin");
    };

    axios(`${process.env.REACT_APP_SERVER_URL}/authenticate`, {})
      .then(({ data }) => {
        const { iat, ...authData } = data; // remove unimportant iat value

        setSession(authData);
      })
      .catch((err) => {
        // console.log("something went wrong");
        // console.log(err);
      });

    if (isConnected) {
      await signOut();
      await disconnectAsync();
      localStorage.removeItem("walletAddress");
      localStorage.removeItem("myNFT");
    }
    // enabling the web3 provider metamask
    const { account, chain } = await connectAsync({
      connector: new InjectedConnector()
    });

    const userData = { address: account, chain: chain.id, network: "evm" };
    localStorage.setItem("walletAddress", `${account}`);
    // // console.log(account);
    // console.log(chain);

    // making a post request to our 'request-message' endpoint
    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/request-message`,
      userData,
      {
        headers: {
          "content-type": "application/json"
        }
      }
    );
    const message = data.message;
    // signing the received message via metamask
    const signature = await signMessageAsync({ message });

    await axios
      .post(`${process.env.REACT_APP_SERVER_URL}/verify`, {
        message,
        signature
      })
      .then(async (response) => {
        if (response.status === 200) {
          // console.log("happy user");
          const userNFT = await axios
            .post(`${process.env.REACT_APP_SERVER_URL}/get-nft/${account}`)
            .then((response) => {
              if (response.status === 200) {
                localStorage.setItem("isMoralisAuth", true);
                setAuthenticated(true);
                setNft(response.data?.message?.result);
                localStorage.setItem(
                  "myNFT",
                  `${JSON.stringify(response?.data?.message?.result)}`
                );
                // console.log(response.data?.message?.result);
              }
            });
        }
      });

    // redirect to /user
    // navigate("/user");
    setUserAccount(account);
  };

  //   useEffect(() => {
  //     setButtonContent(
  //       authenticated === true
  //         ? address
  //         : isConnected === true
  //         ? "connecting..."
  //         : buttonContent
  //     );
  //   });

  // process.env.REACT_APP_NFT_ADDRESS
  const navToGallery = () => {
    const searchObject = Nft.find((_nft) => _nft.token_address == nft_contract);
    // console.log(searchObject);
    if (!!searchObject) {
      // console.log(searchObject);
      navigate("/gallery", {
        state: {
          one_of_us: true,
          nfts: Nft
        }
      });
    } else {
      navigate("/gallery");
    }
  };

  const links = [
    {
      name: "Home",
      to: "/",
      active: "home"
    },
    {
      name: "gallery",
      to: "/#",
      active: "about"
    },

    {
      name: (
        <Button
          style={{
            maxWidth: "170px",
            width: "170px",
            "white-space": "nowrap",
            overflow: "hidden",
            "text-overflow": "ellipsis",
            float: "left",
            display: "block"
          }}
          onClick={async () => {
            if (
              typeof window.ethereum !== "undefined" &&
              window.ethereum.isMetaMask
            ) {
              console.log("Metamask is installed");
              if (isConnected) {
                //   setButtonContent("Connect Wallet");
                await disconnectAsync();
                localStorage.removeItem("myNFT");
                localStorage.removeItem("walletAddress");
                localStorage.removeItem("isMoralisAuth");
              } else {
                await handleAuth();
              }
            } else {
              console.log("Metamask is not installed");
              alert("Install Metamask first");
            }
          }}
        >
          {/* {authenticated
            ? address
            : isConnected
            ? "connecting..."
            : !address && !isConnected
            ? buttonContent
            : buttonContent} */}

          {!address && !isConnected
            ? buttonContent
            : authenticated
            ? address
            : isConnected
            ? "Connecting ..."
            : buttonContent}
        </Button>
      ),
      to: "/#",
      active: "gallery"
    }
  ];

  const location = useLocation();
  const [active, setActive] = useState(
    location.pathname === "/"
      ? "home"
      : location.pathname.slice(1, location.pathname.length)
  );

  //   useEffect(() => {
  //     if (isConnected) {
  //       setButtonContent(userAccount);
  //     }
  //   });

  return (
    <Box component={"nav"} width={"100%"}>
      <Box
        component={"ul"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={{ xs: "2rem", md: "8rem" }}
        textTransform={"lowercase"}
        fontSize={"1rem"}
      >
        {links.map((link, index) => (
          <Box
            key={index}
            // component={"li"}
            className={link.active === active && !link.type && Style.active}
            sx={{ borderImageSource: info.gradient }}
          >
            <div
              //   to={link.to}
              onClick={() => {
                setActive(link.active);
                if (link.name.toLowerCase() === "gallery") {
                  navToGallery();
                } else {
                  navigate(`${link.to}`);
                }
              }}
              className={Style.link}
            >
              {!link.type && <p style={{ padding: "0.5rem 0" }}>{link.name}</p>}
              {link.type && <h1>{link.name}</h1>}
            </div>
          </Box>
        ))}
        <li>
          <Toggler darkMode={darkMode} handleClick={handleClick} />
        </li>
      </Box>
    </Box>
  );
};

export default Navbar;
