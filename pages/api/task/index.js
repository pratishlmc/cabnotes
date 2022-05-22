import dbConnect from '../../../utils/dbConnect'
import Task from "../../../models/Task"


/**
 * 
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 */


export default async function Tasks(req, res) {

  const { method } = req

  if (method === 'POST') {
    const { content } = req.body;
    await dbConnect()
    const task = await Task.create(req.body)

    res.json({ task })
  }

  if (method === 'GET') {
    await dbConnect()

    const task = await Task.find({})

    res.json(task)
  }
}