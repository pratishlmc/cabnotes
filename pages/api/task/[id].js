import dbConnect from '../../../utils/dbConnect'
import Task from "../../../models/Task"


/**
 * 
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 */


export default async function TaskId(req, res) {

  const { method } = req
  const { id } = req.query

  if (method === 'PUT') {
    const { content, completed } = req.body;

    await dbConnect()
    const task = await Task.findByIdAndUpdate({ _id: id }, { $set: req.body }, { new: true })

    res.json(task)
  }

  if (method === 'DELETE') {
    await dbConnect()
    const task = await Task.findByIdAndDelete({ _id: id })
    res.json(task)
  }
}