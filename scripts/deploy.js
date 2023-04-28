const { ether, ethers} = require("hardhat")
const hre = require("hardhat")
const fs = require("fs")

async function main() {

  const deployer = await ethers.getSigner()

  console.log("Deploying contracts with the account:", deployer.address)

  console.log("Account balance:", (await deployer.getBalance()).toString())

  const CrowdfundingPakistan = await hre.ethers.getContractFactory("CrowdfundingPakistan")
  const crowdfundingPakistan = await CrowdfundingPakistan.deploy()

  await crowdfundingPakistan.deployed()

  const crowdfundingPakistanData = {
    address: crowdfundingPakistan.address,
    abi: JSON.parse(crowdfundingPakistan.interface.format('json'))
  }

  fs.writeFileSync('./src/blockchain/abis/CrowdfundingPakistan.json',JSON.stringify(crowdfundingPakistanData))

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })