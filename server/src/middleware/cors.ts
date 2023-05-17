import { NextFunction, Request, Response } from "express";
import { allowedOrigins } from "../config";

export async function corsMiddleware(req: Request, res: Response, next: NextFunction) {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin!)) {
    res.setHeader('Access-Control-Allow-Origin', origin!);
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    if (req.method === 'OPTIONS') {
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      return res.status(200).end();
    }
  }

  if (!allowedOrigins.includes(origin!)) {
    return res.status(403).send({ error: 'Access denied due to CORS restrictions.' });
  }

  next();
}
