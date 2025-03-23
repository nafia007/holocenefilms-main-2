import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { Polygon } from "@thirdweb-dev/chains";

// Initialize the SDK with your client ID
const sdk = new ThirdwebSDK(Polygon, {
  clientId: "61c6a87659a28faeff906ed86e7ab9cb",
});

// Connect to your contract
export const getThirdwebContract = async () => {
  try {
    const contract = await sdk.getContract("0xB07E087e690da81A96Bf7f6bd1Df33f835a501B7");
    return contract;
  } catch (error) {
    console.error("Failed to get contract:", error);
    throw error;
  }
};