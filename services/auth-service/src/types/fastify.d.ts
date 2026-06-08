import "fastify"
import "@fastify/cookie"
import { CookieSerializeOptions } from "@fastify/cookie"

declare module "fastify" {
  interface FastifyRequest {
    correlationId: string
    cookies: { [cookieName: string]: string | undefined }
  }
  interface FastifyReply {
    setCookie(name: string, value: string, options?: CookieSerializeOptions): this
    clearCookie(name: string, options?: CookieSerializeOptions): this
  }
}
