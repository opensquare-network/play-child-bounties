const { handleProposeCurator } = require("./child-bounties/propose-curator");
const { calcMultisigAddress } = require("../../../utils/multisig");
const { findBlockApi } = require("../../../chain/blockApi");
const { EventStatus } = require("./eventStatus");
const { Modules, MultisigMethods, ProxyMethods, MultisigEvents, ProxyEvents, } = require("../../../consts/child");
const { GenericCall } = require("@polkadot/types");

function extractExtrinsicEvents(events, extrinsicIndex) {
  let eventSort = 0;
  let eventSet = false;
  let result = [];
  for (let index = 0; index < events.length; index++) {
    const event = events[index];
    const { phase } = event;
    if (phase.isNull) {
      continue
    }

    const phaseValue = phase.value.toNumber();
    if (phaseValue === extrinsicIndex) {
      result.push(event);
      if (!eventSet) {
        eventSort = index;
        eventSet = true;
      }
    } else if (phaseValue > extrinsicIndex) {
      break;
    }
  }

  return new EventStatus(result, eventSort, true)
}

function isExtrinsicSuccess(events) {
  return events.some((e) => e.event.method === "ExtrinsicSuccess");
}

async function handleCall(call, author, extrinsicIndexer, eventStatus) {
  await handleProposeCurator(...arguments)
}

async function unwrapProxy(call, signer, extrinsicIndexer, eventStatus) {
  const real = call.args[0].toJSON();
  const innerCall = call.args[2];

  // todo: check whether executed successfully
  const innerCallEventStatus = eventStatus.filterWithSuffixEvent(Modules.Proxy, ProxyEvents.ProxyExecuted);
  await handleWrappedCall(innerCall, real, extrinsicIndexer, innerCallEventStatus);
}

async function handleMultisig(call, signer, extrinsicIndexer, eventStatus) {
  const blockApi = await findBlockApi(extrinsicIndexer.blockHash);
  const callHex = call.args[3];
  const threshold = call.args[0].toNumber();
  const otherSignatories = call.args[1].toJSON();

  const multisigAddr = calcMultisigAddress(
    [signer, ...otherSignatories],
    threshold,
    blockApi.registry.chainSS58
  );

  const innerCall = new GenericCall(blockApi.registry, callHex);

  // todo: check whether executed successfully
  const innerCallEventStatus = eventStatus.filterWithSuffixEvent(Modules.Multisig, MultisigEvents.MultisigExecuted);
  await handleWrappedCall(innerCall, multisigAddr, extrinsicIndexer, innerCallEventStatus);
}

async function handleWrappedCall(call, signer, extrinsicIndexer, eventStatus) {
  const { section, method } = call;

  if (Modules.Proxy === section && ProxyMethods.proxy === method) {
    await unwrapProxy(...arguments);
  } else if (
    Modules.Multisig === section &&
    MultisigMethods.asMulti === method
  ) {
    await handleMultisig(...arguments);
  }

  await handleCall(...arguments);
}

async function extractAndHandleCall(extrinsic, eventStatus, extrinsicIndexer) {
  const signer = extrinsic.signer.toString();
  const call = extrinsic.method;

  await handleWrappedCall(call, signer, extrinsicIndexer, eventStatus);
}

async function handleExtrinsics(extrinsics = [], allEvents = [], blockIndexer) {
  let index = 0;

  for (const extrinsic of extrinsics) {
    const eventStatus = extractExtrinsicEvents(allEvents, index);
    if (!isExtrinsicSuccess(eventStatus.events)) {
      continue;
    }

    const extrinsicIndex = index++;
    const extrinsicIndexer = {
      ...blockIndexer,
      index: extrinsicIndex,
      extrinsicIndex,
    };

    await extractAndHandleCall(extrinsic, eventStatus, extrinsicIndexer);
  }
}

module.exports = {
  handleExtrinsics,
}
