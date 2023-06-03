// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { payload } from '@/data/payload'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const data = { ...payload } ;
  data.data = data.data.filter((item) => item.info.available).slice(0, 20)
  return res.send(data)
}
