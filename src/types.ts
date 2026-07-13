import type { ClinicalPriority } from "./rate-limit.js";

export interface OpenEvidenceAskRequest {
  question: string;
  originalArticleId?: string;
  articleType?: string;
  personalizationEnabled?: boolean;
  disableCaching?: boolean;
  variantConfigurationFile?: string;
  priority?: ClinicalPriority;
}

/** Share visibility for an article (PATCH /api/article/<id>/access). */
export type ArticleAccessLevel = "CREATOR_ONLY" | "ANYONE_WITH_LINK";

export interface WaitOptions {
  timeoutMs?: number;
  intervalMs?: number;
}

export interface AuthStatusResult {
  authenticated: boolean;
  statusCode: number;
  user?: Record<string, unknown>;
  message?: string;
}
