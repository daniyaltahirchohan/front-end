import { ethers } from "ethers";

export const createCampain = async (contract,title,description,target,deadline,image,destinationNGO) => {
     
    await contract.createCampain(title,description,target,deadline,image,destinationNGO)

}

export const donateToCampain = async (contract,id,amount) => { 

    const overrides = {
        value: ethers.utils.parseEther(amount),
    };
    const tx = await contract.donateToCampain(id, overrides);
    console.log(tx.hash);

}

export const terminateCampain = async (contract,id) => { 

    await contract.terminateCampain(id)

}

export const releseFunds = async (contract,id) => { 

    await contract.releseFunds(id)

}

export const withdraw = async (contract) => {
    
    await contract.withdraw()

}

export const getActiveCampains = async (contract) => { 

    return await contract.getActiveCampains()

}

export const getCampainById = async (contract,id) => { 

    return await contract.getCampainById(id)

}

export const getAllMyCampains = async (contract) => { 

    return await contract.getAllMyCampains()

}

export const getDonators = async (contract,id) => { 

    return await contract.getDonators(id)

}

export const getNoOfDonators = async (contract,id) => { 

    return await contract.getNoOfDonators(id)

}

export const getAmountCollected = async (contract,id) => { 

    return await contract.getAmountCollected(id)

}

export const myBalance = async (contract) => { 

    return await contract.myBalance()

}

export const myFundingDetails = async (contract) => { 

    return await contract.myFundingDetails()

}

export const getStatus = async (contract,id) => { 

    return await contract.getStatus(id)

}

