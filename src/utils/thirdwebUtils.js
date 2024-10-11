import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";

// Create the client with your clientId
const client = createThirdwebClient({
  clientId: "61c6a87659a28faeff906ed86e7ab9cb"
});

// Connect to your contract
export const getThirdwebContract = () => {
  return getContract({
    client,
    chain: defineChain(137),
    address: "0xB07E087e690da81A96Bf7f6bd1Df33f835a501B7"
  });
};