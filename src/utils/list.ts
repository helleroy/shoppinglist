export function addToList<T>(list: Array<T>, item: T): Array<T> {
  return [...list, item];
}

export function removeFromList<T>(list: Array<T>, item: T): Array<T> {
  return list.filter(i => i !== item);
}
