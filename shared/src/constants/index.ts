// shared/src/constants/index.ts

/**
 * Shared constants used across frontend and backend
 */

// Earthquake Magnitude Classifications
export const MAGNITUDE_SCALES = {
  MICRO: { min: 0, max: 2.9, label: 'Micro', color: '#90EE90' },
  MINOR: { min: 3, max: 3.9, label: 'Minor', color: '#FFD700' },
  LIGHT: { min: 4, max: 4.9, label: 'Light', color: '#FFA500' },
  MODERATE: { min: 5, max: 5.9, label: 'Moderate', color: '#FF4500' },
  STRONG: { min: 6, max: 6.9, label: 'Strong', color: '#FF0000' },
  MAJOR: { min: 7, max: 7.9, label: 'Major', color: '#8B0000' },
  GREAT: { min: 8, max: 10, label: 'Great', color: '#4B0000' }
} as const

// Japan Meteorological Agency Intensity Scale
export const JMA_INTENSITY_SCALE = {
  0: { label: 'Not felt', shortLabel: '0', color: '#CCCCCC' },
  1: { label: 'Weak', shortLabel: '1', color: '#90EE90' },
  2: { label: 'Light', shortLabel: '2', color: '#FFD700' },
  3: { label: 'Moderate', shortLabel: '3', color: '#FFA500' },
  4: { label: 'Strong', shortLabel: '4', color: '#FF6347' },
  5: { label: 'Very strong', shortLabel: '5-', color: '#FF0000' },
  51: { label: 'Severe (Lower)', shortLabel: '5+', color: '#DC143C' },
  52: { label: 'Severe (Upper)', shortLabel: '5+', color: '#C41E3A' },
  6: { label: 'Very severe', shortLabel: '6-', color: '#8B0000' },
  61: { label: 'Violent (Lower)', shortLabel: '6+', color: '#690000' },
  62: { label: 'Violent (Upper)', shortLabel: '6+', color: '#4B0000' },
  7: { label: 'Extreme', shortLabel: '7', color: '#1a0000' }
} as const

// Acceleration Levels (gal)
export const ACCELERATION_LEVELS = {
  MICRO: { min: 0, max: 10, label: 'Micro', unit: 'gal' },
  WEAK: { min: 10, max: 30, label: 'Weak', unit: 'gal' },
  LIGHT: { min: 30, max: 80, label: 'Light', unit: 'gal' },
  MODERATE: { min: 80, max: 250, label: 'Moderate', unit: 'gal' },
  STRONG: { min: 250, max: 600, label: 'Strong', unit: 'gal' },
  VERY_STRONG: { min: 600, max: 1000, label: 'Very Strong', unit: 'gal' },
  EXTREME: { min: 1000, max: 10000, label: 'Extreme', unit: 'gal' }
} as const

// Japan Regions
export const JAPAN_REGIONS = {
  HOKKAIDO: { code: 'hokkaido', label: 'Hokkaido', bbox: [[41.4, 140.0], [45.8, 148.6]] },
  HONSHU: { code: 'honshu', label: 'Honshu', bbox: [[30.4, 129.4], [41.6, 145.9]] },
  SHIKOKU: { code: 'shikoku', label: 'Shikoku', bbox: [[32.6, 130.4], [34.8, 135.1]] },
  KYUSHU: { code: 'kyushu', label: 'Kyushu', bbox: [[30.3, 129.5], [34.7, 131.0]] },
  OKINAWA: { code: 'okinawa', label: 'Okinawa', bbox: [[24.0, 123.0], [27.1, 131.3]] },
  TOKYO: { code: 'tokyo', label: 'Tokyo', bbox: [[35.5, 139.4], [35.8, 140.1]] },
  OSAKA: { code: 'osaka', label: 'Osaka', bbox: [[34.3, 135.0], [34.8, 135.6]] },
  KYOTO: { code: 'kyoto', label: 'Kyoto', bbox: [[34.7, 135.2], [35.7, 136.0]] },
  JAPAN: { code: 'japan', label: 'Japan (All)', bbox: [[30.4, 129.4], [45.8, 148.6]] }
} as const

// Earthquake Event Types
export const EVENT_TYPE_LABELS = {
  earthquake: { label: 'Earthquake', icon: '🌍', color: '#FF4500' },
  tsunami: { label: 'Tsunami', icon: '🌊', color: '#0066CC' },
  other: { label: 'Other', icon: '📍', color: '#808080' }
} as const

// Data Sources
export const DATA_SOURCE_LABELS = {
  jma: { label: 'Japan Meteorological Agency', shortLabel: 'JMA', url: 'https://www.jma.go.jp/' },
  kyoshin: { label: 'Kyoshin Network', shortLabel: 'K-NET', url: 'https://www.kyoshin.bosai.go.jp/' },
  'dm-d.s.s': { label: 'Disaster Management - Data Support System', shortLabel: 'DM-D.S.S', url: 'https://dmdata.jp/' }
} as const

// Station Networks
export const STATION_NETWORKS = {
  'K-NET': { label: 'K-NET', description: 'Kyoshin Network' },
  'KiK-net': { label: 'KiK-net', description: 'Kiban Kyoshin Network' }
} as const

// Notification Types
export const NOTIFICATION_TYPE_LABELS = {
  earthquake: { label: 'Earthquake Alert', icon: '🌍', color: '#FF4500' },
  eew: { label: 'Early Warning', icon: '⚠️', color: '#FFD700' },
  system: { label: 'System', icon: '🔔', color: '#0066CC' }
} as const

// Time Formats
export const TIME_FORMATS = {
  ISO: 'YYYY-MM-DDTHH:mm:ssZ',
  JAPANESE_SHORT: 'YYYY年MM月DD日 HH:mm',
  JAPANESE_LONG: 'YYYY年MM月DD日 HH:mm:ss',
  US_SHORT: 'MM/DD/YYYY HH:mm',
  US_LONG: 'MM/DD/YYYY HH:mm:ss'
} as const

// Cache Duration (seconds)
export const CACHE_DURATION = {
  VERY_SHORT: 30,
  SHORT: 300, // 5 minutes
  MEDIUM: 3600, // 1 hour
  LONG: 86400, // 24 hours
  VERY_LONG: 604800 // 7 days
} as const

// API Rate Limits
export const RATE_LIMITS = {
  GENERAL: { requests: 10, windowMs: 1000 }, // 10 req/sec
  API: { requests: 100, windowMs: 1000 }, // 100 req/sec
  AUTH: { requests: 5, windowMs: 60000 }, // 5 req/min
  UPLOAD: { requests: 2, windowMs: 1000 } // 2 req/sec
} as const

// User Roles
export const USER_ROLE_PERMISSIONS = {
  admin: {
    canManageUsers: true,
    canManageSettings: true,
    canViewAnalytics: true,
    canExportData: true,
    canBroadcastMessages: true
  },
  user: {
    canManageUsers: false,
    canManageSettings: true,
    canViewAnalytics: false,
    canExportData: true,
    canBroadcastMessages: false
  }
} as const

// Default Configuration
export const DEFAULT_CONFIG = {
  MAP_ZOOM: 5,
  MAP_CENTER: [36.2048, 138.2529], // Japan center
  EARTHQUAKE_POLL_INTERVAL: 30000, // 30 seconds
  EEW_POLL_INTERVAL: 10000, // 10 seconds
  MAX_HISTORICAL_DAYS: 90,
  ITEMS_PER_PAGE: 20,
  MAX_ITEMS_PER_PAGE: 100,
  WAVEFORM_UPDATE_INTERVAL: 1000, // 1 second
  SESSION_TIMEOUT: 3600000, // 1 hour
  DEBOUNCE_DELAY: 300 // 300ms
} as const

// Color Schemes
export const COLOR_SCHEMES = {
  LIGHT: {
    primary: '#0066CC',
    secondary: '#666666',
    background: '#FFFFFF',
    surface: '#F5F5F5',
    text: '#000000',
    border: '#CCCCCC',
    success: '#22AA44',
    error: '#CC2222',
    warning: '#FF9900',
    info: '#0066CC'
  },
  DARK: {
    primary: '#4499FF',
    secondary: '#AAAAAA',
    background: '#1A1A1A',
    surface: '#2A2A2A',
    text: '#FFFFFF',
    border: '#444444',
    success: '#44CC44',
    error: '#FF4444',
    warning: '#FFAA00',
    info: '#4499FF'
  }
} as const

// Validation Rules
export const VALIDATION_RULES = {
  EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  USERNAME_PATTERN: /^[a-zA-Z0-9_-]{3,16}$/,
  PASSWORD_PATTERN: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  PHONE_PATTERN: /^\+?[\d\s-()]{10,}$/,
  MIN_PASSWORD_LENGTH: 8,
  MAX_USERNAME_LENGTH: 16,
  MIN_USERNAME_LENGTH: 3
} as const

// Status Codes & Messages
export const STATUS_MESSAGES = {
  200: { message: 'Success', type: 'success' },
  201: { message: 'Created', type: 'success' },
  400: { message: 'Bad Request', type: 'error' },
  401: { message: 'Unauthorized', type: 'error' },
  403: { message: 'Forbidden', type: 'error' },
  404: { message: 'Not Found', type: 'error' },
  409: { message: 'Conflict', type: 'error' },
  429: { message: 'Too Many Requests', type: 'warning' },
  500: { message: 'Internal Server Error', type: 'error' },
  503: { message: 'Service Unavailable', type: 'error' }
} as const

// Local Storage Keys
export const STORAGE_KEYS = {
  USER: 'quakewatch:user',
  ACCESS_TOKEN: 'quakewatch:accessToken',
  REFRESH_TOKEN: 'quakewatch:refreshToken',
  THEME: 'quakewatch:theme',
  LANGUAGE: 'quakewatch:language',
  SIDEBAR_STATE: 'quakewatch:sidebarOpen',
  MAP_STATE: 'quakewatch:mapState',
  NOTIFICATION_SETTINGS: 'quakewatch:notificationSettings',
  FAVORITE_REGIONS: 'quakewatch:favoriteRegions'
} as const

// Environment Detection
export const ENVIRONMENTS = {
  DEVELOPMENT: 'development',
  STAGING: 'staging',
  PRODUCTION: 'production'
} as const

// Feature Flags
export const FEATURE_FLAGS = {
  ENABLE_WAVEFORM_EXPORT: true,
  ENABLE_SOUND_ALERTS: true,
  ENABLE_PUSH_NOTIFICATIONS: true,
  ENABLE_EMAIL_NOTIFICATIONS: true,
  ENABLE_ADVANCED_ANALYTICS: false,
  ENABLE_BETA_FEATURES: false
} as const

// Fallback Values
export const FALLBACK_VALUES = {
  DEFAULT_MAGNITUDE: 0,
  DEFAULT_DEPTH: 0,
  DEFAULT_INTENSITY: 0,
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  DEFAULT_REGION: 'japan',
  DEFAULT_DAYS: 1
} as const

// External Service URLs
export const EXTERNAL_URLS = {
  JMA: 'https://www.jma.go.jp/',
  KYOSHIN: 'https://www.kyoshin.bosai.go.jp/',
  USGS: 'https://earthquake.usgs.gov/',
  GFZ: 'https://www.gfz-potsdam.de/',
  GITHUB: 'https://github.com/siri09202-arch/QuakeWatch'
} as const

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  INVALID_EMAIL: 'Please enter a valid email address.',
  INVALID_PASSWORD: 'Password must be at least 8 characters with uppercase, lowercase, number and special character.',
  USERNAME_TAKEN: 'This username is already taken.',
  EMAIL_TAKEN: 'This email is already registered.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  SESSION_EXPIRED: 'Your session has expired. Please log in again.',
  SERVER_ERROR: 'An unexpected server error occurred.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.'
} as const

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'You have been logged in successfully.',
  REGISTER_SUCCESS: 'Your account has been created successfully.',
  UPDATE_SUCCESS: 'Your changes have been saved successfully.',
  LOGOUT_SUCCESS: 'You have been logged out successfully.',
  DELETE_SUCCESS: 'The item has been deleted successfully.',
  COPY_SUCCESS: 'Copied to clipboard.'
} as const
