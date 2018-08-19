import './styles.css'

import CrawlDetails from 'app/components/features/crawl-details'
import MapWithAMarker from 'app/components/features/map'
import PubDetails from 'app/components/features/pub-details'
import store from 'app/state/store'
import * as React from 'react'
import { match as routeMatch } from 'react-router-dom'
interface IProps {
  className?: string,
  match: routeMatch<{}>
}

export default function BarCrawl (props: IProps) {
  const { className, match } = props
  const contentClass = 'bar-crawl-page__content'
  const key = 'AIzaSyAGozVVU7IXSyD4kpa3cGx-DZQvthVfSm8'

  return (
    <section className={'bar-crawl-page'}>

      <MapWithAMarker
        // tslint:disable-next-line:max-line-length
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${key}&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `70%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
      <CrawlDetails />
      <PubDetails />
    </section>
  )
}
