const { ethers, Wallet } = require('ethers');
const fetch = require("node-fetch");
const sleep = ms => new Promise(res => setTimeout(res, ms));

const privatekey = 'PRIVATE_KEY_HERE';

const provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com');
const wallet = new ethers.Wallet(privatekey, provider);
const signer = wallet.connect(provider);

async function call() {
    const recipient = "RECEIVER_ADDRESS";

    const gas_resp = await fetch('https://gasstation-mumbai.matic.today/v2')
    const gas = await gas_resp.json();
    // const gasPrice = parseInt((gas.fast.maxFee) * 1e9);
    const gasPrice = parseInt((1) * 1e8); //only for testing

    async function tx_call() {
        const tx = {
            from: wallet.address,
            to: recipient,
            value: ethers.utils.parseUnits('0.001', 'ether'),
            gasPrice: gasPrice,
            gasLimit: ethers.utils.hexlify(50000),
            nonce: provider.getTransactionCount(wallet.address, 'latest')
        };


        console.log('tx sent with gas: ', gasPrice);
        const transaction = await signer.sendTransaction(tx);
        console.log('tx hash: ', transaction.hash)
    }

    tx_call();
}

call();