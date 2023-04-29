pragma solidity ^0.5.1;

contract realEstateContract {
    
    // Current status: 2 different states.
    enum STATUS {PENDING, SOLD}
    
    constructor () public {
        owner = msg.sender;
    }
    
    // Counter to count property & increment Id.
    uint256 public propertyCount;
    
    address public owner;
    uint [] myArray;
    
    // Modifier to restrict access to the contract owner.
    modifier isOwner {
        require(msg.sender == owner);
        _;
    }
    
    struct NewProperty {
        uint propertyId;
        uint cost;
        string location;
        STATUS status;
        address ownerAddr;
    }
    
    // Mapping to store property details with propertyId as key.
    mapping(uint => NewProperty) public property;
    // Mapping to store an array of properties owned by an address.
    mapping(address => NewProperty[]) public house;
    
    // Add new property.
    function addNewProperty(uint _cost, string memory _location, STATUS _status, address _ownerAddr) public isOwner {
        propertyCount += 1;
        property[propertyCount] = NewProperty(propertyCount, _cost, _location, _status, _ownerAddr);
        
        NewProperty memory houses = NewProperty(
            {   
                propertyId: propertyCount,
                cost: _cost,
                location: _location,
                status: _status,
                ownerAddr: _ownerAddr
            });
        house[_ownerAddr].push(houses);
    }
    
    // Request change of ownership.
    function changeOwnership(uint id, address _buyer) public isOwner returns (address, STATUS status, bool _statusChange) {
        require(property[id].status == STATUS.PENDING);
        require(property[id].ownerAddr != _buyer);
        if (property[id].ownerAddr != _buyer) {
            property[id].ownerAddr = _buyer;
            property[id].status = STATUS.SOLD;
            _statusChange = true;
            return (_buyer, status, _statusChange);
        } else {
            _statusChange = false;
            return (_buyer, status, _statusChange);
        }
    }   
    
    // Get all property details of an address with status not sold.
    function creatingArrayForPropertiesNotSold(address propertyOwner) public returns (uint[] memory) {
        delete myArray; 
        for (uint i = 0; i < (house[propertyOwner].length); i++) {
            if (house[propertyOwner][i].status != STATUS.SOLD) {
                myArray.push(house[propertyOwner][i].propertyId);
            } 
        }  return (myArray);
    }
    
    // Get the length of myArray which stores the ID of properties with status not sold for each address.
    function getLengthOfMyArray () public view returns (uint) {
        return myArray.length;
    }
    
    // Get the length of the array.
    function getLengthArray(uint propertyCounter) public pure returns(uint){
        return propertyCounter;
    }
    
    // Get the property details.
    function getPropertyDetails(uint id) public view returns (uint _id, uint cost, string memory location, STATUS status, address o) {
        return (id, property[id].cost, property[id].location, property[id].status, property[id].ownerAddr);
    }
    
    // Change the value of the property.
    function changeValue(uint id, uint _newValue) public isOwner returns (bool) {
        property[id].cost = _newValue;
        return true;
    }
}
