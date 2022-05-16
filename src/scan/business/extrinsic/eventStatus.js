class EventStatus {
  #isWrapped = true;
  #offset = 0;
  #events = [];

  constructor(events = [], offset, wrapped) {
    this.#events = events;
    this.#offset = offset;
    this.#isWrapped = wrapped;
  }

  get events() {
    return this.#events;
  }

  get offset() {
    return this.#offset;
  }

  eventSort(index = 0) {
    return this.#offset + index;
  }

  get wrapped() {
    return this.#isWrapped;
  }

  filterWithSuffixEvent(targetSection, targetMethod) {
    const endIndex = this.#events.findIndex(event => {
      const { event: { section, method } } = event;
      return section === targetSection && method === targetMethod;
    })

    return new EventStatus(this.#events.slice(0, endIndex), this.#offset, this.#isWrapped);
  }
}

module.exports = {
  EventStatus,
}
