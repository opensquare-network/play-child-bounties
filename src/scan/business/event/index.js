const { handleChildBountiesEvents } = require("./child");

async function handleEvents(events, extrinsics, blockIndexer) {
  if (events.length <= 0) {
    return;
  }

  for (let eventSort = 0; eventSort < events.length; eventSort++) {
    let indexer = {
      ...blockIndexer,
      eventIndex: eventSort,
    };

    const { event, phase } = events[eventSort];
    if (!phase.isNull) {
      const extrinsicIndex = phase.value.toNumber();
      indexer = {
        ...indexer,
        extrinsicIndex,
      };

      const extrinsic = extrinsics[extrinsicIndex];

      await handleChildBountiesEvents(event, indexer, extrinsic);
    }
  }
}

module.exports = {
  handleEvents,
}
