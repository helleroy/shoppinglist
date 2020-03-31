export function addToList<T>(list: Array<T>, item: T): Array<T> {
  return [...list, item];
}

export function removeFromList<T>(list: Array<T>, item: T): Array<T> {
  return list.filter((i) => i !== item);
}

export function moveElementLeft<T>(list: Array<T>, index: number): Array<T> {
  if (index <= 0) {
    return list;
  }
  const listClone = [...list];
  const element = listClone.splice(index, 1)[0];
  listClone.splice(index - 1, 0, element);
  return listClone;
}

export function moveElementRight<T>(list: Array<T>, index: number): Array<T> {
  if (index >= list.length - 1) {
    return list;
  }
  const listClone = [...list];
  const element = listClone.splice(index, 1)[0];
  listClone.splice(index + 1, 0, element);
  return listClone;
}
