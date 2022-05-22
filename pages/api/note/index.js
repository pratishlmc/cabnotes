import dbConnect from '../../../utils/dbConnect'
import Note from "../../../models/Notes"


/**
 * 
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 */


export default async function Notes(req, res) {

  const { method } = req

  if (method === 'POST') {
    const { title, description } = req.body;
    await dbConnect()
    const note = await Note.create(req.body)

    res.json({ note })
  }

  if (method === 'GET') {
    await dbConnect()

    const note = await Note.find({})

    res.json(note)
  }
}