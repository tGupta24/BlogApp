import React from "react"
import { Hero, PopularCreater } from "../home/index.js"
import { Trending } from "../home/index.js"


export default function Home() {
    return (
        <div >
            <Hero />
            <Trending />
            <PopularCreater />
        </div>
    )
}