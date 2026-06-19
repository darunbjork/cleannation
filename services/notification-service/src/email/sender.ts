import nodemailer, { type Transporter } from "nodemailer"
import { createLogger } from "@cleannation/shared-utils"
import { config } from "../config/index"
import type { EmailTemplate } from "./templates"

const logger = createLogger("notification-service")

// Singleton transporter — one connection pool for all sends
// Creating a new transporter per email opens a new TCP connection
let transporter: Transporter | null = null

function getTransporter(): Transporter {
  if (transporter !== null) return transporter

  transporter = nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    // TLS on port 465 (implicit), STARTTLS on 587 (explicit)
    secure: config.smtp.port === 465,
    auth: {
      user: config.smtp.user,
      pass: config.smtp.pass,
    },
    // Connection pool — reuse SMTP connections instead of reconnecting
    pool: true,
    maxConnections: 5,
    maxMessages: 100,
  })

  return transporter
}

export interface SendEmailResult {
  success: boolean
  messageId?: string
  error?: string
}

export async function sendEmail(
  to: string,
  template: EmailTemplate
): Promise<SendEmailResult> {
  const start = Date.now()

  try {
    const transport = getTransporter()

    const info = await transport.sendMail({
      from: `"${config.smtp.fromName}" <${config.smtp.fromAddress}>`,
      to,
      subject: template.subject,
      html: template.html,
      text: template.text,
    })

    logger.info(
      {
        to,
        subject: template.subject,
        messageId: info.messageId,
        durationMs: Date.now() - start,
      },
      "Email sent"
    )

    return { success: true, messageId: info.messageId as string }
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown SMTP error"

    logger.error(
      {
        to,
        subject: template.subject,
        error: errorMessage,
        durationMs: Date.now() - start,
      },
      "Email send failed"
    )

    return { success: false, error: errorMessage }
  }
}

// Verify SMTP connection — used in health check
export async function verifySmtpConnection(): Promise<boolean> {
  try {
    await getTransporter().verify()
    return true
  } catch {
    return false
  }
}