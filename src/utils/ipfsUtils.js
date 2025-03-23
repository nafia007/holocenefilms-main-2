import { ThirdwebStorage } from "@thirdweb-dev/storage";

// Initialize the storage SDK
const storage = new ThirdwebStorage({
  // Use the default IPFS gateway
  gatewayUrls: {
    "ipfs://": ["https://ipfs.thirdwebcdn.com/ipfs/"],
  },
});

/**
 * Upload a file to IPFS
 * @param {File} file - The file to upload
 * @returns {Promise<string>} - The IPFS URI of the uploaded file
 */
export const uploadFileToIPFS = async (file) => {
  try {
    // Upload the file to IPFS
    const uri = await storage.upload(file);
    return uri;
  } catch (error) {
    console.error("Error uploading file to IPFS:", error);
    throw error;
  }
};

/**
 * Upload metadata to IPFS
 * @param {Object} metadata - The metadata to upload
 * @returns {Promise<string>} - The IPFS URI of the uploaded metadata
 */
export const uploadMetadataToIPFS = async (metadata) => {
  try {
    // Upload the metadata to IPFS
    const uri = await storage.upload(metadata);
    return uri;
  } catch (error) {
    console.error("Error uploading metadata to IPFS:", error);
    throw error;
  }
};

/**
 * Upload a film to IPFS with its metadata
 * @param {File} filmFile - The film file to upload
 * @param {Object} metadata - The metadata for the film
 * @returns {Promise<{contentUri: string, metadataUri: string}>} - The IPFS URIs
 */
export const uploadFilmWithMetadata = async (filmFile, metadata) => {
  try {
    // First upload the film file to get its URI
    const contentUri = await uploadFileToIPFS(filmFile);
    
    // Add the content URI to the metadata
    const enhancedMetadata = {
      ...metadata,
      properties: {
        ...metadata.properties,
        contentUri,
      },
    };
    
    // Upload the enhanced metadata
    const metadataUri = await uploadMetadataToIPFS(enhancedMetadata);
    
    return {
      contentUri,
      metadataUri,
    };
  } catch (error) {
    console.error("Error uploading film with metadata:", error);
    throw error;
  }
};

/**
 * Upload a URL reference to IPFS with metadata
 * @param {string} url - The URL to reference
 * @param {Object} metadata - The metadata for the film
 * @returns {Promise<{metadataUri: string}>} - The IPFS URI of the metadata
 */
export const uploadUrlWithMetadata = async (url, metadata) => {
  try {
    // Create enhanced metadata with the URL reference
    const enhancedMetadata = {
      ...metadata,
      properties: {
        ...metadata.properties,
        contentUrl: url,
        isExternalUrl: true,
      },
    };
    
    // Upload the metadata to IPFS
    const metadataUri = await uploadMetadataToIPFS(enhancedMetadata);
    
    return {
      metadataUri,
    };
  } catch (error) {
    console.error("Error uploading URL with metadata:", error);
    throw error;
  }
};

/**
 * Get the gateway URL for an IPFS URI
 * @param {string} ipfsUri - The IPFS URI
 * @returns {string} - The gateway URL
 */
export const getGatewayUrl = (ipfsUri) => {
  return storage.resolveScheme(ipfsUri);
};