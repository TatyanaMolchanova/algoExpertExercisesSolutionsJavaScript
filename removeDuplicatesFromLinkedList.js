class LinkedList {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

function removeDuplicatesFromLinkedList(linkedList) {
  if (!linkedList || !linkedList.next) return linkedList;

  let current = linkedList;
  while (current.next) {
    if (current.value === current.next.value) {
        current.next = current.next.next;
    } else {
        current = current.next;
    }
  }
  return linkedList;
}



console.log("", removeDuplicatesFromLinkedList(linkedList))
