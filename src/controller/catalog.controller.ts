import { Request, Response } from "express"
import { ScrapeType } from "../enums/scrap-type.enum"
import { getProducts } from "../services/ml/api/search.api.service"
import { catalogSummary } from "../services/ml/catalog.service"
import { webScrapeCatalogToProductStrsPredicate } from "../services/ml/scraper/predicate/catalog.predicate.service"
import { webScrapeMlPage } from "../services/ml/scraper/web.scraper.service"

/** Catalog info
 * - Densidade de Líder
 * - Densidade Mercado Gold
 * - Densidade Mercado Platinum
 * - Densidade Full
 * - Densidade coleta
 * - Dispersão preços
 * - Maior preço
 * - Menor preço
 * - Preço Média
 * - Quanto faturou
 * - catalog_old_post Anuncio mais antigo
 * - Categorias relacionadas (vasculhar em todos os anuncios )
 * - catalog_title
 * - catalog_brand
 * - product_id
 * -
 * - summary_created
 * - summary_userId
 * - summary_ttl
 */

const catalog = async (req: Request, res: Response) => {
  const productId = req.query?.productId?.toString()
  const catalogId = req.query?.catalogId?.toString()
  const userId = req.query?.userId?.toString() ?? "1231084821"

  const productProduct = await getProducts(userId, [catalogId])
  res.status(200).json(productProduct)
  // const { catalogReducerValues, userReducerValues } = await catalogSummary({
  //   catalogId,
  //   userId,
  // })

  // res.status(200).json({
  //   productId,
  //   catalogId,
  //   ...userReducerValues,
  //   ...catalogReducerValues,
  // })
}

export default { catalog }
