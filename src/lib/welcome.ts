import { LEGACY_WELCOME_KEY, WELCOME_KEY } from "@/lib/config";

const WELCOME_COOKIE = "invoi_welcome_seen";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function readCookie(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie.split(";").some((c) => c.trim().startsWith(`${WELCOME_COOKIE}=1`));
}

function writeCookie(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${WELCOME_COOKIE}=1; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

export function isWelcomeSeen(): boolean {
  if (typeof window === "undefined") return false;
  try {
    if (localStorage.getItem(WELCOME_KEY) || localStorage.getItem(LEGACY_WELCOME_KEY)) {
      return true;
    }
  } catch {
    // private mode / blocked storage
  }
  return readCookie();
}

export function markWelcomeSeen(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(WELCOME_KEY, "1");
    localStorage.removeItem(LEGACY_WELCOME_KEY);
  } catch {
    // quota exceeded — cookie fallback below
  }
  writeCookie();
}