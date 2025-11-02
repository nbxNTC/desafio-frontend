type LogSeverity = 'info' | 'warn' | 'error'

interface LogInfo {
  severity: LogSeverity
  context: string
  message?: any
  payload?: Record<string, unknown>
  stack?: any
}

export function log({ severity, context, message, payload, stack }: LogInfo) {
  const isClient = typeof window !== 'undefined'
  if (isClient) return

  const timestamp = new Date().toISOString()

  const content = {
    severity,
    timestamp,
    context,
    message,
    payload,
    stack
  }

  console[severity](JSON.stringify(content, null, 2))
}
