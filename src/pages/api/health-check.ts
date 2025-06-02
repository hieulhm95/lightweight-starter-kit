/**
 * Health check endpoint for probes
 */
export default function handler(req, res) {
  res.status(200).end('OK');
}
