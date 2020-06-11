[![NPM](https://img.shields.io/npm/v/@livestd/simple-event-model.svg)](https://www.npmjs.com/package/@livestd/simple-event-model)

Simple event model

## Installation
```
npm install --save @livestd/simple-event-model
```

## Usage

```js
import EmitterModel from '@livestd/simple-event-model';

enum Events {
  select = 'select'
}
type EventsType = keyof typeof Events;

class Model extends EmitterModel<EventsType> {
  constructor() {
    super();
  }
  listenSelect = (id: string, callback: (value: string) => void) => {
    this.listen({ id: id, event: Events.select, callback: callback });
  };
  emitSelect = (value: string) => {
    this.emit({ event: CategoryEvents.select, data: value });
  };
}

const model = new Model();

model.listenEvent("1", (v) => console.log(v));
model.emitSelect("test")
```