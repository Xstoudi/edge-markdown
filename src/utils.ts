/*
 * edge-markdown
 *
 * (c) Edge
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { type VFile } from 'vfile'
import { type Edge } from 'edge.js'
import string from '@poppinss/string'
import { htmlEscape } from 'escape-goat'
import { find, html } from 'property-information'
import { type VoidHtmlTags, voidHtmlTags } from 'html-tags'
import { type ElementContent, type Comment, type Element, type Text, type Root } from 'hast'
import { type RendererOptions } from './types.ts'

/**
 * Find if element is a void HTML element or not
 */
export function isVoidElement(element: VoidHtmlTags): element is VoidHtmlTags {
  return voidHtmlTags.includes(element)
}

/**
 * Stringify an object to props to HTML attributes
 */
export function stringifyAttributes(props: any): string {
  const attributes = Object.keys(props)
  if (attributes.length === 0) {
    return ''
  }

  return ` ${attributes
    .reduce<string[]>((result, key) => {
      const propInfo = find(html, key)
      if (!propInfo || propInfo.space === 'svg') {
        return result
      }

      let value = props[key]

      /**
       * Join array values with correct seperator
       */
      if (Array.isArray(value)) {
        value = value.join(propInfo.commaSeparated ? ',' : ' ')
      }

      /**
       * Wrap values inside double quotes when not booleanish
       */
      if (!propInfo.booleanish && !propInfo.number) {
        value = `"${htmlEscape(value)}"`
      }

      /**
       * Push key value string
       */
      result.push(`${propInfo.attribute}=${value}`)
      return result
    }, [])
    .join(' ')}`
}

/**
 * Returns a collection of markdown components for a given edge
 * instance. Only considers components from the default disk
 */
export function discoverMarkdownComponents(edge: Edge, prefix: string) {
  const componentsBasePath = `components/${prefix}/`
  const defaultDisk = edge.loader.listComponents().find((d) => d.diskName === 'default')
  const components = defaultDisk?.components ?? []

  return components.reduce<RendererOptions['components']>((result, { componentName }) => {
    /**
     * Only consider markdown components
     */
    if (!componentName.startsWith(componentsBasePath)) {
      return result
    }

    /**
     * Collect components with the tagName.
     */
    const tagName = componentName.replace(new RegExp(componentsBasePath), '')
    result[string.dashCase(tagName)] = componentName
    return result
  }, {})
}

/**
 * Returns a collection of markdown components for a given edge
 * instance. Only considers components from the default disk
 */
export function processMdcProps(props: Record<string, any>, frontmatter: Record<string, any>) {
  return Object.keys(props).reduce<Record<string, any>>((result, key) => {
    const value = props[key]
    if (key.startsWith(':') && value) {
      result[key.slice(1)] = frontmatter[value]
    } else {
      result[key] = value
    }
    return result
  }, {})
}

/**
 * Returns the children node for a given slot or the main slot
 */
export function getNodeSlots(node: Element) {
  return node.children.reduce<Record<string, ElementContent[]>>(
    (result, child) => {
      if (child.type === 'element' && child.tagName === 'component-slot') {
        const slotName = Object.keys(child.properties)[0].replace('v-slot:', '')
        result[slotName] = child.children
      } else {
        result.main.push(child)
      }

      return result
    },
    {
      main: [],
    }
  )
}

/**
 * Returns the rendering context to be shared by reference with
 * all markdown related components
 */
export function createRenderingContext(
  options: RendererOptions,
  vFile: VFile,
  frontmatter: Record<string, any>
) {
  return {
    vFile,
    frontmatter,
    getComponentFor(node: Text | Element | Comment | Root): [string, Record<string, any>] {
      if (node.type === 'text') {
        return ['markdown_text', { node }]
      }

      if (node.type === 'comment') {
        return ['markdown_void', {}]
      }

      if (node.type === 'root') {
        return ['markdown_root', { node }]
      }

      node.properties = processMdcProps(node.properties, frontmatter)

      /**
       * Skip when tag is not in the allowed list
       */
      if (options.allowed && options.allowed.length && !options.allowed.includes(node.tagName)) {
        return ['markdown_void', {}]
      }

      let component: void | undefined | boolean | [string, any]

      /**
       * Loop through the hooks and allow them to pick a custom
       * component, mutate the node or attach messages to the
       * vFile.
       */
      for (let hook of options.hooks) {
        component = hook(node, this.vFile, frontmatter)
        if (component !== undefined) {
          break
        }
      }

      /**
       * Do not render the component when hook returns
       * false
       */
      if (component === false) {
        return ['markdown_void', {}]
      }

      /**
       * Use the component returned by the hook
       */
      if (Array.isArray(component)) {
        return [component[0], { ...component[1], markdownSlots: getNodeSlots(node) }]
      }

      /**
       * Render pre-defined component
       */
      if (options.components[node.tagName]) {
        return [
          options.components[node.tagName],
          { node, ...frontmatter, ...node.properties, markdownSlots: getNodeSlots(node) },
        ]
      }

      /**
       * Render default component
       */
      return ['markdown_element', { node, ...frontmatter, ...node.properties }]
    },
  }
}
