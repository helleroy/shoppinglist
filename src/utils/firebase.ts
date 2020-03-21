export function docWithId<T>(
  doc: firebase.firestore.QueryDocumentSnapshot<T>
): { id: string } & T {
  return { id: doc.id, ...doc.data() };
}
