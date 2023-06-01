// Connect to Ethereum
window.addEventListener('load', async () => {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
    } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
    } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }

    // Load contract data here
    // Contract ABI and address go here
    const contractABI = 
    [
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_propertyId",
                    "type": "uint256"
                }
            ],
            "name": "buyProperty",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_propertyId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_price",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_description",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_location",
                    "type": "string"
                }
            ],
            "name": "listPropertyForSale",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "PropertyId",
                    "type": "uint256"
                }
            ],
            "name": "PropertySold",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "Properties",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "price",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "bool",
                    "name": "forSale",
                    "type": "bool"
                },
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "description",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "location",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "PropertyIds",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]; // Replace with actual contract ABI
    const contractAddress = "0xdB2697222fEB9A812BD9E2BD2E60099F832639D3"; // Replace with actual contract address
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    // Handle form submission
    const form = document.getElementById("addPropertyForm");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const id = document.getElementById("id").value;
        const price = document.getElementById("price").value;
        const name = document.getElementById("name").value;
        const description = document.getElementById("description").value;
        const location = document.getElementById("location").value;
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        await contract.methods.listPropertyForSale(id, price, name, description, location).send({from: accounts[0]});
        alert("Property added!");
    });
});
