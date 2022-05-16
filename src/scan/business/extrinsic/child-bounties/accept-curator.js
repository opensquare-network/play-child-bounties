const { findBlockApi } = require("../../../../chain/blockApi");
const { Modules, ChildBountiesMethods, } = require("../../../../consts/child");

async function handleAcceptCurator(call, author, extrinsicIndexer, eventStatus) {
  if (
    ![Modules.ChildBounties].includes(call.section) ||
    ChildBountiesMethods.acceptCurator !== call.method
  ) {
    return;
  }

  const parentBountyId = call.args[0].toNumber();
  const childBountyId = call.args[1].toNumber();

  const blockApi = await findBlockApi(extrinsicIndexer.blockHash);
  const childBounty = await blockApi.query.childBounties.childBounties(parentBountyId, childBountyId);

  console.log('child', childBounty.toJSON())
}

module.exports = {
  handleAcceptCurator,
}
