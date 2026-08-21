const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000/api";

export interface AiCsConfig {
  is_active: boolean;
  welcome_message: string;
  quick_prompts: string[];
  max_questions?: number;
  limit_reached_message?: string;
}

export interface AiChatMessage {
  id: string;
  sender: "user" | "assistant" | "system";
  text: string;
  timestamp: string;
  limit_reached?: boolean;
}

export interface AiChatResponse {
  session_id: string;
  response: string;
  limit_reached?: boolean;
}

const STORAGE_SESSION_KEY = "ekscoder_ai_session_id";
const STORAGE_HISTORY_KEY = "ekscoder_ai_chat_history";
const STORAGE_TEASER_DISMISSED_KEY = "ekscoder_ai_teaser_dismissed";

/**
 * Generates a unique session UUID for the AI CS chat session.
 */
export function generateSessionId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return `cs_${crypto.randomUUID()}`;
  }
  return `cs_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Gets the current active session ID from localStorage or creates a new one.
 */
export function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "cs_server_placeholder";
  try {
    let sessionId = localStorage.getItem(STORAGE_SESSION_KEY);
    if (!sessionId || sessionId.trim() === "") {
      sessionId = generateSessionId();
      localStorage.setItem(STORAGE_SESSION_KEY, sessionId);
    }
    return sessionId;
  } catch {
    return generateSessionId();
  }
}

/**
 * Resets the session ID and clears the locally stored chat history.
 */
export function resetSession(): string {
  const newSessionId = generateSessionId();
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_SESSION_KEY, newSessionId);
      localStorage.removeItem(STORAGE_HISTORY_KEY);
    } catch (e) {
      console.warn("[AiCsService] Failed to reset session in localStorage", e);
    }
  }
  return newSessionId;
}

/**
 * Loads stored chat history from localStorage.
 */
export function loadLocalChatHistory(): AiChatMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.warn("[AiCsService] Failed to load chat history", e);
    return [];
  }
}

/**
 * Saves chat history into localStorage.
 */
export function saveLocalChatHistory(messages: AiChatMessage[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_HISTORY_KEY, JSON.stringify(messages));
  } catch (e) {
    console.warn("[AiCsService] Failed to save chat history", e);
  }
}

/**
 * Clears stored chat history.
 */
export function clearLocalChatHistory(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_HISTORY_KEY);
  } catch (e) {
    console.warn("[AiCsService] Failed to clear chat history", e);
  }
}

/**
 * Checks whether the teaser tooltip bubble was previously dismissed by the user.
 */
export function isTeaserDismissed(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(STORAGE_TEASER_DISMISSED_KEY) === "true";
  } catch {
    return false;
  }
}

/**
 * Sets the teaser tooltip bubble dismissed flag.
 */
export function setTeaserDismissed(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_TEASER_DISMISSED_KEY, "true");
  } catch {
    // ignore
  }
}

/**
 * Fetches AI Customer Service widget configuration from Laravel API.
 * Endpoint: GET /api/ai-cs/config
 */
export async function fetchAiCsConfig(): Promise<AiCsConfig | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/ai-cs/config`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.warn(`[AiCsService] Config request failed with status ${res.status}`);
      return null;
    }

    const json = await res.json();

    if (json.status === "success" && json.data) {
      return json.data as AiCsConfig;
    }

    return null;
  } catch (error) {
    console.warn("[AiCsService] Error fetching AI CS config:", error);
    return null;
  }
}

/**
 * Sends a chat message to the Laravel backend AI CS endpoint.
 * Endpoint: POST /api/ai-cs/chat
 */
export async function sendAiChatMessage(
  message: string,
  sessionId: string
): Promise<AiChatResponse | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/ai-cs/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        message,
        session_id: sessionId,
      }),
    });

    if (!res.ok) {
      console.warn(`[AiCsService] Chat request failed with status ${res.status}`);
      return null;
    }

    const json = await res.json();

    if (json.status === "success" && json.data) {
      return json.data as AiChatResponse;
    }

    return null;
  } catch (error) {
    console.error("[AiCsService] Error sending chat message:", error);
    return null;
  }
}
