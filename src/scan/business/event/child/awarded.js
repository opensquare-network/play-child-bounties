const { findBlockApi } = require("../../../../chain/blockApi");

async function handleAwarded(event, indexer, extrinsic) {
  const [parentBountyId, childBountyId, beneficiary] = event.data.toJSON();

  console.log({
    parentBountyId,
    childBountyId,
    beneficiary,
  })

  const blockApi = await findBlockApi(indexer.blockHash);
  const childBounty = await blockApi.query.childBounties.childBounties(parentBountyId, childBountyId);

  console.log('child', childBounty.toJSON())
}

module.exports = {
  handleAwarded,
}
