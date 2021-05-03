# @atomico/inject-style

Created by [@uppercod](https://twitter.com/uppercod) with reference to [@jouni](https://twitter.com/jouni)'s work.

This webcomponent is an alternative to `::part` and allows to inject CSS outside the shadowDOM into the shadowDOM of the parent who uses this webcomponent, consider:

1. The CSS must be inside an at-rule rule `@media <tagName | namespace>`.
2. The reading is static, if you want to execute dynamic effects, declare customProperty inside the `at-media` referenced by this webcomponent.
3. Safe, as the rules are injected via `insertRule`.
4. This component must be nested within shadowDOM depth 0, example `#shadow-root > inject-style`.
5. The search for css rules is limited by the `host` just like `::part`.

```xml
<style>
    @media my-example {
      button {
        background: black;
        border-radius: 100vh;
        padding: 0.5rem 1rem;
        color: white;
        border: none;
      }
    }
</style>
<my-example>
  #shadow-root
        <!-- inject-style will inject the css into `@media my-example` -->
        <inject-style></inject-style>
</my-example>
```

the css inside the at-rule `@media my-example` will exist inside my-example only if they share the tagName or a custom namespace.

## Properties

| Property  | Type   | Description                                                  |
| --------- | ------ | ------------------------------------------------------------ |
| namespace | String | Permite añadir un namespace adicional a la catura de at-rule |
