export function addToList(list, item) {
  return [...list, item];
}

export function removeFromList(list, item) {
  return list.filter(i => i !== item);
}
