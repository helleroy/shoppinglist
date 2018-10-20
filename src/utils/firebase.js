export function docWithId(doc) {
  return { id: doc.id, ...doc.data() };
}
