const Modules = Object.freeze({
  ChildBounties: "childBounties",
  Proxy: "proxy",
  Multisig: "multisig",
})

const ChildBountiesEvents = Object.freeze({
  Added: "Added",
  Awarded: "Awarded",
  Claimed: "Claimed",
})

const ChildBountiesMethods = Object.freeze({
  proposeCurator: "proposeCurator",
  acceptCurator: "acceptCurator",
  unassignCurator: "unassignCurator",
});

const MultisigMethods = Object.freeze({
  asMulti: "asMulti",
});

const MultisigEvents = Object.freeze({
  MultisigExecuted: "MultisigExecuted",
});

const ProxyMethods = Object.freeze({
  proxy: "proxy",
});

const ProxyEvents = Object.freeze({
  ProxyExecuted: "ProxyExecuted",
});

module.exports = {
  Modules,
  ChildBountiesEvents,
  ChildBountiesMethods,
  MultisigMethods,
  MultisigEvents,
  ProxyMethods,
  ProxyEvents,
}
