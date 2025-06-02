import type { IncomingMessage, ServerResponse } from 'http';

export type Request = IncomingMessage & { cookies: Record<string, string> };
export type Response = ServerResponse;

/**
 * Object to store client config
 */
export default class ClientConfig {
  config: Record<string, unknown>;

  req: Request | null;

  res: Response | null;

  constructor(
    config: Record<string, unknown>,
    req: Request | null = null,
    res: Response | null = null
  ) {
    this.config = config;
    this.req = req;
    this.res = res;
  }
}
