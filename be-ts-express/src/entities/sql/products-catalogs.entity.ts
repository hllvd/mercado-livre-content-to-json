import { Entity, Column, PrimaryColumn, Index, ManyToOne } from "typeorm"
import { Seller } from "./seller.entity"

enum EntityType {
  product,
  catalog,
}

@Entity()
@Index("IDX_CUSTOM_INDEX", ["id", "type"])
export class ProductsCatalogs {
  @PrimaryColumn({ unique: true })
  id: string

  @Column({ type: "tinyint" })
  type: EntityType

  @Column({ nullable: true })
  title: string

  @Column({ nullable: true })
  categoryId: string

  @Column({ nullable: true, type: "varchar", length: 16 })
  officialStoreId: string

  @Column({ nullable: true, type: "float" })
  price: number

  @Column({ nullable: true, type: "float" })
  basePrice: number

  @Column({ nullable: true, type: "float" })
  originalPrice: number

  @Column({ nullable: true, type: "varchar", length: 32 })
  listingTypeId: string

  @Column({ nullable: true })
  permalink: string

  @Column({ nullable: true })
  videoId: string

  @Column({ type: "varchar", length: 100, nullable: true })
  ean: string

  @Column({ nullable: true })
  thumbnail: string

  @Column({ nullable: true })
  health: number

  @Column({ nullable: true })
  shippingFreeShipping: boolean

  @Column({ nullable: true, type: "varchar", length: 20 })
  shippingLogisticType: string

  @Column({ nullable: true, type: "varchar", length: 15 })
  catalogProductId: string

  @Column({ nullable: true })
  catalogListing: boolean

  @Column({ nullable: true, type: "varchar", length: 27 })
  dateCreated: string

  @ManyToOne(() => Seller, (seller) => seller.id)
  seller: Seller
}
/**
- catalog_old_post Anuncio mais antigo
* - Categorias relacionadas (vasculhar em todos os anuncios )
* - catalog_title
* - catalog_brand
* - product_id
*
* - summary_created
* - summary_userId
* - summary_ttl
**/
