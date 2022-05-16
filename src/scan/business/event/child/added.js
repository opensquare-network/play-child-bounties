const { findBlockApi } = require("../../../../chain/blockApi");

async function handleAdded(event, indexer, extrinsic) {
  const [parentBountyId, childBountyId] = event.data.toJSON();

  const blockApi = await findBlockApi(indexer.blockHash);
  const childBounty = await blockApi.query.childBounties.childBounties(parentBountyId, childBountyId);

  console.log('child', childBounty.toJSON())
}

module.exports = {
  handleAdded,
}
