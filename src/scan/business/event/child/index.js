const { handleAdded } = require("./added");
const { Modules, ChildBountiesEvents } = require("../../../../consts/child");

function isTargetEvent(section) {
  return section === Modules.ChildBounties;
}

async function handleChildBountiesEvents(event, indexer, extrinsic) {
  const { section, method } = event;
  if (!isTargetEvent(section)) {
    return
  }

  if (ChildBountiesEvents.Added === method) {
    await handleAdded(...arguments);
  }
}

module.exports = {
  handleChildBountiesEvents,
}
