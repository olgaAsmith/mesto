export default class Section {
  constructor({renderer}, container) {

    this._renderer = renderer;
    this._container = container;
  }

  renderItems(items, userMe){
    items.forEach((item) => this._renderer(item, userMe))
  }

  addItem(item){
    this._container.append(item);
  }

  addItemBefore(item){
    this._container.prepend(item);
  }
}
