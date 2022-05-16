const { scanNormalizedBlock } = require("./scan/block");
const { getApi } = require("./chain/api");

const blockHeights = [
  // 10172818, // child bounty 0 added
  // 10173886, // propose curator
  10178252, // accept curator
];

;(async () => {
  const api = await getApi();

  for (const height of blockHeights) {
    const blockHash = await api.rpc.chain.getBlockHash(height);
    const block = await api.rpc.chain.getBlock(blockHash);
    const allEvents = await api.query.system.events.at(blockHash);

    await scanNormalizedBlock(block.block, allEvents);
  }

  console.log("finished");
  process.exit(0);
})()
