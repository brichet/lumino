/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, S. Chris Colbert
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
module phosphor.widgets {

import IMessage = core.IMessage;

import WidgetFlag = enums.WidgetFlag;

import Size = geometry.Size;

import IElement = virtualdom.IElement;
import render = virtualdom.render;


/**
 * The class name added to element host widgets.
 */
var ELEMENT_HOST_CLASS = 'p-ElementHost';


/**
 * A Widget which hosts a virtual element.
 *
 * This widget can be used to embed an element in a widget hierarchy.
 */
export
class ElementHost extends Widget {
  /**
   * Construct a new console view.
   */
  constructor(element: IElement = null, width = 0, height = 0) {
    super();
    this.classList.add(ELEMENT_HOST_CLASS);
    this.setFlag(WidgetFlag.DisallowLayoutChange);
    width = Math.max(0, width);
    height = Math.max(0, height);
    this._element = element;
    this._preferredSize = new Size(width, height);
  }

  /**
   * Get the virtual element hosted by the widget.
   */
  get element(): IElement {
    return this._element;
  }

  /**
   * Set the virtual element hosted by the widget.
   */
  set element(element: IElement) {
    element = element || null;
    if (element === this._element) {
      return;
    }
    this._element = element;
    render(element, this.node);
  }

  /**
   * Calculate the preferred size of the widget.
   */
  sizeHint(): Size {
    return this._preferredSize;
  }

  /**
   * Set the preferred size for the widget.
   */
  setPreferredSize(width: number, height: number): void {
    width = Math.max(0, width);
    height = Math.max(0, height);
    var old = this._preferredSize;
    if (width === old.width && height === old.height) {
      return;
    }
    this._preferredSize = new Size(width, height);
    this.updateGeometry();
  }

  /**
   * A method invoked on the 'after-attach' event.
   */
  protected afterAttachEvent(event: IMessage): void {
    render(this._element, this.node);
  }

  /**
   * A method invoked on the 'after-detach' event.
   */
  protected afterDetachEvent(event: IMessage): void {
    render(null, this.node);
  }

  private _preferredSize: Size;
  private _element: IElement;
}

} // module phosphor.widgets