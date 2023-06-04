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
    const contractABI = /* Your contract ABI goes here */
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
            "inputs": [],
            "name": "getAllPropertyIds",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "",
                    "type": "uint256[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_propertyId",
                    "type": "uint256"
                }
            ],
            "name": "getProperty",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "",
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
    ]
    const contractAddress = "0xA22d28a1331A6e2Ad53e0B8Dcd5C5288Be1aE495"; // Replace with actual contract address
    const contract = new web3.eth.Contract(contractABI, contractAddress);

// Get property data
const propertyIds = await contract.methods.getAllPropertyIds().call();
const propertiesDiv = document.getElementById("properties");
for (let i = 0; i < propertyIds.length; i++) {
    const property = await contract.methods.getProperty(propertyIds[i]).call();
    const propertyElement = document.createElement("div");
    propertyElement.className = "col-lg-4 col-md-6 mb-4";
    // Get a random index for the house image
    const randomIndex = Math.floor(Math.random() * 1000);
    propertyElement.innerHTML = `
        <div class="card property-card">
            <img class="card-img-top" src="https://picsum.photos/500/500?random=${randomIndex}" alt="Property image">
            <div class="card-body">
                <h5 class="card-title">${property[3]}</h5>
                <p class="card-text">${property[4]}</p>
                <p class="card-text">${property[5]}</p>
                <p class="card-text">${property[0]} ETH</p>
                ${property[2] === true ? 
                `<button class="btn btn-primary" onClick="buyProperty(${propertyIds[i]})">Buy</button>` : 
                `<button class="btn btn-primary" disabled>Sold</button>`
                }
            </div>
        </div>
    `;
    propertiesDiv.appendChild(propertyElement);
}




window.buyProperty = async (id) => {
    const property = await contract.methods.getProperty(id).call();
    if (property[2]) { // if property is for sale
        const priceInWei = web3.utils.toWei(property[0].toString(), 'ether');
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        await contract.methods.buyProperty(id).send({from: accounts[0], value: priceInWei});
    } else {
        alert("This property has already been sold.");
    }
}


});
