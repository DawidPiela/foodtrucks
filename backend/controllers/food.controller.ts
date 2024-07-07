import { Request, Response } from 'express'
import { getAllFood } from '../services/food.service'

export const all = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.query as string;
    const result = await getAllFood(searchTerm)
    return res.status(200).send(result)
  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: 'Something went wrong' })
  }
}