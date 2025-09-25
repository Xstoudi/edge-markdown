/*
 * edge-markdown
 *
 * (c) Edge
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Cache class extending Map with TTL (time-to-live) and size limit functionality.
 * Provides automatic expiration and LRU-like behavior for cached items.
 *
 * @template K - The type of cache keys
 * @template V - The type of cached values
 *
 * @example
 * ```typescript
 * const cache = new Cache<string, object>({
 *   max: 100,
 *   maxAge: 60000, // 1 minute TTL
 *   stale: false
 * })
 *
 * cache.set('key', { data: 'value' })
 * const value = cache.get('key')
 * ```
 */
export class Cache<K, V> extends Map<any, any> {
  #max: number
  #maxAge: number
  #stale: boolean
  /**
   * Create a new Cache instance
   *
   * @param options - Cache configuration options
   * @param options.max - Maximum number of items to store (default: Infinity)
   * @param options.maxAge - Default TTL in milliseconds (default: -1, no expiration)
   * @param options.stale - Whether to return expired items (default: false)
   *
   * @example
   * ```typescript
   * const cache = new Cache({
   *   max: 50,
   *   maxAge: 30000, // 30 seconds
   *   stale: true
   * })
   * ```
   */
  constructor(
    options: {
      max?: number
      maxAge?: number
      stale?: boolean
    } = {}
  ) {
    super()

    let { max, maxAge, stale } = options
    this.#max = max && max > 0 ? max : Infinity
    this.#maxAge = maxAge !== void 0 ? maxAge : -1
    this.#stale = !!stale
  }

  /**
   * Get a value without updating its position or TTL
   *
   * @param key - The key to peek at
   * @returns The cached value or undefined if not found/expired
   *
   * @example
   * ```typescript
   * cache.set('key', 'value')
   * const value = cache.peek('key') // Doesn't update position
   * ```
   */
  peek(key: K) {
    return this.get(key, false)
  }

  /**
   * Set a value in the cache with optional custom TTL
   *
   * @param key - The key to store the value under
   * @param content - The value to cache
   * @param maxAge - Custom TTL in milliseconds (defaults to instance maxAge)
   * @returns The cache instance for chaining
   *
   * @example
   * ```typescript
   * cache.set('key', 'value') // Uses default TTL
   * cache.set('key', 'value', 10000) // Custom 10 second TTL
   * ```
   */
  set(key: K, content: V, maxAge = this.#maxAge) {
    if (this.has(key)) {
      this.delete(key)
    }

    if (this.size + 1 > this.#max) {
      this.delete(this.keys().next().value)
    }

    const expires = maxAge > -1 ? maxAge + Date.now() : undefined
    return super.set(key, { expires, content })
  }

  /**
   * Get a value from the cache
   *
   * @param key - The key to retrieve
   * @param mutate - Whether to update the item's position (default: true)
   * @returns The cached value or undefined if not found/expired
   *
   * @example
   * ```typescript
   * const value = cache.get('key') // Updates position
   * const value = cache.get('key', false) // Doesn't update position
   * ```
   */
  get(key: K, mutate = true) {
    let value = super.get(key)
    if (value === void 0) {
      return value
    }

    let { expires, content } = value
    if (expires !== false && Date.now() >= expires) {
      this.delete(key)
      return this.#stale ? content : void 0
    }

    if (mutate) {
      this.set(key, content)
    }

    return content
  }
}
