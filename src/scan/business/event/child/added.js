const { findBlockApi } = require("../../../../chain/blockApi");

async function handleAdded(event, indexer, extrinsic) {
  const [parentBountyId, childBountyId] = event.data.toJSON();

  const blockApi = await findBlockApi(indexer.blockHash);
  const childBounty = await blockApi.query.childBounties.childBounties(parentBountyId, childBountyId);

  const descriptions = await blockApi.query.childBounties.childBountyDescriptions(childBountyId);
  console.log('descriptions', descriptions.toHuman());
  console.log('child', childBounty.toJSON())
}

module.exports = {
  handleAdded,
}
