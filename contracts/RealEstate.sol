pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol";

contract RealEstate {
    using SafeMath for uint256;
    struct Property {
        uint256 price;
        address owner;
        bool forSale;
        string name;
        string description;
        string location;
    }
    //Mapping from property IDs to property structs
    mapping (uint256 => Property) public Properties;
    uint256[] public PropertyIds;
    //storing all the properties Ids 

    event PropertySold (uint256 PropertyId); //event for when a property is sold   

    function listPropertyForSale (uint256 _propertyId, uint256 _price, string memory _name, string memory _description, string memory _location

    ) public {

        Property memory newProperty = Property({

            price: _price,
            owner: msg.sender,
            forSale: true,
            name:_name,
            description: _description,
            location: _location
            });

        Properties[_propertyId] = newProperty;
        PropertyIds.push(_propertyId);
    }

    //the function that allows the user to buy the property


    function buyProperty (uint256 _propertyId) public payable {
        Property storage property = Properties[_propertyId];
        require(property.forSale, "Property is not for sale");
        require(property.price <= msg.value, "Not enough funds");

        address seller = property.owner;

        // Transfer funds to the seller
        payable(seller).transfer(property.price);

        // Update property details
        property.owner = msg.sender;
        property.forSale = false;

        emit PropertySold(_propertyId);
        }


    function getProperty(uint256 _propertyId) public view returns (uint256, address, bool, string memory, string memory, string memory) {
        Property memory property = Properties[_propertyId];
        return (property.price, property.owner, property.forSale, property.name, property.description, property.location);
    }   

    function getAllPropertyIds() public view returns (uint256[] memory) {
        return PropertyIds;
    }

}
