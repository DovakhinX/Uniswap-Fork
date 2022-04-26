
const hre = require("hardhat");

async function main() {
  /////////////////////Token creation///////////////////////////////
  const Token1 = await hre.ethers.getContractFactory("Token1");
  const Token2 = await hre.ethers.getContractFactory("Token2");
  const token1 = await Token1.deploy();
  const token2 = await Token2.deploy();
  await token1.deployed();
  await token2.deployed();
  console.log("Token 1 deployed to:", token1.address);
  console.log("Token 2 deployed to:", token2.address);
  //////////////////////Deploy factory///////////////////////////////////
  const Factory=await hre.ethers.getContractFactory("UniswapV2Factory");
  const factory=await Factory.deploy("0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199");
  console.log("Factory contract deployed to:",factory.address);
  /////////////////////Pair creation///////////////////////////////////
  const Setpair=await factory.createPair(token1.address , token2.address);
  const Getpair=await factory.allPairsLength();
  console.log("No of pairs:",parseInt(Getpair));
  //////////////////////////////////////////////////////
  const Router=await hre.ethers.getContractFactory("UniswapV2Router02");
  const router=await Router.deploy(factory.address,"0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2");
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
