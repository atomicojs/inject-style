import { expect } from "@esm-bundle/chai";
import { InheritStyle } from "../src/inject-style.js";

class ShadowRoot extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
}

customElements.define("shadow-root", ShadowRoot);

it("herencia de estilo", () => {
  const component = new ShadowRoot();
  const inheritStyle = component.shadowRoot.appendChild(new InheritStyle());
  const style = document.createElement("style");

  style.innerHTML = /*css*/ `
    @media shadow-root{
        :host{
            width: 100px;
            height: 100px;
            background: red;
            display:block;
        }
    }
  `;

  document.body.appendChild(style);
  document.body.appendChild(component);

  const internal = [...inheritStyle.firstChild.sheet.rules].map(
    ({ cssText }) => cssText
  );

  const external = [...style.sheet.rules[0].cssRules].map(
    ({ cssText }) => cssText
  );

  expect(internal).to.deep.equal(external);
});
