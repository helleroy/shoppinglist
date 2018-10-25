import React, { Component } from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import ShoppingList from "./ShoppingList";

const SortableItem = SortableElement(({ list, user }) => (
  <ShoppingList list={list} signedInUser={user} />
));

const SortableList = SortableContainer(({ items, user }) => (
  <div>
    {items.map((list, index) => (
      <SortableItem key={list.id} index={index} list={list} user={user} />
    ))}
  </div>
));

class ShoppingLists extends Component {
  render() {
    return (
      <SortableList
        items={this.props.items}
        user={this.props.user}
        onSortEnd={this.props.onSortEnd}
        useDragHandle
      />
    );
  }
}

export default ShoppingLists;
