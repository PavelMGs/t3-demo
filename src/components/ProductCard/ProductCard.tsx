import { Product } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ProductCard: React.FC<Product> = (props) => {
  return (
    <Link href={`/${props.id}`} className='flex flex-col shadow-md hover:shadow-xl hover:scale-105 duration-300 rounded-lg overflow-hidden bg-white'>
      <span className='text-center w-full'>{props.productName}</span>
      <img src={props.imageURLs[0]} alt="" />
      {/* <Image src={props.imageURLs[0] as string} alt="" /> */}
      <span className='text-center w-full'>{props.price}</span>
    </Link>
  )
}

export default ProductCard