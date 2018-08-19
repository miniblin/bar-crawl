/* tslint:disable:jsx-no-multiline-js max-line-length */
import './styles.css'

import { Button, Classes, Dialog, Intent } from '@blueprintjs/core'
import * as React from 'react'

export interface IProps {
  selectedPub: google.maps.places.PlaceResult
  pubsInCrawl: google.maps.places.PlaceResult[]
  isPubInCrawl: boolean
}

export interface IDispatchProps {
  setCurrentlySelectedPub: () => void
  addPubToCrawl: (pub: any) => void
  setCrawlRoute: (route: any) => void
}

// tslint:disable-next-line:cognitive-complexity
export default function PubDetails (props: IProps & IDispatchProps) {
  const { selectedPub } = props
  const handleClose = () => props.setCurrentlySelectedPub()// set current pub to undefined

  const handleAddPubToCrawl = (selected: any) => {
    const DirectionsService = new google.maps.DirectionsService()
    const [first, ...wayPoints] = props.pubsInCrawl
    if (first) {
      DirectionsService.route({
        destination: selected.geometry.location,
        origin: props.pubsInCrawl[0].geometry.location,
        travelMode: google.maps.TravelMode.WALKING,
        waypoints: wayPoints ? wayPoints.map((point) => ({ location: point.geometry.location, stopover: true })) : []
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          props.setCrawlRoute(result)
        } else {
          // tslint:disable-next-line:no-console
          console.error(`error fetching directions ${result}`)
        }
      })
    }
    props.addPubToCrawl(selected)
  }

  return (
        <div className={'pub-details'}>

            <Dialog
                className={'pub-details__dialog'}
                icon='info-sign'
                onClose={handleClose}
                title={selectedPub && selectedPub.name}
                isOpen={!!(props.selectedPub)}
            >
                <div className={Classes.DIALOG_BODY}>
                    <p>
                        {selectedPub && selectedPub.price_level}
                    </p>
                    <p className={'photos'}>
                        {selectedPub && selectedPub.photos && selectedPub.photos.map((image, index) => <img key={index} src={image.getUrl({ maxWidth: 200, maxHeight: 200 })} />)}
                    </p>
                    <p>
                        {selectedPub && selectedPub.opening_hours && selectedPub.opening_hours.weekday_text}
                    </p>
                    <p>
                        {selectedPub && selectedPub.rating}
                    </p>
                    <p>
                        {selectedPub && selectedPub.url}
                    </p>

                </div>
                <div className={Classes.DIALOG_FOOTER}>
                    <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                        <Button onClick={handleClose}>Close</Button>
                        <Button
                            intent={Intent.PRIMARY}
                            // tslint:disable-next-line:jsx-no-lambda
                            onClick={() => handleAddPubToCrawl(props.selectedPub)}
                            disabled={props.isPubInCrawl}
                        >
                            {!props.isPubInCrawl ? 'Add Pub To Crawl!' : 'Pub is in Crawl!'}
                        </Button>
                    </div>
                </div>
            </Dialog>
        </div>
  )

}
