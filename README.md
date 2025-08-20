# edge-markdown

> Render markdown using the MDC syntax and integrate it with Edge components.

[![gh-workflow-image]][gh-workflow-url] [![npm-image]][npm-url] ![][typescript-image] [![license-image]][license-url]

## Introduction

## Usage

Install the `edge-markdown` package from the npm packages registry.

```sh
npm i edge-markdown
```

Register the plugin with the edge instance.

```ts
import edge from 'edge.js'
import { edgeMarkdown } from 'edge-markdown'

edge.use(edgeMarkdown())
```

Once registered, you may use the following tag to render markdown content.

```edge
@markdown({
  file: absolutePathToFile,
})

  @markdown({
  content: 'RAW MARKDOWN',
  })
```

The `@markdown` tag converts the markdown to HTML and writes it output to the document.

If you want to generate the TOC and access the errors and warnings attached to the rendered markdown file, then you may want to use `$markdown.render()` method and save its output to a variable. For example:

```edge
@let(doc = await $markdown.render({
  file: absolutePathToFile,
  toc: true,
}))

<div>
  {{{ doc.html }}}
</div>

<div>
  {{{ doc.toc }}}
</div>

<ul>
  @each(message in doc.messages)
    <li>
      {{ message.reason }}
    </li>
  @end
</ul>
```

## C

## Contributing

One of the primary goals of <org> is to have a vibrant community of users and contributors who believes in the principles of the framework.

We encourage you to read the [contribution guide](https://github.com/<org>/.github/blob/main/docs/CONTRIBUTING.md) before contributing to the framework.

## Code of Conduct

In order to ensure that the <org> community is welcoming to all, please review and abide by the [Code of Conduct](https://github.com/<org>/.github/blob/main/docs/CODE_OF_CONDUCT.md).

## License

<pkg-name> is open-sourced software licensed under the [MIT license](LICENSE.md).

[gh-workflow-image]: https://img.shields.io/github/actions/workflow/status/<org>/<repo>/checks.yml?style=for-the-badge
[gh-workflow-url]: https://github.com/<org>/<repo>/actions/workflows/checks.yml 'Github action'
[typescript-image]: https://img.shields.io/badge/Typescript-294E80.svg?style=for-the-badge&logo=typescript
[typescript-url]: "typescript"
[npm-image]: https://img.shields.io/npm/v/<scope>/<repo>.svg?style=for-the-badge&logo=npm
[npm-url]: https://npmjs.org/package/<scope>/<repo> 'npm'
[license-image]: https://img.shields.io/npm/l/<scope>/<repo>?color=blueviolet&style=for-the-badge
[license-url]: LICENSE.md 'license'
