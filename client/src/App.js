import React, { useEffect } from "react";
import "./styles/App.css";
import twitterLogo from "./assets/twitter-logo.svg";
import {
	askContractToMintNft,
	setupEventListener,
} from "./contractFunctions.js";

// Constants
const TWITTER_HANDLE = "_buildspace";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const OPENSEA_LINK = "";

const App = () => {
	const [currentAccount, setCurrentAccount] = React.useState("");

	const checkIfWalletIsConnected = async () => {
		const { ethereum } = window;

		if (!ethereum) {
			console.log("Make sure you have metamask!");
			return;
		} else {
			console.log("We have the ethereum object", ethereum);
		}

		let chainId = await ethereum.request({ method: "eth_chainId" });
		console.log("Connected to chain " + chainId);

		// String, hex code of the chainId of the Rinkebey test network
		const goerliChainId = "0x5";
		if (chainId !== goerliChainId) {
			alert("You are not connected to the Rinkeby Test Network!");
		}

		const accounts = await ethereum.request({ method: "eth_accounts" });

		if (accounts.length !== 0) {
			const account = accounts[0];
			console.log("Found an authorized account:", account);
			setCurrentAccount(account);
			setupEventListener();
		} else {
			console.log("No authorized account found");
		}
	};

	const connectWallet = async () => {
		try {
			const { ethereum } = window;

			if (!ethereum) {
				alert("Get MetaMask!");
				return;
			}
			const accounts = await ethereum.request({
				method: "eth_requestAccounts",
			});
			console.log("Connected", accounts[0]);
			setCurrentAccount(accounts[0]);
			setupEventListener();
		} catch (error) {
			console.log(error);
		}
	};

	const renderNotConnectedContainer = () => (
		<button
			className="cta-button connect-wallet-button"
			onClick={connectWallet}
		>
			Connect to Wallet
		</button>
	);

	useEffect(() => {
		checkIfWalletIsConnected();
	}, []);

	return (
		<div className="App">
			<div className="container">
				<div className="header-container">
					<p className="header gradient-text">My NFT Collection</p>
					<p className="sub-text">
						Each unique. Each beautiful. Discover your NFT today.
					</p>
					{currentAccount === "" ? (
						renderNotConnectedContainer()
					) : (
						<button
							onClick={askContractToMintNft}
							className="cta-button connect-wallet-button"
						>
							Mint NFT
						</button>
					)}
				</div>
				<div className="footer-container">
					<img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
					<a
						className="footer-text"
						href={TWITTER_LINK}
						target="_blank"
						rel="noreferrer"
					>{`built on @${TWITTER_HANDLE}`}</a>
				</div>
			</div>
		</div>
	);
};

export default App;
