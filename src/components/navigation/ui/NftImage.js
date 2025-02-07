import React, { useState, useEffect } from "react";

const NftImage = ({
  nft = { contractId: "", tokenId: "" },
  className = "img-fluid",
  style = {},
  alt = "",
  thumbnail = "thumbnail",
  fallbackUrl = "https://ipfs.near.social/ipfs/bafkreidoxgv2w7kmzurdnmflegkthgzaclgwpiccgztpkfdkfzb4265zuu",
  loadingUrl = "https://ipfs.near.social/ipfs/bafkreidoxgv2w7kmzurdnmflegkthgzaclgwpiccgztpkfdkfzb4265zuu",
}) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [contractMetadata, setContractMetadata] = useState(null);
  const [tokenMetadata, setTokenMetadata] = useState(null);

  useEffect(() => {
    // Fetch contract metadata and token metadata
    const fetchMetadata = async () => {
      try {
        const contractMetadataRes = await fetch(`/api/nft_metadata?contractId=${nft.contractId}`);
        const contractMetadataJson = await contractMetadataRes.json();
        setContractMetadata(contractMetadataJson);

        const tokenMetadataRes = await fetch(`/api/nft_token?contractId=${nft.contractId}&tokenId=${nft.tokenId}`);
        const tokenMetadataJson = await tokenMetadataRes.json();
        setTokenMetadata(tokenMetadataJson);
      } catch (error) {
        console.error("Error fetching NFT metadata:", error);
      }
    };

    fetchMetadata();
  }, [nft.contractId, nft.tokenId]);

  useEffect(() => {
    if (contractMetadata && tokenMetadata) {
      let tokenMedia = tokenMetadata.media || "";

      // Logic to build the correct image URL
      let imageUrl = tokenMedia.startsWith("https://") ||
        tokenMedia.startsWith("http://") ||
        tokenMedia.startsWith("data:image")
        ? tokenMedia
        : contractMetadata.base_uri
        ? `${contractMetadata.base_uri}/${tokenMedia}`
        : tokenMedia.startsWith("Qm") || tokenMedia.startsWith("ba")
        ? `https://ipfs.near.social/ipfs/${tokenMedia}`
        : tokenMedia;

      if (!tokenMedia && tokenMetadata.reference) {
        if (
          contractMetadata.base_uri === "https://arweave.net" &&
          !tokenMetadata.reference.startsWith("https://")
        ) {
          const res = fetch(`${contractMetadata.base_uri}/${tokenMetadata.reference}`);
          imageUrl = res.body.media;
        } else if (
          tokenMetadata.reference.startsWith("https://") ||
          tokenMetadata.reference.startsWith("http://")
        ) {
          const res = fetch(tokenMetadata.reference);
          imageUrl = JSON.parse(res.body).media;
        } else if (tokenMetadata.reference.startsWith("ar://")) {
          const res = fetch(
            `${"https://arweave.net"}/${tokenMetadata.reference.split("//")[1]}`
          );
          imageUrl = JSON.parse(res.body).media;
        }
      }

      if (!imageUrl) {
        imageUrl = false;
      }

      setImageUrl(imageUrl);
    }
  }, [contractMetadata, tokenMetadata]);

  // Function to replace IPFS URL
  const replaceIpfs = (imageUrl) => {
    const rex = /^(?:https?:\/\/)(?:[^\/]+\/ipfs\/)?(Qm[1-9A-HJ-NP-Za-km-z]{44,}|b[A-Za-z2-7]{58,}|B[A-Z2-7]{58,}|z[1-9A-HJ-NP-Za-km-z]{48,}|F[0-9A-F]{50,})(?:\.[^\/]+)?(\/.*)?$/g;
    rex.lastIndex = 0;

    if (imageUrl) {
      const match = rex.exec(imageUrl);
      if (match) {
        const newImageUrl = `https://ipfs.near.social/ipfs/${match[1]}${match[2] || ""}`;
        return newImageUrl;
      }
    }

    return imageUrl || false;
  };

  // Create the thumbnail if necessary
  const thumb = (imageUrl) =>
    thumbnail && imageUrl && !imageUrl.startsWith("data:image/")
      ? `https://i.near.social/${thumbnail}/${imageUrl}`
      : imageUrl;

  const img = imageUrl !== null ? imageUrl : fallbackUrl;
  const src = img !== false ? img : fallbackUrl;

  return (
    <img
      className={className}
      style={style}
      src={src !== null ? thumb(src) : loadingUrl}
      alt={alt}
      onError={() => setImageUrl(replaceIpfs(img))}
    />
  );
};

export default NftImage;
