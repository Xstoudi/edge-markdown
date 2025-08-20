/*
 * edge-markdown
 *
 * (c) Edge
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { type Edge } from 'edge.js'
import { readFile } from 'node:fs/promises'

import { MarkdownParser } from './parser.ts'
import { isVoidElement, stringifyAttributes, createRenderingContext } from './utils.ts'
import { type ParserOptions, type RendererOptions, type MarkdownOptions } from './types.ts'
import { VFile } from 'vfile'

/**
 * The Markdown class exposes the API for parsing and rendering
 * markdown documents to HTML.
 */
export class Markdown {
  #components: RendererOptions['components']
  #options: RendererOptions & ParserOptions
  #edgeRenderer: ReturnType<Edge['share']>

  /**
   * These utilities are used by the templates registered within
   * the "plugin.ts" file
   */
  utils = { stringifyAttributes, isVoidElement }

  /**
   * Create a new instance of the Markdown class
   *
   * @param edgeRenderer - Shared Edge renderer instance for template rendering
   * @param discoveredComponents - Components discovered during registration
   * @param options - Optional parser and renderer configuration options
   */
  constructor(
    edgeRenderer: ReturnType<Edge['share']>,
    discoveredComponents: RendererOptions['components'],
    options?: Partial<RendererOptions & ParserOptions>
  ) {
    this.#edgeRenderer = edgeRenderer
    this.#options = {
      allowHTML: true,
      components: {},
      remarkPlugins: [],
      rhypePlugins: [],
      highlight: true,
      hooks: [],
      toc: { enabled: true, maxDepth: 2 },
      ...options,
    }
    this.#components = { ...discoveredComponents, ...this.#options.components }
  }

  /**
   * Deep merges components property in renderer options
   *
   * @param options - Markdown options containing components to merge
   * @returns Merged renderer options with components combined
   */
  #mergeRendererOptions(options: MarkdownOptions) {
    return {
      ...this.#options,
      ...options,
      components: {
        ...this.#components,
        ...options.components,
      },
    }
  }

  /**
   * Parse a markdown file or contents to AST. You may access the AST
   * using the "result.vFile.result" property
   *
   * @param options - Options specifying either file path or content string to parse
   * @returns Promise resolving to parsed result with AST, frontmatter, and TOC
   */
  async parse(options: MarkdownOptions) {
    let vFile: VFile
    if ('file' in options) {
      vFile = new VFile({
        path: options.file,
        value: await readFile(options.file, 'utf-8'),
      })
    } else {
      vFile = new VFile({
        value: options.content,
      })
    }

    return MarkdownParser.parse(vFile, { ...this.#options, ...options })
  }

  /**
   * Render a markdown file or contents to HTML using edge templates.
   *
   * @param options - Options specifying either file path or content string to render
   * @returns Promise resolving to rendered HTML content with TOC, frontmatter, and messages
   */
  async render(options: MarkdownOptions) {
    const { vFile, toc, frontmatter } = await this.parse(options)
    const content = await this.#edgeRenderer.render('markdown_root', {
      node: vFile.result,
      $renderingContext: createRenderingContext(
        this.#mergeRendererOptions(options),
        vFile,
        frontmatter
      ),
    })

    return {
      toc: toc
        ? await this.#edgeRenderer.render('markdown_toc', {
            node: toc,
            $renderingContext: createRenderingContext(
              this.#mergeRendererOptions(options),
              vFile,
              frontmatter
            ),
          })
        : '',
      content,
      frontmatter,
      messages: vFile.messages,
    }
  }
}
