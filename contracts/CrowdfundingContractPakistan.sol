// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableMap.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "hardhat/console.sol";

contract CrowdfundingPakistan is ReentrancyGuard{

    using SafeMath for uint256;

    address deployer;
    uint256 public noOfCampains = 0;

    constructor() {

        deployer = msg.sender;

    }

    struct Campain {

        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        string image;
        string destinationNGO;

    }

    struct Donation{

        address _donator;
        uint256 _donation;

    }

    enum campain_status_option {

        in_process,
        completed,
        terminated,
        funds_transfered
    
    }

    mapping (uint256 => Campain) private campains;

    mapping (uint256 => campain_status_option) private campain_status;

    mapping (uint256 => uint256) private amountCollected;

    mapping (uint256 => address[]) private donators;

    mapping (uint256 => mapping (address => uint256)) private donations;

    mapping (address => uint256) private amount;

    using EnumerableMap for EnumerableMap.UintToAddressMap;

    EnumerableMap.UintToAddressMap private donatorsMap;

    event CampainCreated(uint indexed _id, address indexed _owner, uint indexed _deadline, uint target);

    event DonatedToCampain(uint indexed id, address indexed donator, uint indexed donation);

    event CampainTerminated(uint indexed id, campain_status_option indexed _status);

    event FundsReleased(uint indexed id, uint indexed amount);

    event Withdrawed(address indexed to, uint indexed amount);

    modifier checkDeadline(uint256 _deadline) {

        require(_deadline > block.timestamp,"The deadline should be a date in the future");
        _;

    }

    modifier checkDeadlineCompleted(uint256 _id) {

        require(campains[_id].deadline < block.timestamp,"The deadline should be a date past");
        _;

    }

    modifier checkDeadlineGrater(uint256 _id) {

        require(campains[_id].deadline > block.timestamp,"The deadline should be a date past");
        _;

    }

    modifier campain_on(uint _campainId) {

        require(campain_status[_campainId] == campain_status_option.in_process, "campain finished cant donate to campain");
        _;

    }

    modifier checkDonationAmount(uint _campainId) {

        require(msg.value > 0, "you cant donate 0 or minus amount");
        require(msg.value < campains[_campainId].target.sub(amountCollected[_campainId]).add(1),"amount is grater then the target");
        _;

    }

    modifier onlyOwner(uint _id) {

        require(campains[_id].owner == msg.sender, "you are not the creator or this campain id, so you cant call this function against this campain id");
        _;

    }

    modifier checkAmount {

        require(amount[msg.sender] > 0,"you have no panding amount in the app");
        _;

    }

    function isAddressInArray(uint256 index, address addrToCheck) private view returns (bool) {

        address[] memory addresses = donators[index];

        for (uint256 i = 0; i < addresses.length; i++) {

        if (addresses[i] == addrToCheck) {
            return true;
        }

    }

    return false;

    }

    function createCampain(string memory _title,string memory _description,uint256 _target,uint256 _deadline,string memory _image,string memory _destinationNGO) public checkDeadline(_deadline) {

        Campain storage campain = campains[noOfCampains.add(1)];

        campain.owner = msg.sender;
        campain.title = _title;
        campain.description = _description;
        campain.target = _target;
        campain.deadline = _deadline;
        campain.image = _image;
        campain.destinationNGO = _destinationNGO;

        campain_status[noOfCampains.add(1)] = campain_status_option.in_process;

        noOfCampains = noOfCampains.add(1);

        emit CampainCreated(noOfCampains.add(1),msg.sender,_deadline,_target);

    }

    function donateToCampain(uint256 _id) public payable campain_on(_id) checkDonationAmount(_id) checkDeadlineGrater(_id) {

        if(isAddressInArray(_id,msg.sender)){

            donations[_id][msg.sender] = donations[_id][msg.sender].add(msg.value);
            amountCollected[_id] = amountCollected[_id].add(msg.value);
            emit DonatedToCampain(_id,msg.sender,msg.value);

        } else {

            donators[_id].push(msg.sender);
            donations[_id][msg.sender] = msg.value;
            amountCollected[_id] = amountCollected[_id].add(msg.value);
            emit DonatedToCampain(_id,msg.sender,msg.value);

        }

        if(amountCollected[_id] == campains[_id].target){
            campain_status[_id] = campain_status_option.completed;
        }

    }

    function terminateCampain(uint _id) public onlyOwner(_id) checkDeadlineCompleted(_id) {

        campain_status[_id] = campain_status_option.terminated;
        emit CampainTerminated(_id, campain_status_option.terminated);
        
    }

    function releseFunds(uint256 _id) public onlyOwner(_id){

        uint256 noOfDonators = donators[_id].length;

        if(campain_status[_id] == campain_status_option.completed){
            
            amount[msg.sender] = amount[msg.sender] + amountCollected[_id];
            campain_status[_id] = campain_status_option.funds_transfered;
            emit FundsReleased(_id,amountCollected[_id]);
        
        }

        if(campain_status[_id] == campain_status_option.terminated){
            
            for (uint256 i=0; i < noOfDonators; i++){

                amount[donators[_id][i]] = amount[donators[_id][i]] + donations[_id][donators[_id][i]];
                emit FundsReleased(_id,amountCollected[_id]);

            
            }
        
        }

    }

    function sendEth(address payable _recipient, uint _amount) private nonReentrant{

        bool success = _recipient.send(_amount);
        require(success,"Transfer failed");

    }

    function withdraw() public checkAmount{

        uint _withdrawAmount = amount[msg.sender];
        amount[msg.sender] = amount[msg.sender].sub(amount[msg.sender]);
        sendEth(payable (msg.sender),_withdrawAmount);
        emit Withdrawed(msg.sender,amount[msg.sender]);
    
    }

    function getActiveCampains() public view returns(Campain[] memory,uint[] memory) {

        Campain[] memory campainsActive = new Campain[](noOfCampains);

        uint[] memory campainId = new uint[](noOfCampains);

        uint noOfActiveCampain = 0;

        for (uint i = 0; i < noOfCampains; i++){
            if(campain_status[i.add(1)] == campain_status_option.in_process){
                campainsActive[noOfActiveCampain] = campains[i.add(1)];
                campainId[noOfActiveCampain] = i.add(1);
                noOfActiveCampain++;
            }
        }

        assembly{
            mstore(campainsActive,noOfActiveCampain)
            mstore(campainId,noOfActiveCampain)
        }

        return (campainsActive, campainId);

    }

    function getCampainById(uint256 _id) public view returns(Campain memory){

        Campain memory campainData;

        campainData.owner = campains[_id].owner;
        campainData.title = campains[_id].title;
        campainData.description = campains[_id].description;
        campainData.target = campains[_id].target;
        campainData.deadline = campains[_id].deadline;
        campainData.image = campains[_id].image;
        campainData.destinationNGO = campains[_id].destinationNGO;

        return campainData;


    }

    function getAllMyCampains() public view returns(Campain[] memory,uint[] memory){

        Campain[] memory myCampains = new Campain[](noOfCampains);

        uint[] memory myCampainId = new uint[](noOfCampains);

        uint noOfMyCampain = 0;

        for (uint i = 0; i < noOfCampains; i++){
            if(campains[i.add(1)].owner == msg.sender){
                myCampains[noOfMyCampain] = campains[i.add(1)];
                myCampainId[noOfMyCampain] = i.add(1);
                noOfMyCampain++;
            }
        }

        assembly{
            mstore(myCampains,noOfMyCampain)
            mstore(myCampainId,noOfMyCampain)
        }

        return (myCampains, myCampainId);
    }

    function getDonators(uint256 _id) public view returns(Donation[] memory) {

        uint256 noOfDonators = donators[_id].length;

        Donation[] memory _donation = new Donation[](noOfDonators);

        for (uint256 i=0; i < noOfDonators; i++){
            _donation[i]._donator = donators[_id][i];
            _donation[i]._donation = donations[_id][donators[_id][i]];
        }

        return _donation;

    }

    function getNoOfDonators(uint256 _id) public view returns(uint) {

        return donators[_id].length;

    }

    function getAmountCollected(uint256 _id) public view returns(uint){

        return amountCollected[_id];

    }

    function myBalance() public view returns(uint256){

        return amount[msg.sender];

    }

    function myFundingDetails() public view returns(uint256[] memory, uint256[] memory) {

        uint256[] memory _campainId = new uint[](noOfCampains);
        uint256[] memory _donated = new uint[](noOfCampains);

        uint noOfActiveCampain = 0;

        for(uint i=0 ; i < noOfCampains ; i++){
            _campainId[i] = i.add(1);
            _donated[i] = donations[i.add(1)][msg.sender];
            noOfActiveCampain++;
        }

        assembly{
            mstore(_campainId,noOfActiveCampain)
            mstore(_donated,noOfActiveCampain)
        }

        return (_campainId,_donated);

    }

    function getStatus(uint256 _id) public view returns(campain_status_option) {
        return campain_status[_id];
    }

}