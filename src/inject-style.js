const MEDIA_LIST = Symbol();

export class InheritStyle extends HTMLElement {
  static get observedAttributes() {
    return ["namespace"];
  }
  get namespace() {
    return this.getAttribute("namespace");
  }
  set namespace(value) {
    this.setAttribute("namespace", value);
  }
  attributeChangedCallback(name, prev, next) {
    this.isConnected && prev != next && this.connectedCallback();
  }
  connectedCallback() {
    this.disconnectedCallback();
    const { host } = this.parentNode;
    if (host) {
      const { localName } = host;
      const { namespace } = this;
      const test = RegExp(
        `\\s(${namespace ? localName + "|" + namespace : localName})\\s`
      );
      this._style = this.appendChild(document.createElement("style"));

      getMediaList(host)
        .filter(([value]) => test.test(` ${value} `))
        .forEach(([, rules], index) =>
          rules.map((cssText) => this._style.sheet.insertRule(cssText, index))
        );
    }
  }
  disconnectedCallback() {
    this._style && this._style.remove();
  }
}

/**
 *
 * @param {StyleSheetList} styleSheets
 * @returns {CSSMediaRule[]}
 */
export const getMedia = (styleSheets) =>
  [...styleSheets]
    .map((sheet) =>
      [...sheet.rules]
        .filter((rule) => rule instanceof CSSMediaRule)
        .map(({ conditionText, cssRules }) => [
          conditionText,
          [...cssRules].map(({ cssText }) => cssText),
        ])
    )

    .flat();
/**
 *
 * @param {Element} current
 * @returns {[string,string[]][]}
 */
export const getMediaList = (current) => {
  while ((current = current.parentNode)) {
    if (current.nodeType > 8) {
      const { styleSheets } = current;
      return (current[MEDIA_LIST] =
        current[MEDIA_LIST] || getMedia(styleSheets));
    }
  }
  return [];
};

customElements.define("inherit-style", InheritStyle);
