// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LandRegistry {
    struct User {
        string firstName;
        string lastName;
        string nrc;
        bool isRegistered;
        bool isAdmin;
    }
    
    struct Property {
        string title;
        string location;
        uint256 price;
        address owner;
        bool isForSale;
        string titleDeedHash;
        PropertyStatus status;
        address pendingBuyer;
    }
    
    enum PropertyStatus { NotListed, Pending, Approved, Rejected }
    
    struct Transaction {
        address buyer;
        address seller;
        uint256 propertyId;
        uint256 price;
        bool isApproved;
        bool isCompleted;
        uint256 timestamp;
    }
    
    mapping(address => User) public users;
    mapping(uint256 => Property) public properties;
    mapping(uint256 => Transaction) public transactions;
    
    uint256 public propertyCount;
    uint256 public transactionCount;
    address[] public admins;
    
    event UserRegistered(address user);
    event PropertyListed(uint256 propertyId);
    event OfferMade(uint256 propertyId, address buyer);
    event OfferApproved(uint256 propertyId);
    event OfferRejected(uint256 propertyId);
    event TransactionCompleted(uint256 transactionId);
    
    modifier onlyAdmin() {
        require(users[msg.sender].isAdmin, "Only admin can perform this action");
        _;
    }
    
    modifier onlyRegistered() {
        require(users[msg.sender].isRegistered, "User not registered");
        _;
    }
    
    constructor() {
        admins.push(msg.sender);
        users[msg.sender].isAdmin = true;
    }
    
    function registerUser(string memory _firstName, string memory _lastName, string memory _nrc) public {
        require(!users[msg.sender].isRegistered, "User already registered");
        users[msg.sender] = User(_firstName, _lastName, _nrc, true, false);
        emit UserRegistered(msg.sender);
    }
    
    function listProperty(
        string memory _title,
        string memory _location,
        uint256 _price,
        string memory _titleDeedHash
    ) public onlyRegistered {
        propertyCount++;
        properties[propertyCount] = Property(
            _title,
            _location,
            _price,
            msg.sender,
            true,
            _titleDeedHash,
            PropertyStatus.NotListed,
            address(0)
        );
        emit PropertyListed(propertyCount);
    }
    
    function makeOffer(uint256 _propertyId) public onlyRegistered {
        Property storage property = properties[_propertyId];
        require(property.isForSale, "Property not for sale");
        require(property.status == PropertyStatus.NotListed, "Property not available");
        require(property.owner != msg.sender, "Cannot buy own property");
        
        property.status = PropertyStatus.Pending;
        property.pendingBuyer = msg.sender;
        
        emit OfferMade(_propertyId, msg.sender);
    }
    
    function approveOffer(uint256 _propertyId) public {
        Property storage property = properties[_propertyId];
        require(msg.sender == property.owner, "Only owner can approve");
        require(property.status == PropertyStatus.Pending, "No pending offer");
        
        property.status = PropertyStatus.Approved;
        emit OfferApproved(_propertyId);
    }
    
    function rejectOffer(uint256 _propertyId) public {
        Property storage property = properties[_propertyId];
        require(msg.sender == property.owner, "Only owner can reject");
        require(property.status == PropertyStatus.Pending, "No pending offer");
        
        property.status = PropertyStatus.Rejected;
        property.pendingBuyer = address(0);
        emit OfferRejected(_propertyId);
    }
    
    function completeTransaction(uint256 _propertyId) public payable {
        Property storage property = properties[_propertyId];
        require(property.status == PropertyStatus.Approved, "Transaction not approved");
        require(msg.sender == property.pendingBuyer, "Not the approved buyer");
        require(msg.value == property.price, "Incorrect payment amount");
        
        transactionCount++;
        transactions[transactionCount] = Transaction(
            msg.sender,
            property.owner,
            _propertyId,
            property.price,
            true,
            true,
            block.timestamp
        );
        
        // Transfer ownership
        property.owner = msg.sender;
        property.isForSale = false;
        property.status = PropertyStatus.NotListed;
        property.pendingBuyer = address(0);
        
        // Transfer payment to seller
        payable(property.owner).transfer(msg.value);
        
        emit TransactionCompleted(transactionCount);
    }
    
    function getListedProperties() public view returns (Property[] memory) {
        uint256 listedCount = 0;
        for (uint256 i = 1; i <= propertyCount; i++) {
            if (properties[i].isForSale) {
                listedCount++;
            }
        }
        
        Property[] memory listedProperties = new Property[](listedCount);
        uint256 currentIndex = 0;
        
        for (uint256 i = 1; i <= propertyCount; i++) {
            if (properties[i].isForSale) {
                listedProperties[currentIndex] = properties[i];
                currentIndex++;
            }
        }
        
        return listedProperties;
    }
}