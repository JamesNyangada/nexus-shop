import React from 'react';
import Image from 'next/image'
import Link from 'next/link';
import { urlFor } from '../lib/client';
import '../styles/ProductCard.module.css'

export default function ProductCard({ product: { image, name, slug, price } }) {
  return (
    <Link href={`/product/${slug.current}`}>
        <div className="product-card">
            <div className="product-image-container">
                <img
                src={urlFor(image && image[0])}
                width={250}
                height={250}
                alt={name}
                className="product-image"
                />
            </div>
            <div className="product-info">
                <h3 className="product-name">{name}</h3>
                <p className="product-price">Ksh {price.toLocaleString()}</p>
            </div>
        </div>
    </Link>
  )
}

