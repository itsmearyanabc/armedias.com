// Instant lead alerts on Telegram (added 24 Nov 2026). Runs next to the email alert in
// forms.ts; the lead is always saved before either is sent, so a Telegram outage never loses
// a lead.
//
// Settings in /var/www/armedias/.env (never committed):
//   TELEGRAM_BOT_TOKEN  token from @BotFather
//   TELEGRAM_CHAT_ID    the chat to alert; several chats can be separated by commas
// With either missing, alerts are simply skipped.

const token = () => process.env.TELEGRAM_BOT_TOKEN?.trim() ?? '';
const chatIds = () => (process.env.TELEGRAM_CHAT_ID ?? '').split(',').map((s) => s.trim()).filter(Boolean);

/** True when at least one chat received the message. Never throws; never logs the token. */
export async function telegram(text: string): Promise<boolean> {
  const t = token();
  const ids = chatIds();
  if (!t || !ids.length) return false;
  const results = await Promise.allSettled(ids.map(async (chat_id) => {
    const res = await fetch(`https://api.telegram.org/bot${t}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id, text: text.slice(0, 4000), disable_web_page_preview: true }),
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) {
      const body = (await res.json().catch(() => ({}))) as { description?: string };
      throw new Error(`Telegram answered ${res.status}${body.description ? `: ${body.description}` : ''}`);
    }
  }));
  results.forEach((r, i) => {
    if (r.status === 'rejected') console.error(`telegram: alert to chat #${i + 1} failed:`, (r.reason as Error)?.message ?? 'unknown error');
  });
  return results.some((r) => r.status === 'fulfilled');
}

/** WhatsApp chat link for a phone number written in any format, or '' when it has too few digits. */
export function whatsAppLink(phone: string | null | undefined): string {
  const digits = (phone ?? '').replace(/\D/g, '').replace(/^00/, '');
  return digits.length >= 10 ? `https://wa.me/${digits}` : '';
}

/** Plain-text alert: a title, labelled lines (empty values skipped), then the message. */
export function leadAlert(title: string, lines: [string, string | null | undefined][], message?: string | null): string {
  const body = lines.filter(([, v]) => v && String(v).trim()).map(([k, v]) => `${k}: ${v}`);
  const msg = message?.trim();
  return [title, '', ...body, ...(msg ? ['', msg.length > 1500 ? `${msg.slice(0, 1500)}…` : msg] : []), '', 'Open leads: https://armedias.com/admin/'].join('\n');
}
