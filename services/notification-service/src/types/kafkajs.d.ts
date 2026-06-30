declare module "kafkajs" {
  export class Kafka {
    constructor(config: unknown)
    producer(config?: unknown): Producer
    consumer(config: unknown): Consumer
    admin(config?: unknown): unknown
  }

  export interface Consumer {
    connect(): Promise<void>
    disconnect(): Promise<void>
    stop(): Promise<void>
    subscribe(args: unknown): Promise<void>
    run(args: unknown): Promise<void>
    commitOffsets(args: unknown[]): Promise<void>
  }

  export interface Producer {
    connect(): Promise<void>
    disconnect(): Promise<void>
    send(args: unknown): Promise<void>
  }

  export interface EachMessagePayload {
    topic: string
    partition: number
    message: {
      offset: string | number
      value: Buffer | string | null
    }
    heartbeat(): Promise<void>
  }

  export const CompressionTypes: {
    GZIP: string
  }
}