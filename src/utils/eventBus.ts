/**
 * Type-safe Event Bus
 * Centralizes all cross-component communication with type safety
 */

type EventCallback = (...args: unknown[]) => void

interface EventMap {
  'highlight-contact': () => void
}

class EventBus {
  private events: Map<string, Set<EventCallback>> = new Map()

  /**
   * Subscribe to an event
   */
  on<K extends keyof EventMap>(event: K, callback: EventMap[K]): () => void {
    if (!this.events.has(event)) {
      this.events.set(event, new Set())
    }
    this.events.get(event)!.add(callback as EventCallback)

    // Return unsubscribe function
    return () => {
      this.events.get(event)?.delete(callback as EventCallback)
    }
  }

  /**
   * Emit an event
   */
  emit<K extends keyof EventMap>(event: K, ...args: Parameters<EventMap[K]>): void {
    const callbacks = this.events.get(event)
    if (callbacks) {
      callbacks.forEach(callback => callback(...args))
    }
  }

  /**
   * Remove all listeners for an event
   */
  off(event: keyof EventMap): void {
    this.events.delete(event)
  }

  /**
   * Remove all listeners
   */
  clear(): void {
    this.events.clear()
  }
}

export const eventBus = new EventBus()
