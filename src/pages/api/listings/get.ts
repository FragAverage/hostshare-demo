// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { payload } from '@/data/payload'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { location } = req.query

  if(!location) {
    payload.data = payload.data.filter((item) => item.info.available).slice(0, 20)
    res.send(payload)
  }else{
    payload.data = payload.data.filter((item) => item.info.location.city.toLowerCase() === location.toString().toLowerCase() && item.info.available)
    res.send(payload)
  }
}
