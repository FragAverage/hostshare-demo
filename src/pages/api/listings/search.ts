// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { payload } from '@/data/payload'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { location } = req.query

  const data = { ...payload } ;

  if(!location) {
    return res.status(404);
  }else{
    data.data = data.data.filter((item) => item.info.location.city.toLowerCase() === location.toString().toLowerCase() && item.info.available)
    res.send(data)
  }
}
