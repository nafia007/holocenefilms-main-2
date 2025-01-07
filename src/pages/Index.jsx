import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ThirdwebNftMedia, useContract, useNFT } from "@thirdweb-dev/react";
import { getThirdwebContract } from '../utils/thirdwebUtils';
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Index = () => {
  const { contract } = useContract({
    contract: getThirdwebContract(),
  });
  const { data: nft, isLoading, error } = useNFT(contract, "0");

  const renderNFTContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-3">
          <Skeleton className="h-[200px] w-[300px]" />
          <Skeleton className="h-4 w-[250px]" />
        </div>
      );
    }

    if (error) {
      return (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load NFT. Please try again later.
          </AlertDescription>
        </Alert>
      );
    }

    if (!nft) {
      return (
        <Alert>
          <AlertTitle>No NFT Found</AlertTitle>
          <AlertDescription>
            There are currently no featured NFTs available.
          </AlertDescription>
        </Alert>
      );
    }

    return (
      <div className="bg-gradient-to-r from-purple-400/10 to-pink-400/10 backdrop-blur-lg p-8 rounded-xl shadow-2xl border border-purple-500/20">
        <img 
          src="data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAMABAADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDHFOpBS1RgKKcKaKcKAHCnimCnCgB4pRTRTxSAeKWkFOFACinCkFOFAxwp9MFPFAC0opAKcBSAetOxTVp4FIBwpwpopwoAcKcBSCnCgY4CnCkFOFIBwpwptOFAD1p1NFOFACilApBTwKBiiniminCkBIKeKjFSCkA4VIKjFSCkMkWnioxTxSGSCnCmCnikA8U8UwU8UhjxThTBTxSGPFOFMFOFIB1KKSnCgY4U4U0U4UgHCloFLSGFBpaQ0ANJppNDGo2amIRzVdzT3eq7tVpEtjWPNMpSaSrJFpRSU9RSAAKeBQop4WkMQCnAU4LTgtK4xuKcBS4oFIY8Cn4pq08UhhSEUtITSATFNK06lpgRkVGwqY1GwpoRA1QsOanYVEwqiWREU0ipCKYRTERkUhFSYpMUwG4pMVLtpNtFwI8UoFPxQFoAQClApwFLikMbilFOxShaQCAUuKdtoIpDImFRMKmaoWpoTImqI1K1RtVCI2qM1I1MNMQ2mmnU3FMAoxRilxQA3FKBS0oFAABS4pQKUCpYxQKXFKBSgUhjcUhp+KaaAGEUw081ExoAQmmE0MajLVVhXH5pCaZuppaiwXHE0hNNLUwmmIGNRk0rGoyaYCGmk0pNNNAhKaaU000ABpKKKACkoooGc8KcKaKeBWhAopaQU6gBRThTRTgKQDhThTRTxQA4U4U0U8UDFFPFNAp4oAcKcKaKeKQCgU4UgpwoActPFMFPFIBwpQKQU8UDHCnCkFOFADhThSCnCkAoFOFIBTgKAHClpBTgKAFFOFIBThQA4U4U0U8UhjhThTRTxSAeKeKYtPFAx4p4pgp4pAPFSCoxTxSGPFPFMFOFIZIKcKYKeKQx4pwpgpwpAOp1NpRSAcKcKaKUUhkgp1MFPFIYtIaWkNAET1Xdqneqz1aJZEzVGac1Mq0QJRRRTAUVIopgp60hkiipFWmLUq1LGhwWnYpwoNSURmm08im4piHA07NMpc0gHZppNITSZosA7NOzUeaXNFgHmo2pc0hoAjYVEwqY0wiqQiAimEVMRTStMRHilC08LUirRcLEYSgpVgJQUpXHYq7KNtTlKNlO4WIgtG2pttG2lcLEQWnBaftoouOw3FNapTUTUAQvULVK9RNVIlkTVG1SNUZpiIzTTTzTDTENpMU7FGKAG4oxTsUuKAGgUuKdilAoGIBTgKUCnAUhiYpcU4CjFIBpFMNSGo2oAiY1AzVK5quxqkJjWamE0MaYTVEik00tTSaaTQA4tTCaQmmk0AITTSaUmmmgApDQTSUwENNNONJQA2ilpKAEopaSkM58U4U0U4VoQOFLSCnCgBQKeKaKcKQCinim04UAPFOFNFOFAxwpwpop4pAOFPFNFPFAAKdSCnAUAKKkFMAp4FIY4CniminigBwp1NFOAoAcKcKQCnAUgHCnCmgU8CgBQKdSAU4UhiinAUgpwFACinimingUAKKeKQU4CkA4CniminigY4U8U0U4UgHCnimCnikMeKcKYKdSAeKeKYKeKQx4p1MFPFIYop1NpaQDhThTAacKBjxTgaYDSg0gJKQ0gNBPFIZG9VnFWHNQkVaJZARTCKnIqNhVEkWKKdikxTEAp4ptKKAJAalVqgFSKaRSLKtTs5qBTUgNSxilUmKdmkNIY2iloxTEJSU7FGKAGGjNKRTaADNGaSimIWkxRSikMYVpNlTYpNtFwIglPVadinAUXCwoWl20oFOAqRkRSm7anK03bRcLEW2kxUhFNIpgMxSU4ikNMQwmomNSNUbCmgIWqJqmIqMiqJIGqM1MwqMimIiNIRUhFNIpiI6WlxRigBMU4CjFOAoGAFLinAUuKQxoFKBTsUYpAGKSlopDGGonqY1C9NCK8hquxqeSq7VaJZGaYacaYaYhDTCaU000wENIaKQ0AJTTS0lACUUUlABSUtJQAUlLSUgCkNLSGgZzwp1IKcBVkCinCkFOFADhTxTBThQA8CnCminCgBwpwpBThQMcBThTRTxSAcKcKQU4UAKBTwKaKeKQCgU8U0U8UDHAU4U0U8UAKKeKaKcKAHCnimgU4CkA4U4U0U4CgBwp1IBTxSGAFPAqMyKvU0C4T1oAmApwFMWRW6GpQKAFFOFIBTgKQxwp4popwpAOFOFIKcKQDhThSCnCgYop1IKcKQDhThTRThSGOFPpgpwpDHClptLmgB1LSCigBwNOBplGaQEmaC1MzSE0WGDGozSk0wmqRIGozTiaaaYhuKTFLS4piG4pcUUuKBgKcKbThSAkWng1GKeKTGPopKUUhi0uKAKcBSATFGKdilxSuMjIpMVLimkUwG4pMU/FGKLgMxSgUuKUCkMUCnCkAp2KljFApcUoFKBSuMbikp+KaaAGEUw081ExoAQmmE0MajLVVhXH5pCaZuppaiwXHE0hNNLUwmmIGNRk0rGoyaYCGmk0pNNNAhKaaU000ABpKKKACkoooGc8KcKaKeBWhAopaQU6gBRThTRTgKQDhThTRTxQA4U4U0U8UDFFPFNAp4oAcKcKaKeKQCgU4UgpwoActPFMFPFIBwpQKQU8UDHCnCkFOFADhThSCnCkAoFOFIBTgKAHClpBTgKAFFOFIBThQA4U4U0U8UhjhThTRTxSAeKeKYtPFAx4p4pgp4pAPFSCoxTxSGPFPFMFOFIZIKcKYKeKQx4pwpgpwpAOp1NpRSAcKcKaKUUhkgp1MFPFIYtIaWkNAET1Xdqneqz1aJZEzVGac1Mq0QJRRRTAUVIopgp60hkiipFWmLUq1LGhwWnYpwoNSURmm08im4piHA07NMpc0gHZppNITSZosA7NOzUeaXNFgHmo2pc0hoAjYVEwqY0wiqQiAimEVMRTStMRHilC08LUirRcLEYSgpVgJQUpXHYq7KNtTlKNlO4WIgtG2pttG2lcLEQWnBaftoouOw3FNapTUTUAQvULVK9RNVIlkTVG1SNUZpiIzTTTzTDTENpMU7FGKAG4oxTsUuKAGgUuKdilAoGIBTgKUCnAUhiYpcU4CjFIBpFMNSGo2oAiY1AzVK5quxqkJjWamE0MaYTVEik00tTSaaTQA4tTCaQmmk0AITTSaUmmmgApDQTSUwENNNONJQA2ilpKAEopaSkM58U4U0U4VoQOFLSCnCgBQKeKaKcKQCinim04UAPFOFNFOFAxwpwpop4pAOFPFNFPFAAKdSCnAUAKKkFMAp4FIY4CniminigBwp1NFOAoAcKcKQCnAUgHCnCmgU8CgBQKdSAU4UhiinAUgpwFACinimingUAKKeKQU4CkA4CniminigY4U8U0U4UgHCnimCnikMeKcKYKdSAeKeKYKeKQx4p1MFPFIYop1NpaQDhThTAacKBjxTgaYDSg0gJKQ0gNBPFIZG9VnFWHNQkVaJZARTCKnIqNhVEkWKKdikxTEAp4ptKKAJAalVqgFSKaRSLKtTs5qBTUgNSxilUmKdmkNIY2iloxTEJSU7FGKAGGjNKRTaADNGaSimIWkxRSikMYVpNlTYpNtFwIglPVadinAUXCwoWl20oFOAqRkRSm7anK03bRcLEW2kxUhFNIpgMxSU4ikNMQwmomNSNUbCmgIWqJqmIqMiqJIGqM1MwqMimIiNIRUhFNIpiI6WlxRigBMU4CjFOAoGAFLinAUuKQxoFKBTsUYpAGKSlopDGGonqY1C9NCK8hquxqeSq7VaJZGaYacaYaYhDTCaU000wENIaKQ0AJTTS0lACUUUlABSUtJQAUlLSUgCkNLSGgZzwp1IKcBVkCinCkFOFADhTxTBThQA8CnCminCgBwpwpBThQMcBThTRTxSAcKcKQU4UAKBTwKaKeKQCgU8U0U8UDHAU4U0U8UAKKeKaKcKAHCnimgU4CkA4U4U0U4CgBwp1IBTxSGAFPAqMyKvU0C4T1oAmApwFMWRW6GpQKAFFOFIBTgKQxwp4popwpAOFOFIKcKQDhThSCnCgYop1IKcKQDhThTRThSGOFPpgpwpDHClptLmgB1LSCigBwNOBplGaQEmaC1MzSE0WGDGozSk0wmqRIGozTiaaaYhuKTFLS4piG4pcUUuKBgKcKbThSAkWng1GKeKTGPopKUUhi0uKAKcBSATFGKdilxSuMjIpMVLimkUwG4pMU/FGKLgMxSgUuKUCkMUCnCkAp2KljFApcUoFKBSuMbikp+KaaAGEUw081ExoAQmmE0MajLVVhXH5pCaZuppaiwXHE0hNNLUwmmIGNRk0rGoyaYCGmk0pNNNAhKaaU000ABpKKKACkoooGc8KcKaKeBWhAopaQU6gBRThTRTgKQDhThTRTxQA4U4U0U8UDFFPFNAp4oAcKcKaKeKQCgU4UgpwoActPFMFPFIBwpQKQU8UDHCnCkFOFADhThSCnCkAoFOFIBTgKAHClpBTgKAFFOFIBThQA4U4U0U8UhjhThTRTxSAeKeKYtPFAx4p4pgp4pAPFSCoxTxSGPFPFMFOFIZIKcKYKeKQx4pwpgpwpAOp1NpRSAcKcKaKUUhkgp1MFPFIYtIaWkNAET1Xdqneqz1aJZEzVGac1Mq0QJRRRTAUVIopgp60hkiipFWmLUq1LGhwWnYpwoNSURmm08im4piHA07NMpc0gHZppNITSZosA7NOzUeaXNFgHmo2pc0hoAjYVEwqY0wiqQiAimEVMRTStMRHilC08LUirRcLEYSgpVgJQUpXHYq7KNtTlKNlO4WIgtG2pttG2lcLEQWnBaftoouOw3FNapTUTUAQvULVK9RNVIlkTVG1SNUZpiIzTTTzTDTENpMU7FGKAG4oxTsUuKAGgUuKdilAoGIBTgKUCnAUhiYpcU4CjFIBpFMNSGo2oAiY1AzVK5quxqkJjWamE0MaYTVEik00tTSaaTQA4tTCaQmmk0AITTSaUmmmgApDQTSUwENNNONJQA2ilpKAEopaSkM58U4U0U4VoQOFLSCnCgBQKeKaKcKQCinim04UAPFOFNFOFAxwpwpop4pAOFPFNFPFAAKdSCnAUAKKkFMAp4FIY4CniminigBwp1NFOAoAcKcKQCnAUgHCnCmgU8CgBQKdSAU4UhiinAUgpwFACinimingUAKKeKQU4CkA4CniminigY4U8U0U4UgHCnimCnikMeKcKYKdSAeKeKYKeKQx4p1MFPFIYop1NpaQDhThTAacKBjxTgaYDSg0gJKQ0gNBPFIZG9VnFWHNQkVaJZARTCKnIqNhVEkWKKdikxTEAp4ptKKAJAalVqgFSKaRSLKtTs5qBTUgNSxilUmKdmkNIY2iloxTEJSU7FGKAGGjNKRTaADNGaSimIWkxRSikMYVpNlTYpNtFwIglPVadinAUXCwoWl20oFOAqRkRSm7anK03bRcLEW2kxUhFNIpgMxSU4ikNMQwmomNSNUbCmgIWqJqmIqMiqJIGqM1MwqMimIiNIRUhFNIpiI6WlxRigBMU4CjFOAoGAFLinAUuKQxoFKBTsUYpAGKSlopDGGonqY1C9NCK8hquxqeSq7VaJZGaYacaYaYhDTCaU000wENIaKQ0AJTTS0lACUUUlABSUtJQAUlLSUgCkNLSGgZzwp1IKcBVkCinCkFOFADhTxTBThQA8CnCminCgBwpwpBThQMcBThTRTxSAcKcKQU4UAKBTwKaKeKQCgU8U0U8UDHAU4U0U8UAKKeKaKcKAHCnimgU4CkA4U4U0U4CgBwp1IBTxSGAFPAqMyKvU0C4T1oAmApwFMWRW6GpQKAFFOFIBTgKQxwp4popwpAOFOFIKcKQDhThSCnCgYop1IKcKQDhThTRThSGOFPpgpwpDHClptLmgB1LSCigBwNOBplGaQEmaC1MzSE0WGDGozSk0wmqRIGozTiaaaYhuKTFLS4piG4pcUUuKBgKcKbThSAkWng1GKeKTGPopKUUhi0uKAKcBSATFGKdilxSuMjIpMVLimkUwG4pMU/FGKLgMxSgUuKUCkMUCnCkAp2KljFApcUoFKBSuMbikp+KaaAGEUw081ExoAQmmE0MajLVVhXH5pCaZuppaiwXHE0hNNLUwmmIGNRk0rGoyaYCGmk0pNNNAhKaaU000ABpKKKACkoooGc8KcKaKeBWhAopaQU6gBRThTRTgKQDhThTRTxQA4U4U0U8UDFFPFNAp4oAcKcKaKeKQCgU4UgpwoActPFMFPFIBwpQKQU8UDHCnCkFOFADhThSCnCkAoFOFIBTgKAHClpBTgKAFFOFIBThQA4U4U0U8UhjhThTRTxSAeKeKYtPFAx4p4pgp4pAPFSCoxTxSGPFPFMFOFIZIKcKYKeKQx4pwpgpwpAOp1NpRSAcKcKaKUUhkgp1MFPFIYtIaWkNAET1Xdqneqz1aJZEzVGac1Mq0QJRRRTAUVIopgp60hkiipFWmLUq1LGhwWnYpwoNSURmm08im4piHA07NMpc0gHZppNITSZosA7NOzUeaXNFgHmo2pc0hoAjYVEwqY0wiqQiAimEVMRTStMRHilC08LUirRcLEYSgpVgJQUpXHYq7KNtTlKNlO4WIgtG2pttG2lcLEQWnBaftoouOw3FNapTUTUAQvULVK9RNVIlkTVG1SNUZpiIzTTTzTDTENpMU7FGKAG4oxTsUuKAGgUuKdilAoGIBTgKUCnAUhiYpcU4CjFIBpFMNSGo2oAiY1AzVK5quxqkJjWamE0MaYTVEik00tTSaaTQA4tTCaQmmk0AITTSaUmmmgApDQTSUwENNNONJQA2ilpKAEopaSkM58U4U0U4VoQOFLSCnCgBQKeKaKcKQCinim04UAPFOFNFOFAxwpwpop4pAOFPFNFPFAAKdSCnAUAKKkFMAp4FIY4CniminigBwp1NFOAoAcKcKQCnAUgHCnCmgU8CgBQKdSAU4UhiinAUgpwFACinimingUAKKeKQU4CkA4CniminigY4U8U0U4UgHCnimCnikMeKcKYKdSAeKeKYKeKQx4p1MFPFIYop1NpaQDhThTAacKBjxTgaYDSg0gJKQ0gNBPFIZG9VnFWHNQkVaJZARTCKnIqNhVEkWKKdikxTEAp4ptKKAJAalVqgFSKaRSLKtTs5qBTUgNSxilUmKdmkNIY2iloxTEJSU7FGKAGGjNKRTaADNGaSimIWkxRSikMYVpNlTYpNtFwIglPVadinAUXCwoWl20oFOAqRkRSm7anK03bRcLEW2kxUhFNIpgMxSU4ikNMQwmomNSNUbCmgIWqJqmIqMiqJIGqM1MwqMimIiNIRUhFNIpiI6WlxRigBMU4CjFOAoGAFLinAUuKQxoFKBTsUYpAGKSlopDGGonqY1C9NCK8hquxqeSq7VaJZGaYacaYaYhDTCaU000wENIaKQ0AJTTS0lACUUUlABSUtJQAUlLSUgCkNLSGgZzwp1IKcBVkCinCkFOFADhTxTBThQA8CnCminCgBwpwpBThQMcBThTRTxSAcKcKQU4UAKBTwKaKeKQCgU8U0U8UDHAU4U0U8UAKKeKaKcKAHCnimgU4CkA4U4U0U4CgBwp1IBTxSGAFPAqMyKvU0C4T1oAmApwFMWRW6GpQKAFFOFIBTgKQxwp4popwpAOFOFIKcKQDhThSCnCgYop1IKcKQDhThTRThSGOFPpgpwpDHClptLmgB1LSCigBwNOBplGaQEmaC1MzSE0WGDGozSk0wmqRIGozTiaaaYhuKTFLS4piG4pcUUuKBgKcKbThSAkWng1GKeKTGPopKUUhi0uKAKcBSATFGKdilxSuMjIpMVLimkUwG4pMU/FGKLgMxSgUuKUCkMUCnCkAp2KljFApcUoFKBSuMbikp+KaaAGEUw081ExoAQmmE0MajLVVhXH5pCaZuppaiwXHE0hNNLUwmmIGNRk0rGoyaYCGmk0pNNNAhKaaU000ABpKKKACkoooGc8KcKaKeBWhAopaQU6gBRThTRTgKQDhThTRTxQA4U4U0U8UDFFPFNAp4oAcKcKaKeKQCgU4UgpwoActPFMFPFIBwpQKQU8UDHCnCkFOFADhThSCnCkAoFOFIBTgKAHClpBTgKAFFOFIBThQA4U4U0U8UhjhThTRTxSAeKeKYtPFAx4p4pgp4pAPFSCoxTxSGPFPFMFOFIZIKcKYKeKQx4pwpgpwpAOp1NpRSAcKcKaKUUhkgp1MFPFIYtIaWkNAET1Xdqneqz1aJZEzVGac1Mq0QJRRRTAUVIopgp60hkiipFWmLUq1LGhwWnYpwoNSURmm08im4piHA07NMpc0gHZppNITSZosA7NOzUeaXNFgHmo2pc0hoAjYVEwqY0wiqQiAimEVMRTStMRHilC08LUirRcLEYSgpVgJQUpXHYq7KNtTlKNlO4WIgtG2pttG2lcLEQWnBaftoouOw3FNapTUTUAQvULVK9RNVIlkTVG1SNUZpiIzTTTzTDTENpMU7FGKAG4oxTsUuKAGgUuKdilAoGIBTgKUCnAUhiYpcU4CjFIBpFMNSGo2oAiY1AzVK5quxqkJjWamE0MaYTVEik00tTSaaTQA4tTCaQmmk0AITTSaUmmmgApDQTSUwENNNONJQA2ilpKAEopaSkM58U4U0U4VoQOFLSCnCgBQKeKaKcKQCinim04UAPFOFNFOFAxwpwpop4pAOFPFNFPFAAKdSCnAUAKKkFMAp4FIY4CniminigBwp1NFOAoAcKcKQCnAUgHCnCmgU8CgBQKdSAU4UhiinAUgpwFACinimingUAKKeKQU4CkA4CniminigY4U8U0U4UgHCnimCnikMeKcKYKdSAeKeKYKeKQx4p1MFPFIYop1NpaQDhThTAacKBjxTgaYDSg0gJKQ0gNBPFIZG9VnFWHNQkVaJZARTCKnIqNhVEkWKKdikxTEAp4ptKKAJAalVqgFSKaRSLKtTs5qBTUgNSxilUmKdmkNIY2iloxTEJSU7FGKAGGjNKRTaADNGaSimIWkxRSikMYVpNlTYpNtFwIglPVadinAUXCwoWl20oFOAqRkRSm7anK03bRcLEW2kxUhFNIpgMxSU4ikNMQwmomNSNUbCmgIWqJqmIqMiqJIGqM1MwqMimIiNIRUhFNIpiI6WlxRigBMU4CjFOAoGAFLinAUuKQxoFKBTsUYpAGKSlopDGGonqY1C9NCK8hquxqeSq7VaJZGaYacaYaYhDTCaU000wENIaKQ0AJTTS0lACUUUlABSUtJQAUlLSUgCkNLSGgZzwp1IKcBVkCinCkFOFADhTxTBThQA8CnCminCgBwpwpBThQMcBThTRTxSAcKcKQU4UAKBTwKaKeKQCgU8U0U8UDHAU4U0U8UAKKeKaKcKAHCnimgU4CkA4U4U0U4CgBwp1IBTxSGAFPAqMyKvU0C4T1oAmApwFMWRW6GpQKAFFOFIBTgKQxwp4popwpAOFOFIKcKQDhThSCnCgYop1IKcKQDhThTRThSGOFPpgpwpDHClptLmgB1LSCigBwNOBplGaQEmaC1MzSE0WGDGozSk0wmqRIGozTiaaaYhuKTFLS4piG4pcUUuKBgKcKbThSAkWng1GKeKTGPopKUUhi0uKAKcBSATFGKdilxSuMjIpMVLimkUwG4pMU/FGKLgMxSgUuKUCkMUCnCkAp2KljFApcUoFKBSuMbikp+KaaAGEUw081ExoAQmmE0MajLVVhXH5pCaZuppaiwXHE0hNNLUwmmIGNRk0rGoyaYCGmk0pNNNAhKaaU000ABpKKKACkoooGc8KcKaKeBWhAopaQU6gBRThTRTgKQDhThTRTxQA4U4U0U8UDFFPFNAp4oAcKcKaKeKQCgU4UgpwoActPFMFPFIBwpQKQU8UDHCnCkFOFADhThSCnCkAoFOFIBTgKAHClpBTgKAFFOFIBThQA4U4U0U8UhjhThTRTxSAeKeKYtPFAx4p4pgp4pAPFSCoxTxSGPFPFMFOFIZIKcKYKeKQx4pwpgpwpAOp1NpRSAcKcKaKUUhkgp1MFPFIYtIaWkNAET1Xdqneqz1aJZEzVGac1Mq0QJRRRTAUVIopgp60hkiipFWmLUq1LGhwWnYpwoNSURmm08im4piHA07NMpc0gHZppNITSZosA7NOzUeaXNFgHmo2pc0hoAjYVEwqY0wiqQiAimEVMRTStMRHilC08LUirRcLEYSgpVgJQUpXHYq7KNtTlKNlO4WIgtG2pttG2lcLEQWnBaftoouOw3FNapTUTUAQvULVK9RNVIlkTVG1SNUZpiIzTTTzTDTENpMU7FGKAG4oxTsUuKAGgUuKdilAoGIBTgKUCnAUhiYpcU4CjFIBpFMNSGo2oAiY1AzVK5quxqkJjWamE0MaYTVEik00tTSaaTQA4tTCaQmmk0AITTSaUmmmgApDQTSUwENNNONJQA2ilpKAEopaSkM58U4U0U4VoQOFLSCnCgBQKeKaKcKQCinim04UAPFOFNFOFAxwpwpop4pAOFPFNFPFAAKdSCnAUAKKkFMAp4FIY4CniminigBwp1NFOAoAcKcKQCnAUgHCnCmgU8CgBQKdSAU4UhiinAUgpwFACinimingUAKKeKQU4CkA4CniminigY4U8U0U4UgHCnimCnikMeKcKYKdSAeKeKYKeKQx4p1MFPFIYop1NpaQDhThTAacKBjxTgaYDSg0gJKQ0gNBPFIZG9VnFWHNQkVaJZARTCKnIqNhVEkWKKdikxTEAp4ptKKAJAalVqgFSKaRSLKtTs5qBTUgNSxilUmKdmkNIY2iloxTEJSU7FGKAGGjNKRTaADNGaSimIWkxRSikMYVpNlTYpNtFwIglPVadinAUXCwoWl20oFOAqRkRSm7anK03bRcLEW2kxUhFNIpgMxSU4ikNMQwmomNSNUbCmgIWqJqmIqMiqJIGqM1MwqMimIiNIRUhFNIpiI6WlxRigBMU4CjFOAoGAFLinAUuKQxoFKBTsUYpAGKSlopDGGonqY1C9NCK8hquxqeSq7VaJZGaYacaYaYhDTCaU000wENIaKQ0AJTTS0lACUUUlABSUtJQAUlLSUgCkNLSGgZzwp1IKcBVkCinCkFOFADhTxTBThQA8CnCminCgBwpwpBThQMcBThTRTxSAcKcKQU4UAKBTwKaKeKQCgU8U0U8UDHAU4U0U8UAKKeKaKcKAHCnimgU4CkA4U4U0U4CgBwp1IBTxSGAFPAqMyKvU0C4T1oAmApwFMWRW6GpQKAFFOFIBTgKQxwp4popwpAOFOFIKcKQDhThSCnCgYop1IKcKQDhThTRThSGOFPpgpwpDHClptLmgB1LSCigBwNOBplGaQEmaC1MzSE0WGDGozSk0wmqRIGozTiaaaYhuKTFLS4piG4pcUUuKBgKcKbThSAkWng1GKeKTGPopKUUhi0uKAKcBSATFGKdilxSuMjIpMVLimkUwG4pMU/FGKLgMxSgUuKUCkMUCnCkAp2KljFApcUoFKBSuMbikp+KaaAGEUw081ExoAQmmE0MajLVVhXH5pCaZuppaiwXHE0hNNLUwmmIGNRk0rGoyaYCGmk0pNNNAhKaaU000ABpKKKACkoooGc8KcKaKeBWhAopaQU6gBRThTRTgKQDhThTRTxQA4U4U0U8UDFFPFNAp4oAcKcKaKeKQCgU4UgpwoActPFMFPFIBwpQKQU8UDHCnCkFOFADhThSCnCkAoFOFIBTgKAHClpBTgKAFFOFIBThQA4U4U0U8UhjhThTRTxSAeKeKYtPFAx4p4pgp4pAPFSCoxTxSGPFPFMFOFIZIKcKYKeKQx4pwpgpwpAOp1NpRSAcKcKaKUUhkgp1MFPFIYtIaWkNAET1Xdqneqz1aJZEzVGac1Mq0QJRRRTAUVIopgp60hkiipFWmLUq1LGhwWnYpwoNSURmm08im4piHA07NMpc0gHZppNITSZosA7NOzUeaXNFgHmo2pc0hoAjYVEwqY0wiqQiAimEVMRTStMRHilC08LUirRcLEYSgpVgJQUpXHYq7KNtTlKNlO4WIgtG2pttG2lcLEQWnBaftoouOw3FNapTUTUAQvULVK9RNVIlkTVG1SNUZpiIzTTTzTDTENpMU7FGKAG4oxTsUuKAGgUuKdilAoGIBTgKUCnAUhiYpcU4CjFIBpFMNSGo2oAiY1AzVK5quxqkJjWamE0MaYTVEik00tTSaaTQA4tTCaQmmk0AITTSaUmmmgApDQTSUwENNNONJQA2ilpKAEopaSkM58U4U0U4VoQOFLSCnCgBQKeKaKcKQCinim04UAPFOFNFOFAxwpwpop4pAOFPFNFPFAAKdSCnAUAKKkFMAp4FIY4CniminigBwp1NFOAoAcKcKQCnAUgHCnCmgU8CgBQKdSAU4UhiinAUgpwFACinimingUAKKeKQU4CkA4CniminigY4U8U0U4UgHCnimCnikMeKcKYKdSAeKeKYKeKQx4p1MFPFIYop1NpaQDhThTAacKBjxTgaYDSg0gJKQ0gNBPFIZG9VnFWHNQkVaJZARTCKnIqNhVEkWKKdikxTEAp4ptKKAJAalVqgFSKaRSLKtTs5qBTUgNSxilUmKdmkNIY2iloxTEJSU7FGKAGGjNKRTaADNGaSimIWkxRSikMYVpNlTYpNtFwIglPVadinAUXCwoWl20oFOAqRkRSm7anK03bRcLEW2kxUhFNIpgMxSU4ikNMQwmomNSNUbCmgIWqJqmIqMiqJIGqM1MwqMimIiNIRUhFNIpiI6WlxRigBMU4CjFOAoGAFLinAUuKQxoFKBTsUYpAGKSlopDGGonqY1C9NCK8hquxqeSq7VaJZGaYacaYaYhDTCaU000wENIaKQ0AJTTS0lACUUUlABSUtJQAUlLSUgCkNLSGgZzwp1IKcBVkCinCkFOFADhTxTBThQA8CnCminCgBwpwpBThQMcBThTRTxSAcKcKQU4UAKBTwKaKeKQCgU8U0U8UDHAU4U0U8UAKKeKaKcKAHCnimgU4CkA4U4U0U4CgBwp1IBTxSGAFPAqMyKvU0C4T1oAmApwFMWRW6GpQKAFFOFIBTgKQxwp4popwpAOFOFIKcKQDhThSCnCgYop1IKcKQDhThTRThSGOFPpgpwpDHClptLmgB1LSCigBwNOBplGaQEmaC1MzSE0WGDGozSk0wmqRIGozTiaaaYhuKTFLS4piG4pcUUuKBgKcKbThSAkWng1GKeKTGPopKUUhi0uKAKcBSATFGKdilxSuMjIpMVLimkUwG4pMU/FGKLgMxSgUuKUCkMUCnCkAp2KljFApcUoFKBSuMbikp+KaaAGEUw081ExoAQmmE0MajLVVhXH5pCaZuppaiwXHE0hNNLUwmmIGNRk0rGoyaYCGmk0pNNNAhKaaU000ABpKKKACkoooGc8KcKaKeBWhAopaQU6gBRThTRTgKQDhThTRTxQA4U4U0U8UDFFPFNAp4oAcKcKaKeKQCgU4UgpwoActPFMFPFIBwpQKQU8UDHCnCkFOFADhThSCnCkAoFOFIBTgKAHClpBTgKAFFOFIBThQA4U4U0U8UhjhThTRTxSAeKeKYtPFAx4p4pgp4pAPFSCoxTxSGPFPFMFOFIZIKcKYKeKQx4pwpgpwpAOp1NpRSAcKcKaKUUhkgp1MFPFIYtIaWkNAET1Xdqneqz1aJZEzVGac1Mq0QJRRRTAUVIopgp60hkiipFWmLUq1LGhwWnYpwoNSURmm08im4piHA07NMpc0gHZppNITSZosA7NOzUeaXNFgHmo2pc0hoAjYVEwqY0wiqQiAimEVMRTStMRHilC08LUirRcLEYSgpVgJQUpXHYq7KNtTlKNlO4WIgtG2pttG2lcLEQWnBaftoouOw3FNapTUTUAQvULVK9RNVIlkTVG1SNUZpiIzTTTzTDTENpMU7FGKAG4oxTsUuKAGgUuKdilAoGIBTgKUCnAUhiYpcU4CjFIBpFMNSGo2oAiY1AzVK5quxqkJjWamE0MaYTVEik00tTSaaTQA4tTCaQmmk0AITTSaUmmmgApDQTSUwENNNONJQA2ilpKAEopaSkM58U4U0U4VoQOFLSCnCgBQKeKaKcKQCinim04UAPFOFNFOFAxwpwpop4pAOFPFNFPFAAKdSCnAUAKKkFMAp4FIY4CniminigBwp1NFOAoAcKcKQCnAUgHCnCmgU8CgBQKdSAU4UhiinAUgpwFACinimingUAKKeKQU4CkA4CniminigY4U8U0U4UgHCnimCnikMeKcKYKdSAeKeKYKeKQx4p1MFPFIYop1NpaQDhThTAacKBjxTgaYDSg0gJKQ0gNBPFIZG9VnFWHNQkVaJZARTCKnIqNhVEkWKKdikxTEAp4ptKKAJAalVqgFSKaRSLKtTs5qBTUgNSxilUmKdmkNIY2iloxTEJSU7FGKAGGjNKRTaADNGaSimIWkxRSikMYVpNlTYpNtFwIglPVadinAUXCwoWl20oFOAqRkRSm7anK03bRcLEW2kxUhFNIpgMxSU4ikNMQwmomNSNUbCmgIWqJqmIqMiqJIGqM1MwqMimIiNIRUhFNIpiI6WlxRigBMU4CjFOAoGAFLinAUuKQxoFKBTsUYpAGKSlopDGGonqY1C9NCK8hquxqeSq7VaJZGaYacaYaYhDTCaU000wENIaKQ0AJTTS0lACUUUlABSUtJQAUlLSUgCkNLSGgZzwp1IKcBVkCinCkFOFADhTxTBThQA8CnCminCgBwpwpBThQMcBThTRTxSAcKcKQU4UAKBTwKaKeKQCgU8U0U8UDHAU4U0U8UAKKeKaKcKAHCnimgU4CkA4U4U0U4CgBwp1IBTxSGAFPAqMyKvU0C4T1oAmApwFMWRW6GpQKAFFOFIBTgKQxwp4popwpAOFOFIKcKQDhThSCnCgYop1IKcKQDhThTRThSGOFPpgpwpDHClptLmgB1LSCigBwNOBplGaQEmaC1MzSE0WGDGozSk0wmqRIGozTiaaaYhuKTFLS4piG4pcUUuKBgKcKbThSAkWng1GKeKTGPopKUUhi0uKAKcBSATFGKdilxSuMjIpMVLimkUwG4pMU/FGKLgMxSgUuKUCkMUCnCkAp2KljFApcUoFKBSuMbikp+KaaAGEUw081ExoAQmmE0MajLVVhXH5pCaZuppaiwXHE0hNNLUwmmIGNRk0rGoyaYCGmk0pNNNAhKaaU000ABpKKKACkoooGc8KcKaKeBWhAopaQU6gBRThTRTgKQDhThTRTxQA4U4U0U8UDFFPFNAp4oAcKcKaKeKQCgU4UgpwoActPFMFPFIBwpQKQU8UDHCnCkFOFADhThSCnCkAoFOFIBTgKAHClpBTgKAFFOFIBThQA4U4U0U8UhjhThTRTxSAeKeKYtPFAx4p4pgp4pAPFSCoxTxSGPFPFMFOFIZIKcKYKeKQx4pwpgpwpAOp1NpRSAcKcKaKUUhkgp1MFPFIYtIaWkNAET1Xdqneqz1aJZEzVGac1Mq0QJRRRTAUVIopgp60hkiipFWmLUq1LGhwWnYpwoNSURmm08im4piHA07NMpc0gHZppNITSZosA7NOzUeaXNFgHmo2pc0hoAjYVEwqY0wiqQiAimEVMRTStMRHilC08LUirRcLEYSgpVgJQUpXHYq7KNtTlKNlO4WIgtG2pttG2lcLEQWnBaftoouOw3FNapTUTUAQvULVK9RNVIlkTVG1SNUZpiIzTTTzTDTENpMU7FGKAG4oxTsUuKAGgUuKdilAoGIBTgKUCnAUhiYpcU4CjFIBpFMNSGo2oAiY1AzVK5quxqkJjWamE0MaYTVEik00tTSaaTQA4tTCaQmmk0AITTSaUmmmgApDQTSUwENNNONJQA2ilpKAEopaSkM58U4U0U4VoQOFLSCnCgBQKeKaKcKQCinim04UAPFOFNFOFAxwpwpop4pAOFPFNFPFAAKdSCnAUAKKkFMAp4FIY4CniminigBwp1NFOAoAcKcKQCnAUgHCnCmgU8CgBQKdSAU4UhiinAUgpwFACinimingUAKKeKQU4CkA4CniminigY4U8U0U4UgHCnimCnikMeKcKYKdSAeKeKYKeKQx4p1MFPFIYop1NpaQDhThTAacKBjxTgaYDSg0gJKQ0gNBPFIZG9VnFWHNQkVaJZARTCKnIqNhVEkWKKdikxTEAp4ptKKAJAalVqgFSKaRSLKtTs5qBTUgNSxilUmKdmkNIY2iloxTEJSU7FGKAGGjNKRTaADNGaSimIWkxRSikMYVpNlTYpNtFwIglPVadinAUXCwoWl20oFOAqRkRSm7anK03bRcLEW2kxUhFNIpgMxSU4ikNMQwmomNSNUbCmgIWqJqmIqMiqJIGqM1MwqMimIiNIRUhFNIpiI6WlxRigBMU4CjFOAoGAFLinAUuKQxoFKBTsUYpAGKSlopDGGonqY1C9NCK8hquxqeSq7VaJZGaYacaYaYhDTCaU000wENIaKQ0AJTTS0lACUUUlABSUtJQAUlLSUgCkNLSGgZzwp1IKcBVkCinCkFOFADhTxTBThQA8CnCminCgBwpwpBThQMcBThTRTxSAcKcKQU4UAKBTwKaKeKQCgU8U0U8UDHAU4U0U8UAKKeKaKcKAHCnimgU4CkA4U4U0U4CgBwp1IBTxSGAFPAqMyKvU0C4T1oAmApwFMWRW6GpQKAFFOFIBTgKQxwp4popwpAOFOFIKcKQDhThSCnCgYop1IKcKQDhThTRThSGOFPpgpwpDHClptLmgB1LSCigBwNOBplGaQEmaC1MzSE0WGDGozSk0wmqRIGozTiaaaYhuKTFLS4piG4pcUUuKBgKcKbThSAkWng1GKeKTGPopKUUhi0uKAKcBSATFGKdilxSuMjIpMVLimkUwG4pMU/FGKLgMxSgUuKUCkMUCnCkAp2KljFApcUoFKBSuMbikp+KaaAGEUw081ExoAQmmE0MajLVVhXH5pCaZuppaiwXHE0hNNLUwmmIGNRk0rGoyaYCGmk0pNNNAhKaaU000ABpKKKACkoooGc8KcKaKeBWhAopaQU6gBRThTRTgKQDhThTRTxQA4U4U0U8UDFFPFNAp4oAcKcKaKeKQCgU4UgpwoActPFMFPFIBwpQKQU8UDHCnCkFOFADhThSCnCkAoFOFIBTgKAHClpBTgKAFFOFIBThQA4U4U0U8UhjhThTRTxSAeKeKYtPFAx4p4pgp4pAPFSCoxTxSGPFP" 
          alt={nft?.metadata.name}
          className="w-full h-auto rounded-lg mb-4"
        />
        <p className="mt-2 text-lg font-semibold text-white">{nft?.metadata.name}</p>
      </div>
    );
  };

  const tokenizationSteps = [
    {
      title: "Defining the Asset",
      content: "We help define your film IP for tokenization, including distribution rights, streaming rights, and merchandising opportunities."
    },
    {
      title: "Legal Framework",
      content: "Our platform ensures compliance with securities laws and regulations across multiple jurisdictions."
    },
    {
      title: "Blockchain Integration",
      content: "We utilize advanced blockchain technology for secure, transparent token creation and management."
    },
    {
      title: "Token Creation & Distribution",
      content: "Create and distribute digital tokens representing shares in your film's IP and future revenue."
    },
    {
      title: "Revenue Management",
      content: "Automated smart contracts handle revenue distribution to token holders based on predefined terms."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#403E43] to-[#221F26] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
            Welcome to Holocene Films IP marketplace
          </h1>
          <p className="text-xl text-purple-200 mb-8">
            Revolutionizing film financing through blockchain technology and IP tokenization
          </p>
          <div className="space-x-4 mb-12">
            <Button asChild className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-none">
              <Link to="/marketplace">Explore Marketplace</Link>
            </Button>
            <Button asChild variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10">
              <Link to="/signup">Join as Filmmaker</Link>
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-lg p-8 rounded-xl shadow-2xl border border-purple-500/20">
            <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Featured Film IP
            </h2>
            {renderNFTContent()}
          </div>

          <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-lg p-8 rounded-xl shadow-2xl border border-purple-500/20">
            <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Why Choose Film IP Tokenization?
            </h2>
            <p className="text-purple-200 mb-6">
              Transform your film's intellectual property into digital assets on the blockchain, enabling new ways of fundraising and investment management in the film industry.
            </p>
            <Accordion type="single" collapsible className="w-full">
              {tokenizationSteps.map((step, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-purple-300 hover:text-purple-200">
                    {step.title}
                  </AccordionTrigger>
                  <AccordionContent className="text-purple-200">
                    {step.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-lg p-8 rounded-xl shadow-2xl border border-purple-500/20 mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            Benefits of Film IP Tokenization
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-purple-800/20 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-purple-300">Democratized Investment</h3>
              <p className="text-purple-200">Enable broader investor participation in film projects through fractional ownership.</p>
            </div>
            <div className="p-6 bg-purple-800/20 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-purple-300">Enhanced Liquidity</h3>
              <p className="text-purple-200">Create secondary markets for film IP tokens, providing investors with trading flexibility.</p>
            </div>
            <div className="p-6 bg-purple-800/20 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-purple-300">Transparent Revenue</h3>
              <p className="text-purple-200">Automated distribution of revenues through smart contracts ensures fairness and transparency.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;