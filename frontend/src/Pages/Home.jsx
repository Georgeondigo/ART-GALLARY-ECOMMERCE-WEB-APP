import React from 'react'
import { Hero } from '../components/Hero/Hero'
import  { Categories } from '../components/Categories/Categories'
import { Explore } from '../components/Explore/Explore'
import { NewProducts } from '../components/NewProducts/NewProducts'
export const Home = () => {
  return (
    <div>
      <Hero/>
      <Categories/>
      <Explore/>
      <NewProducts/>
    </div>
  )
}
