import { NextFunction, Response } from "express"
import { RequestExtended } from "../models/extends/params/request-custom.model"
import { getChildCategories } from "../services/ml/categories.service"

const children = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction
) => {
  const categoryId = req.query?.categoryId?.toString()
  const userId = req.query?.userId?.toString() ?? "1231084821"
  const listOfCats = await getChildCategories({ categoryId, userId })
  console.log("listOfCats", listOfCats)
  res.status(200).json({})
}

export default { children }
