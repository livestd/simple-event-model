export type ListenerId = string;
export type EventId = string;

export interface Event<A = EventId, T = any> {
  event: A;
  data: T;
}

export interface Listener<A = EventId, T = any> {
  id: ListenerId;
  event: A;
  callback: (event: T) => void;
}

interface EmitterState<A, T> {
  listeners: Listener<A, T>[];
}

export interface Emitter<A, T> extends EmitterState<A, T> {
  listen: (listener: Listener<A, T>) => void;
  forget: (listenerId: ListenerId) => void;
  emit: (event: Event<A, T>) => void;
}

class EmitterModel<A = EventId, T = any> implements Emitter<A, T> {
  listeners: Listener<A, T>[] = [];
  listen = (listener: Listener<A, T>) => {
    this.listeners.push(listener);
  };
  forget = (listenerId: ListenerId) => {
    const lId = this.listeners.findIndex(listener => listener.id === listenerId);
    this.listeners.splice(lId, 1);
  };
  emit = (event: Event<A, T>) => {
    this.listeners
      .filter(listener => listener.event === event.event)
      .forEach(listener => listener.callback(event.data));
  };
}

export default EmitterModel;
