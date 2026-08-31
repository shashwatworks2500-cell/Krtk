import type { ContactChannel } from "@/data/site";

/**
 * Resolves a channel to a usable destination. An explicit `href` always wins;
 * otherwise an address-shaped value becomes a mailto so the primary CTA is
 * never a dead control. Anything else stays plain text.
 */
export function resolveChannelHref(channel: ContactChannel): string | null {
  if (channel.href) return channel.href;
  if (channel.value.includes("@") && !channel.value.startsWith("@")) {
    return `mailto:${channel.value}`;
  }
  return null;
}
