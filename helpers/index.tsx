import cookieParser from 'cookie-parser'

export function parseCookies(req: Request) {
  //@ts-ignore
  return cookieParser(req ? req.headers.cookie || '' : '')
}
