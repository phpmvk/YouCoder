import { Analytics, PrismaClient } from "@prisma/client";
import axios from "axios";
import { NextFunction, Request, Response } from "express";

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
      country: null,
      city: null,
      responseTime: 0,
    }

    try {
      console.log('--->',req.ip)
      const response = await axios.get(`http://ip-api.com/json/${req.ip}`)
      const data = response.data;
      analyticsData.country = data.country;
      analyticsData.city = data.city
    } catch (err) {
      console.error('Error retrieving geolocation info: ', err)
    }

    res.on('finish', async () => {
      const endTime = process.hrtime(startTime)
      const responseTimeInMs = endTime[0] * 1000 + endTime[1] / 1000000;
      analyticsData.responseTime = responseTimeInMs

      await prisma.analytics.create({
        data: analyticsData
      })
      
    })

    next();
  } catch (err) {
    console.error('Error saving analystics data: ', err)
  }
}