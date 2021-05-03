export class InheritStyle extends HTMLElement {
    static get observedAttributes(): string[];
    set namespace(arg: string);
    get namespace(): string;
    attributeChangedCallback(name: any, prev: any, next: any): void;
    connectedCallback(): void;
    _style: HTMLStyleElement;
    disconnectedCallback(): void;
}
export function getMedia(styleSheets: StyleSheetList): CSSMediaRule[];
export function getMediaList(current: Element): [string, string[]][];
