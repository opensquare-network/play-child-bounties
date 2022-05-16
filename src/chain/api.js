const { ApiPromise, WsProvider } = require("@polkadot/api");

let provider = null;
let api = null;

async function getApi() {
  if (api) {
    return api;
  }

  const wsEndpoint = "wss://rpc.polkadot.io";
  provider = new WsProvider(wsEndpoint, 1000);
  let options = { provider };

  api = await ApiPromise.create({
    ...options,
  });

  return api;
}

module.exports = {
  getApi,
}
