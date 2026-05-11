// shared/src/types/index.ts

/**
 * Shared type definitions used across frontend and backend
 */

// Common Earthquake Types
export interface EarthquakeBase {
  id: string
  eventId: string
  magnitude: number
  depth: number
  latitude: number
  longitude: number
  locationName: string
  originTime: string
}

export interface EarthquakeData extends EarthquakeBase {
  eventType: 'earthquake' | 'tsunami' | 'other'
  dataSource: 'jma' | 'kyoshin' | 'dm-d.s.s'
}

// Common Station Types
export interface StationBase {
  id: string
  stationCode: string
  stationName: string
  latitude: number
  longitude: number
}

export interface StationData extends StationBase {
  network: 'K-NET' | 'KiK-net' | 'other'
  depth?: number
  stationType?: string
  status: 'active' | 'inactive' | 'maintenance'
}

// Common Intensity Types
export interface IntensityBase {
  intensity: number
  acceleration: number
  velocity: number
  displacement: number
}

export interface IntensityData extends IntensityBase {
  earthquakeId: string
  stationId: string
  recordedAt: string
}

// Common User Types
export interface UserBase {
  id: string
  username: string
  email: string
  fullName: string
}

export interface UserData extends UserBase {
  role: 'user' | 'admin'
  createdAt: string
}

// Common Notification Types
export interface NotificationBase {
  id: string
  title: string
  message: string
  type: 'earthquake' | 'eew' | 'system'
}

export interface NotificationData extends NotificationBase {
  read: boolean
  createdAt: string
}

// API Common Types
export interface ApiSuccessResponse<T> {
  success: true
  data: T
}

export interface ApiErrorResponse {
  success: false
  error: string
  message: string
  statusCode?: number
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse

// Pagination Common Types
export interface PaginationParams {
  page: number
  limit: number
}

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  hasMore: boolean
}

export interface PaginatedApiResponse<T> {
  success: true
  data: T[]
  pagination: PaginationMeta
}

// Filter Common Types
export interface BaseFilter {
  sortBy?: string
  order?: 'asc' | 'desc'
}

export interface RangeFilter {
  min?: number
  max?: number
}

export interface LocationFilter {
  latitude: number
  longitude: number
  radiusKm: number
}

// WebSocket Common Types
export interface WebSocketEventBase {
  type: string
  timestamp: string
  userId?: string
}

export interface WebSocketMessage<T = any> extends WebSocketEventBase {
  data: T
}

// Error Common Types
export interface ValidationErrorDetail {
  field: string
  message: string
}

export interface AppErrorResponse {
  statusCode: number
  message: string
  details?: ValidationErrorDetail[]
  timestamp: string
}

// Constants
export const MAGNITUDE_CLASSIFICATION = {
  MICRO: { min: 0, max: 2.9, label: 'Micro' },
  MINOR: { min: 3, max: 3.9, label: 'Minor' },
  LIGHT: { min: 4, max: 4.9, label: 'Light' },
  MODERATE: { min: 5, max: 5.9, label: 'Moderate' },
  STRONG: { min: 6, max: 6.9, label: 'Strong' },
  MAJOR: { min: 7, max: 7.9, label: 'Major' },
  GREAT: { min: 8, max: 10, label: 'Great' }
} as const

export const INTENSITY_LABELS = {
  0: 'Not felt',
  1: 'Weak',
  2: 'Light',
  3: 'Moderate',
  4: 'Strong',
  5: 'Very strong',
  6: 'Severe',
  7: 'Very severe'
} as const

export const STATION_NETWORKS = ['K-NET', 'KiK-net', 'other'] as const

export const EVENT_TYPES = ['earthquake', 'tsunami', 'other'] as const

export const DATA_SOURCES = ['jma', 'kyoshin', 'dm-d.s.s'] as const

export const NOTIFICATION_TYPES = ['earthquake', 'eew', 'system'] as const

export const USER_ROLES = ['user', 'admin'] as const

// API Endpoints
export const API_BASE = '/api'
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE}/auth/login`,
    REGISTER: `${API_BASE}/auth/register`,
    LOGOUT: `${API_BASE}/auth/logout`,
    REFRESH: `${API_BASE}/auth/refresh`
  },
  EARTHQUAKES: {
    LIST: `${API_BASE}/earthquakes`,
    DETAIL: (id: string) => `${API_BASE}/earthquakes/${id}`,
    INTENSITY: (id: string) => `${API_BASE}/earthquakes/${id}/intensity`,
    WAVEFORM: (id: string) => `${API_BASE}/earthquakes/${id}/waveform`
  },
  EEW: {
    LIST: `${API_BASE}/eew-alerts`,
    DETAIL: (id: string) => `${API_BASE}/eew-alerts/${id}`
  },
  STATIONS: {
    LIST: `${API_BASE}/stations`,
    DETAIL: (id: string) => `${API_BASE}/stations/${id}`,
    WAVEFORM: (id: string) => `${API_BASE}/stations/${id}/waveform`
  },
  USERS: {
    PROFILE: `${API_BASE}/users/me`,
    UPDATE: `${API_BASE}/users/me`,
    SETTINGS: `${API_BASE}/users/me/notification-settings`,
    UPDATE_SETTINGS: `${API_BASE}/users/me/notification-settings`
  },
  NOTIFICATIONS: {
    LIST: `${API_BASE}/users/me/notifications`,
    MARK_READ: (id: string) => `${API_BASE}/users/me/notifications/${id}/read`
  }
} as const

// WebSocket Events
export const WS_EVENTS = {
  CLIENT: {
    SUBSCRIBE_EARTHQUAKES: 'subscribe:earthquakes',
    SUBSCRIBE_EEW: 'subscribe:eew',
    SUBSCRIBE_STATIONS: 'subscribe:stations',
    SUBSCRIBE_NOTIFICATIONS: 'subscribe:notifications',
    UNSUBSCRIBE: 'unsubscribe'
  },
  SERVER: {
    EARTHQUAKE_DETECTED: 'earthquake:detected',
    EEW_ALERT: 'eew:alert',
    INTENSITY_UPDATE: 'intensity:update',
    NOTIFICATION: 'notification:new',
    ERROR: 'error',
    CONNECTED: 'connected'
  }
} as const

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503
} as const

// Cache Keys
export const CACHE_KEYS = {
  EARTHQUAKE: (id: string) => `earthquake:${id}`,
  EARTHQUAKES: 'earthquakes:list',
  EARTHQUAKES_RECENT: 'earthquakes:recent',
  STATION: (id: string) => `station:${id}`,
  STATIONS: 'stations:list',
  WAVEFORM: (eqId: string, stId: string) => `waveform:${eqId}:${stId}`,
  EEW_ALERTS: 'eew:alerts',
  USER_SETTINGS: (userId: string) => `user:settings:${userId}`,
  SESSION: (userId: string) => `session:${userId}`
} as const

// Default Pagination
export const DEFAULT_PAGINATION = {
  PAGE: 1,
  LIMIT: 20,
  MAX_LIMIT: 100
} as const

// Notification Defaults
export const DEFAULT_NOTIFICATION_SETTINGS = {
  INTENSITY_THRESHOLD: 3,
  MAGNITUDE_THRESHOLD: 3.0,
  LOCATION_RADIUS_KM: 100,
  NOTIFY_VIA_EMAIL: true,
  NOTIFY_VIA_PUSH: true,
  NOTIFY_VIA_SOUND: true
} as const

// Time Constants
export const TIME_CONSTANTS = {
  JWT_EXPIRES_IN: '7d',
  REFRESH_TOKEN_EXPIRES_IN: '30d',
  CACHE_TTL_DEFAULT: 3600, // 1 hour
  CACHE_TTL_SHORT: 300, // 5 minutes
  CACHE_TTL_LONG: 86400 // 24 hours
} as const

// Regular Expressions
export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  USERNAME: /^[a-zA-Z0-9_-]{3,16}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  PHONE: /^\+?[\d\s-()]{10,}$/
} as const
