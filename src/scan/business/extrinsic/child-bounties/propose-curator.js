const { findBlockApi } = require("../../../../chain/blockApi");
const { Modules, ChildBountiesMethods, } = require("../../../../consts/child");

async function handleProposeCurator(call, author, extrinsicIndexer, eventStatus) {
  if (
    ![Modules.ChildBounties].includes(call.section) ||
    ChildBountiesMethods.proposeCurator !== call.method
  ) {
    return;
  }

  const parentBountyId = call.args[0].toNumber();
  const childBountyId = call.args[1].toNumber();
  const curator = call.args[2].toString();
  const fee = call.args[3].toNumber();

  console.log({
    parentBountyId,
    childBountyId,
    curator,
    fee,
  })

  const blockApi = await findBlockApi(extrinsicIndexer.blockHash);
  const childBounty = await blockApi.query.childBounties.childBounties(parentBountyId, childBountyId);

  console.log('child', childBounty.toJSON())
}

module.exports = {
  handleProposeCurator,
}
