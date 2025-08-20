/*
 * edge-markdown
 *
 * (c) Edge
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Markdown } from './markdown.ts'
import { type PluginFn } from 'edge.js/types'
import { discoverMarkdownComponents } from './utils.ts'
import { type RendererOptions, type ParserOptions } from './types.ts'

/**
 * Edge.js plugin that enables Markdown rendering with MDC (Markdown Component) support.
 *
 * This plugin integrates Remark-based Markdown parsing with Edge.js templating by:
 * - Discovering and registering Markdown-specific components with configurable prefix
 * - Providing a shared Markdown instance accessible via `$markdown` in templates
 * - Registering `@markdownSlot` tag for rendering specific node children slots
 * - Registering `@markdown` tag for inline Markdown rendering with options
 * - Setting up core templates for rendering HAST nodes as HTML elements
 *
 * The plugin transforms Markdown AST nodes into Edge components, allowing full
 * customization of Markdown rendering through Edge templates while maintaining
 * compatibility with MDC syntax for component embedding.
 *
 * @param edge - Edge renderer instance
 * @param firstRun - Whether this is the first time the plugin is being registered
 * @param options - Plugin configuration options including renderer/parser settings and prefix
 */
export const edgeMarkdown: PluginFn<
  Partial<RendererOptions & ParserOptions> & { prefix?: string }
> = (edge, firstRun, options) => {
  /**
   * Return early when plugin is registered in recurring mode
   */
  if (!firstRun) {
    return
  }

  const components = discoverMarkdownComponents(edge, options.prefix ?? 'markdown')
  edge.onRender((edgeRenderer) => {
    edgeRenderer.share({ $markdown: new Markdown(edgeRenderer, components, options) })
  })

  /**
   * Registers the @markdownSlot tag for rendering specific slots of Markdown content.
   *
   * This tag allows templates to render specific named slots from the current
   * Markdown node's children, enabling selective content rendering within
   * custom components.
   */
  edge.registerTag({
    block: false,
    tagName: 'markdownSlot',
    seekable: true,
    noNewLine: true,
    compile(parser, buffer, token) {
      const awaitKeyword = parser.asyncMode ? 'await ' : ''

      let slotName: string = "'main'"
      if (token.properties.jsArg.trim()) {
        slotName = parser.utils.stringify(
          parser.utils.transformAst(
            parser.utils.generateAST(token.properties.jsArg, token.loc, token.filename),
            token.filename,
            parser
          )
        )
      }

      buffer.outputExpression(
        `${awaitKeyword}template.compileComponent('markdown_contents')(template, template.getComponentState({
          nodes: state.$props.get('markdownSlots')[${slotName}],
          '$renderingContext': state.$props.get('$renderingContext')
        }, {}, {}), $context)`,
        token.filename,
        token.loc.start.line,
        false
      )
    },
  })

  /**
   * Registers the @markdown tag for inline Markdown rendering within templates.
   *
   * This tag enables rendering Markdown content directly within Edge templates
   * by accepting render options as arguments and processing them through
   * the shared Markdown instance.
   */
  edge.registerTag({
    block: false,
    tagName: 'markdown',
    seekable: true,
    noNewLine: true,
    compile(parser, buffer, token) {
      const renderOptions = parser.utils.stringify(
        parser.utils.transformAst(
          parser.utils.generateAST(`(${token.properties.jsArg})`, token.loc, token.filename),
          token.filename,
          parser
        )
      )

      buffer.outputExpression(
        `(await state.$markdown.render(${renderOptions})).content`,
        token.filename,
        token.loc.start.line,
        false
      )
    },
  })

  /**
   * Template for rendering an array of HAST nodes.
   *
   * Iterates through nodes and renders each using the appropriate component
   * determined by the rendering context.
   */
  edge.registerTemplate('markdown_contents', {
    template: [
      `@each(node in nodes)~`,
      `@let(nodeComponent = await $renderingContext.getComponentFor(node))`,
      `@!component(nodeComponent[0], {
        ...nodeComponent[1],
        '$renderingContext': $renderingContext,
      })~`,
      '@end',
    ].join('\n'),
  })

  /**
   * Root template for rendering the main Markdown document.
   *
   * Serves as the entry point for rendering a complete Markdown document
   * by delegating to the markdown_contents template.
   */
  edge.registerTemplate('markdown_root', {
    template: [
      `@!component('markdown_contents', {
        nodes: node.children,
        '$renderingContext': $renderingContext,
      })~`,
    ].join('\n'),
  })

  /**
   * Template for rendering individual HAST elements as HTML.
   *
   * Handles special cases like binding elements and void elements,
   * while rendering standard HTML elements with their properties and children.
   */
  edge.registerTemplate('markdown_element', {
    template: [
      `@if(node.tagName === 'binding')`,
      `{{ $props.get(node.properties.value, node.properties.defaultValue) }}`,
      '@elseif($markdown.utils.isVoidElement(node.tagName))~',
      '<{{node.tagName}}{{{$markdown.utils.stringifyAttributes(node.properties)}}}/>',
      '@else~',
      '<{{node.tagName}}{{{$markdown.utils.stringifyAttributes(node.properties)}}}>',
      `@!component('markdown_contents', {
        nodes: node.children,
        '$renderingContext': $renderingContext,
      })~`,
      '</{{node.tagName}}>',
      '@endif',
    ].join('\n'),
  })

  /**
   * Void template used when the processor wants to skip rendering a node.
   *
   * Returns empty content, effectively omitting the node from the output.
   */
  edge.registerTemplate('markdown_void', {
    template: '',
  })

  /**
   * Template for rendering text nodes.
   *
   * Outputs the raw text value of the node without any additional processing.
   */
  edge.registerTemplate('markdown_text', {
    template: '{{node.value}}',
  })

  /**
   * Void template used when the processor wants to skip rendering a node.
   *
   * Returns empty content, effectively omitting the node from the output.
   */
  edge.registerTemplate('markdown_toc', {
    template: [
      `@!component('markdown_element', {
        node: node,
        '$renderingContext': $renderingContext,
      })~`,
    ].join('\n'),
  })
}
