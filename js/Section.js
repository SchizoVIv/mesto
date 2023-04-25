export default class Section{
  constructor({items, renderer}, containerSelector){
    this._items = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }
  renderer(){
    this._items.forEach(element => {
      this._renderer(element)
    });
  }
  addItem(element){
    this._container.prepend(element);
  }
}