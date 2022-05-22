import dbConnect from '../../../utils/dbConnect'
import Note from "../../../models/Notes"
// import { v4 as uuidv4 } from 'uuid'


/**
 * 
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 */


export default async function NoteId(req, res) {

  const { method } = req
  const { id } = req.query

  if (method === 'PUT') {
    const { title, description, completed } = req.body;

    await dbConnect()
    const note = await Note.findByIdAndUpdate({ _id: id }, { $set: req.body }, { new: true })

    res.json(note)
  }

  if (method === 'DELETE') {
    await dbConnect()
    const note = await Note.findByIdAndDelete({ _id: id })
    res.json(note)
  }
}