// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { payload } from '@/data/payload'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { id } = req.query

  const data = { ...payload };

  if(!id) {
    return res.status(404);
  }

  const result = data.data.filter((item) => item.info.id === id.toString()).slice(0,1); // Get one since there are duplicates in the payload
  res.send(result)
}
