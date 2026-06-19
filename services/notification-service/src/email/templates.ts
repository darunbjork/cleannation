export interface EmailTemplate {
  subject: string
  html: string
  text: string
}

// Shared email wrapper — consistent header/footer across all emails
function wrapEmail(content: string, previewText: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light">
  <title>CleanNation</title>
  <style>
    body { margin: 0; padding: 0; background: #f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
    .preview { display: none; max-height: 0; overflow: hidden; }
    .wrapper { max-width: 600px; margin: 32px auto; background: #ffffff; border-radius: 8px; overflow: hidden; }
    .header { background: #16a34a; padding: 24px 32px; }
    .header h1 { margin: 0; color: #ffffff; font-size: 22px; font-weight: 700; }
    .header p { margin: 4px 0 0; color: #bbf7d0; font-size: 13px; }
    .body { padding: 32px; color: #18181b; line-height: 1.6; }
    .body h2 { margin: 0 0 16px; font-size: 20px; color: #111827; }
    .body p { margin: 0 0 16px; font-size: 15px; }
    .cta { display: inline-block; margin: 8px 0 24px; padding: 12px 24px; background: #16a34a; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 15px; }
    .detail-box { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; padding: 16px 20px; margin: 16px 0; }
    .detail-box p { margin: 0; font-size: 14px; color: #166534; }
    .footer { padding: 20px 32px; background: #f9fafb; border-top: 1px solid #e4e4e7; }
    .footer p { margin: 0; font-size: 12px; color: #71717a; line-height: 1.5; }
  </style>
</head>
<body>
  <span class="preview">${previewText}</span>
  <div class="wrapper">
    <div class="header">
      <h1>🌍 CleanNation</h1>
      <p>Making the world cleaner, together</p>
    </div>
    <div class="body">${content}</div>
    <div class="footer">
      <p>You received this email because you have an account on CleanNation.<br>
      To manage your notification preferences, visit your account settings.</p>
    </div>
  </div>
</body>
</html>`
}

export function welcomeTemplate(data: {
  displayName: string
  loginUrl: string
}): EmailTemplate {
  const subject = "Welcome to CleanNation 🌍"

  const html = wrapEmail(`
    <h2>Welcome, ${data.displayName}!</h2>
    <p>You've joined a community of people making their country cleaner.
    Every event you attend, every piece of waste you collect, gets tracked
    and contributes to a nationwide impact report.</p>
    <a href="${data.loginUrl}" class="cta">Find events near you →</a>
    <p>Not sure where to start? Browse cleanup events in your area and join
    one with a single tap. Your first event earns you the First Cleanup badge.</p>
  `, "You're in. Start cleaning.")

  const text = `Welcome to CleanNation, ${data.displayName}!

You've joined a community making their country cleaner.

Find events near you: ${data.loginUrl}

Every event you attend contributes to a nationwide impact report.`

  return { subject, html, text }
}

export function eventConfirmationTemplate(data: {
  displayName: string
  eventTitle: string
  eventDate: string
  eventCity: string
  pointsReward: number
  eventUrl: string
}): EmailTemplate {
  const subject = `You're in: ${data.eventTitle} ✅`

  const html = wrapEmail(`
    <h2>You're registered!</h2>
    <p>Hi ${data.displayName}, your spot is confirmed for:</p>
    <div class="detail-box">
      <p><strong>${data.eventTitle}</strong></p>
      <p>📅 ${data.eventDate}</p>
      <p>📍 ${data.eventCity}</p>
      <p>🏆 ${data.pointsReward} points on completion</p>
    </div>
    <a href="${data.eventUrl}" class="cta">View event details →</a>
    <p>Bring gloves, comfortable shoes, and a water bottle. Waste bags
    are usually provided by the organizer — check the event page to confirm.</p>
    <p>We'll send a reminder 24 hours before the event.</p>
  `, `Your spot is confirmed for ${data.eventTitle}`)

  const text = `You're registered for ${data.eventTitle}!

Date: ${data.eventDate}
Location: ${data.eventCity}
Points reward: ${data.pointsReward}

View event: ${data.eventUrl}

We'll remind you 24 hours before the event.`

  return { subject, html, text }
}

export function eventCancelledTemplate(data: {
  displayName: string
  eventTitle: string
  eventDate: string
  organizerNote?: string
  browseUrl: string
}): EmailTemplate {
  const subject = `Event cancelled: ${data.eventTitle}`

  const html = wrapEmail(`
    <h2>Event cancelled</h2>
    <p>Hi ${data.displayName}, unfortunately the following event has been cancelled:</p>
    <div class="detail-box">
      <p><strong>${data.eventTitle}</strong></p>
      <p>📅 ${data.eventDate}</p>
    </div>
    ${data.organizerNote !== undefined
      ? `<p><strong>Note from the organizer:</strong> ${data.organizerNote}</p>`
      : ""}
    <p>We're sorry for the inconvenience. There are other cleanup events
    happening near you — we'd love to see you at one!</p>
    <a href="${data.browseUrl}" class="cta">Find other events →</a>
  `, `${data.eventTitle} has been cancelled`)

  const text = `${data.eventTitle} has been cancelled.

Date was: ${data.eventDate}
${data.organizerNote !== undefined ? `Organizer note: ${data.organizerNote}\n` : ""}
Find other events: ${data.browseUrl}`

  return { subject, html, text }
}

export function eventCompletedTemplate(data: {
  displayName: string
  eventTitle: string
  pointsEarned: number
  totalPoints: number
  dashboardUrl: string
}): EmailTemplate {
  const subject = `+${data.pointsEarned} points earned — great work! 🏆`

  const html = wrapEmail(`
    <h2>Event complete — well done!</h2>
    <p>Hi ${data.displayName}, thank you for participating in
    <strong>${data.eventTitle}</strong>.</p>
    <div class="detail-box">
      <p>✅ <strong>+${data.pointsEarned} points</strong> added to your account</p>
      <p>🏆 Your total: <strong>${data.totalPoints} points</strong></p>
    </div>
    <a href="${data.dashboardUrl}" class="cta">See your impact →</a>
    <p>Your participation contributes to a cleaner country.
    Check your dashboard to see the nationwide impact report.</p>
  `, `You earned ${data.pointsEarned} points!`)

  const text = `Great work at ${data.eventTitle}!

+${data.pointsEarned} points added. Your total: ${data.totalPoints} points.

See your impact: ${data.dashboardUrl}`

  return { subject, html, text }
}

export function badgeEarnedTemplate(data: {
  displayName: string
  badgeName: string
  badgeDescription: string
  bonusPoints: number
  dashboardUrl: string
}): EmailTemplate {
  const subject = `New badge unlocked: ${data.badgeName} 🎖️`

  const html = wrapEmail(`
    <h2>You earned a new badge! 🎖️</h2>
    <p>Hi ${data.displayName}, congratulations — you've unlocked:</p>
    <div class="detail-box">
      <p><strong>${data.badgeName}</strong></p>
      <p>${data.badgeDescription}</p>
      <p>🏆 +${data.bonusPoints} bonus points</p>
    </div>
    <a href="${data.dashboardUrl}" class="cta">View your profile →</a>
  `, `You unlocked the ${data.badgeName} badge!`)

  const text = `You earned the ${data.badgeName} badge!

${data.badgeDescription}

+${data.bonusPoints} bonus points added.

View your profile: ${data.dashboardUrl}`

  return { subject, html, text }
}