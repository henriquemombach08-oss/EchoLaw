export type RightType = 'alert' | 'right' | 'info'

export interface RightItem {
  type: RightType
  text: string
}

export interface AnalysisResult {
  summary: string
  documentType: string
  rights: RightItem[]
  draftResponse: string | null
  riskScore: number
  riskExplanation: string
}

export interface ChatMessage {
  id?: string
  role: 'user' | 'assistant'
  content: string
  created_at?: string
}

export type Plan = 'free' | 'essencial' | 'pro' | 'b2b'

export interface Profile {
  id: string
  email: string | null
  plan: Plan
  analyses_used: number
  analyses_limit: number
  created_at: string
}

export interface Document {
  id: string
  user_id: string
  name: string
  storage_path: string | null
  raw_text: string | null
  type: string | null
  created_at: string
}

export interface Analysis {
  id: string
  document_id: string
  user_id: string
  summary: string | null
  rights: RightItem[] | null
  draft_response: string | null
  risk_score: number | null
  risk_explanation: string | null
  created_at: string
  documents?: Document
}
