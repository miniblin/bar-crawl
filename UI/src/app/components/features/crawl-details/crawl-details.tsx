/* tslint:disable:jsx-no-multiline-js max-line-length */
import './styles.css'

import { Button, Classes, Dialog, Intent } from '@blueprintjs/core'
import * as React from 'react'

export interface IProps {
  crawlRoute: google.maps.DirectionsResult
  pubsInCrawl: google.maps.places.PlaceResult[]

}

// tslint:disable-next-line:no-empty-interface
export interface IDispatchProps {

}

export default function CrawlDetails (props: IProps & IDispatchProps) {
  const { crawlRoute, pubsInCrawl } = props
  if (pubsInCrawl) {
    return (

        <div className={'crcawl-details'}>
            <p>
                Pubs in Crawl:
                {pubsInCrawl.map((pub, index) => ` ${pub.name} > `)}
            </p>
            <p>
                {`Number of pubs in Crawl: ${pubsInCrawl.length}`}
            </p>
            <p>
                {`total Distance: ${crawlRoute && crawlRoute.routes[0].legs.reduce(reduceFunction,0) / 1000}Km`}
            </p>
        </div>
    )
  } else return (null)

}

const reduceFunction = (total: number,current: google.maps.DirectionsLeg) => total + current.distance.value
