const { findBlockApi } = require("../../../../chain/blockApi");

async function handleClaimed(event, indexer) {
  const [
    parentBountyId,
    childBountyId,
    payout,
    beneficiary,
  ] = event.data.toJSON();

  const blockApi = await findBlockApi(indexer.blockHash);
  const childBounty = await blockApi.query.childBounties.childBounties(parentBountyId, childBountyId);

  console.log('child', childBounty.toJSON()) // it will be null
}

module.exports = {
  handleClaimed,
}
