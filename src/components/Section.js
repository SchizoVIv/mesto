export default class Section{
  constructor({renderer}, containerSelector){
    this._renderer = renderer;
    this._container = containerSelector;
  }
  renderer(elements){

    elements.forEach(element => {
      this._renderer(element)
    });
  }
  addItem(element){
    
    this._container.prepend(element);
  }
}
