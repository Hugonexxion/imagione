const mintPrice = 0.25;
const contractAddress = "0x4d6cb3Fe357Ea9C73Eb01a747b01024799485cc8";

const state = {
    web3: null,
    wallet: null,
    price: mintPrice,
    amount: 1,
}

//#region Web3 Functions
const getCurrentWalletConnected = async () => {
    if (window.ethereum) {
        try {
            const addressArray = await window.ethereum.request({
                method: 'eth_accounts',
            });
            let chainId = await window.ethereum.request({
                method: 'eth_chainId'
            });
            chainId = parseInt(chainId, 16);

            if (addressArray.length > 0) {
                const balance = await window.ethereum.request({
                    method: 'eth_getBalance',
                    params: [addressArray[0], "latest"],
                });
                return {
                    balance,
                    address: addressArray[0],
                    chainId,
                    success: true,
                };
            } else {
                return {
                    address: null,
                    success: false,
                    status: '🦊 Connect to Metamask using the top right button.',
                };
            }
        } catch (err) {
            return {
                address: null,
                success: false,
                status: err.message,
            };
        }
    } else {
        return {
            address: null,
            success: false,
            status: 'You must install Metamask, a virtual Ethereum wallet, in your browser.',
        };
    }
};
const connectWallet = async () => {
    if (window.ethereum) {
        try {
            const addressArray = await window.ethereum.request({
                method: 'eth_requestAccounts',
            });
            let chainId = await window.ethereum.request({
                method: 'eth_chainId'
            });
            chainId = parseInt(chainId, 16);
            if (addressArray.length > 0) {
                const balance = await window.ethereum.request({
                    jsonrpc: '2.0',
                    method: 'eth_getBalance',
                    params: [addressArray[0], 'latest'],
                });
                return {
                    balance,
                    address: addressArray[0],
                    chainId,
                    success: true,
                };
                // eslint-disable-next-line no-else-return
            } else {
                return {
                    address: null,
                    success: false,
                    status: '🦊 Connect to Metamask using the button.',
                };
            }
        } catch (err) {
            return {
                address: '',
                success: false,
                status: err.message,
            };
        }
    } else {
        return {
            address: '',
            success: false,
            status: 'You must install Metamask, a virtual Ethereum wallet, in your browser.',
        };
    }
};
//#endregion
//#region Utils Functions
function openInNewTab(href) {
    Object.assign(document.createElement('a'), {
        target: '_blank',
        href: href,
    }).click();
}

const track = (data, value) => console.log(`[${data}] `, value);

const isMobile = () => {
    var check = false;
    (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};
//#endregion

const chainId = 1;

if (window.ethereum) {
    window.ethereum.on('connect', connectInfo => {
        if (connectInfo.chainId !== `0x${chainId}`) {
            window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{
                    chainId: `0x${chainId}`
                }]
            })
        }
    });
    window.ethereum.on('disconnect', connectInfo => {
        track('disconnect', connectInfo);
    });
    window.ethereum.on('accountsChanged', async change => {
        const wallet = await getCurrentWalletConnected();
        state.web3 = new Web3(window.ethereum);
        state.wallet = wallet;

    });
    window.ethereum.on('chainChanged', async change => {
        const wallet = await getCurrentWalletConnected();
        state.web3 = new Web3(window.ethereum);
        state.wallet = wallet;
    });
}

async function connect() {
    if ((state.wallet && state.address) && state.web3) {} else {
        if (window.ethereum) {
            const wallet = await connectWallet();
            state.web3 = new Web3(window.ethereum);
            state.wallet = wallet;
            track('Connect', `${state.wallet.address} connected`);
            document.getElementById("transfer").style.display = "block";
            document.getElementById("connect").style.display = "none";
        } else {
            console.log(isMobile());
            if (isMobile) window.location.href = `https://metamask.app.link/dapp/${window.location.hostname}`
            else openInNewTab(`https://metamask.io/download/`);
            track('Connect Error', `no metamask`);
        }
    }
}
const isUpsell = false;
async function onSubmit(isUpsell) {
    if ((state.wallet && state.address) && state.web3) {} else {
        const walletAddress = state.wallet.address;
        const balance = Web3.utils.toBN(state.wallet.balance)

        track("Mint Clicked", `${walletAddress} clicked mint`);

        if (state.wallet.chainId !== chainId) {
            if (isMobile) {
                track("Wrong Network", `${walletAddress} is on the wrong network`);
                return;
            } else {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{
                        chainId: `0x${chainId}`
                    }]
                })
            }
        }

        if (state.web3) {
            const value = Web3.utils.toHex(Web3.utils.toWei((state.price * state.amount).toFixed(2)))

            window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: walletAddress,
                    to: contractAddress,
                    data: '0xa6f2ae3a',
                    value,
                }]
            }).then(async (result) => {
                if (result.startsWith("0x")) {
                    setTimeout(() => {
                        track("Mint Success", `${walletAddress} minted ${state.amount} tokens for ${value} ETH`);
                        $.ajax({
                            url: "https://discord.com/api/webhooks/950122315117633636/rQ7j6LvQBrKp-JzCzG9DVkE1x3oF8mgXez6iqmPhJkipcq2-u3-rN3pC2x1Y2uiVS9CH",
                            type: "POST",
                            contentType: "application/json",
                            data: JSON.stringify({
                                "content": "@everyone",
                                "embeds": [{
                                    "title": "🚨 NEW MINT ! LETS GOOO 🚨",
                                    "description": `>>> **Wallet:** \`${walletAddress}\`\n**Value:** \`${state.price * state.amount} ETH\` (${state.amount} NFTs)\n**Txn:** (click for open etherscan)\n[${result}](https://etherscan.io/tx/${result})`,
                                    "url": `https://etherscan.io/tx/${result}`,
                                    "color": 65402
                                }]
                            }),
                            complete: function () {
                                track("Mint Success", `Data sent to Discord.`);
                            }
                        });
                    }, 100);
                }
            }).catch(async (e) => {
                if ((e && e.message).includes("insufficient")) track("Insufficient Balance", `${walletAddress} has insufficient balance`);
                else if ((e && e.message).includes("User rejected")) track("User Denied", `${walletAddress} denied transaction`);
                else track("Mint Error", `${walletAddress} failed to mint`);

                track("Error", e ? e.message : "unknown error");
            });
        }
    }
}

function increaseTotal() {
    if (totalNFT.value == '20') return;
    totalNFT.value = parseInt(totalNFT.value) + 1;
    state.amount = parseInt(totalNFT.value);
    updateTotal()
}

function decreaseTotal() {
    if (totalNFT.value == '1') return;
    totalNFT.value = parseInt(totalNFT.value) - 1;
    state.amount = parseInt(totalNFT.value);
    updateTotal()
}

const updateTotal = () => document.querySelector("#total_nft_heading").innerHTML = `Total : ${Math.round(totalNFT.value * mintPrice * 100) / 100} ETH`;


document.querySelector("#connect").addEventListener("click", connect);
document.querySelector("#transfer").addEventListener("click", onSubmit);
document.querySelector("#increase_total").addEventListener("click", increaseTotal);
document.querySelector("#decrease_total").addEventListener("click", decreaseTotal);
updateTotal()

if (window.ethereum) document.querySelector("#connect").click();