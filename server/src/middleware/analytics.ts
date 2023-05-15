import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { NextFunction, Request, Response } from "express";
import * as Sentry from "@sentry/node";

const prisma = new PrismaClient()

export async function analyticsMiddleware (req: Request, res: Response, next: NextFunction) {
  try {
    const startTime = process.hrtime();
    const analyticsData = {
      url: req.originalUrl,
      method: req.method,
      timestamp: new Date(),
      userAgent: req.headers['user-agent'] as string | null,
      referer: req.headers.referer as string | null,
      responseTime: 0,
      status_code: 0,
    }

    res.on('finish', async () => {
      const statusCode = res.statusCode;
      const endTime = process.hrtime(startTime)
      const responseTimeInMs = endTime[0] * 1000 + endTime[1] / 1000000;
      analyticsData.responseTime = responseTimeInMs
      analyticsData.status_code = statusCode;

      await prisma.analytics.create({
        data: analyticsData
      })
      
      if (statusCode >= 400 && statusCode < 500) {
        const error = new Error('Client Error');
        Sentry.configureScope((scope) => {
          scope.setTag('route', req.path);
          scope.setExtra('requestUrl', req.originalUrl);
          scope.setExtra('requestMethod', req.method);
          scope.setExtra('requestHeaders', req.headers);
        });
        Sentry.captureException(error);
      } else if (statusCode >= 500) {
        const error = new Error('Server Error');
        Sentry.configureScope((scope) => {
          scope.setTag('route', req.path);
          scope.setExtra('requestUrl', req.originalUrl);
          scope.setExtra('requestMethod', req.method);
          scope.setExtra('requestHeaders', req.headers);
        });
        Sentry.captureException(error);
      }
      
    })

    next();
  } catch (err) {
    console.error('Error saving analystics data: ', err)
  }
}