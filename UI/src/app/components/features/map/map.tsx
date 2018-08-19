/* tslint:disable:jsx-no-lambda */

import './styles.css'

import store from 'app/state/store'
import * as React from 'react'
import { DirectionsRenderer, GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps'
import InfoBox from 'react-google-maps/lib/components/addons/InfoBox'
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer'
import MarkerWithLabel from 'react-google-maps/lib/components/addons/MarkerWithLabel'
import DrawingManager from 'react-google-maps/lib/components/drawing/DrawingManager'
import SearchBox from 'react-google-maps/lib/components/places/SearchBox'

export interface IProps {
  className?: string,
  pubsInCrawl: any,
  currentResults: any
  currentLocation: any,
  crawlRoute: any
}

interface IState {
  bounds: any,
  center: any,
  markers: any,
  refs: any
}

const labelStyle = {
  backgroundColor: 'rgba(0,0,0,0.3)',
  border: '1px solid grey',
  borderRadius: '5px',
  color: '#ffffff',
  fontSize: '12px',
  fontWeight: 'bold',
  padding: '5',
  textAlign: 'center',
  width: '75px'
}

interface IDispatchPprops {
  setCurrentLocation: (location: any) => void
  setCurrentSearchResults: (results: any) => void
  setCurrentlySelectedPub: (pub: any) => void
}
export default withScriptjs(withGoogleMap(
  class MyMap extends React.Component<IProps & IDispatchPprops, IState> {
    public constructor (props: any) {
      super(props)
      this.state = {
        bounds: null,
        center: undefined,
        markers: [],
        refs: {}
      }
    }

    public componentDidMount () {
      const DirectionsService = new google.maps.DirectionsService()
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          this.props.setCurrentLocation(pos)
          // tslint:disable-next-line:no-console
        }, () => console.log('Couldnt get user location. could be a https issue for external devices'))
      }
    }

    public render () {

      const image = {
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(0, 39),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // This marker is 20 pixels wide by 32 pixels high.
        size: new google.maps.Size(20, 39),
        url: './pint.png'
      }

      const imagePlus = {
        anchor: new google.maps.Point(0, 36),
        origin: new google.maps.Point(0, 0),
        size: new google.maps.Size(36, 36),
        url: './plus-512.png'
      }

      const crawlMarkers = this.props.pubsInCrawl.map((place: any, index: number) => (
        <MarkerWithLabel
          key={index}
          position={place.geometry.location}
          icon={image}
          labelAnchor={new google.maps.Point(40, 70)}
          onClick={() => this.props.setCurrentlySelectedPub(place)}
          // tslint:disable-next-line:max-line-length
          labelStyle={labelStyle}
        >
          <div>{place.name}</div>
        </MarkerWithLabel>
      ))
      const mappedMarkers = this.props.currentResults.map((place: any, index: number) => {
        const zoom = this.state.refs.map.getZoom()
        let labelVisible = true
        if (zoom < 16) {
          labelVisible = false
        }
        return (
          <MarkerWithLabel
            labelVisible={labelVisible}
            key={index}
            icon={imagePlus}
            position={place.geometry.location}
            labelAnchor={new google.maps.Point(40, 70)}
            onClick={() => this.props.setCurrentlySelectedPub(place)}
            // tslint:disable-next-line:max-line-length
            labelStyle={labelStyle}
          >
            <div>{place.name}</div>
          </MarkerWithLabel>
        )
      })

      const stylers: any = [
        ...moreStyles,
        {
          featureType: 'poi.business',
          stylers: [{ visibility: 'off' }]
        },
        {
          elementType: 'labels.icon',
          featureType: 'transit',
          stylers: [{ visibility: 'off' }]
        }
      ]
      const input = (
        <input
          type='text'
          placeholder='Find a Pub!'
          className={'bar-crawl__input'}
          onKeyDown={(event) => event.key === 'Enter' ? (event.target as HTMLInputElement).blur() : null}
        />
      )
      return (
        <div className={'bar-crawl'} >
          <GoogleMap
            ref={this.onMapMounted}
            defaultZoom={15}
            center={this.state.center || this.props.currentLocation}
            onBoundsChanged={this.onBoundsChanged}
            defaultClickableIcons={false}
            defaultOptions={{ disableDefaultUI: true, styles: stylers, gestureHandling: 'greedy' }}
            onZoomChanged={this.handleZoomChanged}
          >
            <SearchBox
              ref={this.onSearchBoxMounted}
              bounds={this.state.bounds}
              controlPosition={google.maps.ControlPosition.TOP_CENTER}
              onPlacesChanged={this.onPlacesChanged}
            >
              {input}
            </SearchBox>
            {mappedMarkers}
            {crawlMarkers}
            {/* tslint:disable-next-line:max-line-length*/}
            {this.props.crawlRoute && <DirectionsRenderer directions={this.props.crawlRoute} options={{ suppressMarkers: true }} />}
          </GoogleMap>
        </div>
      )
    }

    private handleZoomChanged = () => {
      // do a thing
    }
    private onBoundsChanged = () => {
      this.setState({
        bounds: this.state.refs.map.getBounds()
        // center: this.state.refs.map.getCenter()
      })
    }

    private onMapMounted = (ref: any) => {
      this.setState((prevState: any) => ({
        refs: {
          ...prevState.refs,
          map: ref
        }
      }))
    }

    private onSearchBoxMounted = (ref: any) => {

      this.setState((prevState: any) => ({
        refs: {
          ...prevState.refs,
          searchBox: ref
        }
      }))
    }

    private onPlacesChanged = () => {
      const places = this.state.refs.searchBox.getPlaces()
      const bounds = new google.maps.LatLngBounds()
      this.props.setCurrentSearchResults(places)
      places.forEach((place: any) => {
        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport)
        } else {
          bounds.extend(place.geometry.location)
        }
      })

      const nextCenter = places[0].position || this.state.center

      this.setState({
        center: nextCenter
      })
    }

  }))

// TODO
/**
 * search place details from id on click. get more details
 * button to bring up all pubs in area
 * all cocktails in area
 * cheap
 *
 */

const moreStyles = [
  {
    featureType: 'landscape',
    stylers: [
      {
        hue: '#FFAD00'
      },
      {
        saturation: 50.2
      },
      {
        lightness: -34.8
      },
      {
        gamma: 1
      }
    ]
  },
  {
    featureType: 'road.highway',
    stylers: [
      {
        hue: '#FFAD00'
      },
      {
        saturation: -19.8
      },
      {
        lightness: -1.8
      },
      {
        gamma: 1
      }
    ]
  },
  {
    featureType: 'road.arterial',
    stylers: [
      {
        hue: '#FFAD00'
      },
      {
        saturation: 72.4
      },
      {
        lightness: -32.6
      },
      {
        gamma: 1
      }
    ]
  },
  {
    featureType: 'road.local',
    stylers: [
      {
        hue: '#FFAD00'
      },
      {
        saturation: 74.4
      },
      {
        lightness: -18
      },
      {
        gamma: 1
      }
    ]
  },
  {
    featureType: 'water',
    stylers: [
      {
        hue: '#00FFA6'
      },
      {
        saturation: -63.2
      },
      {
        lightness: 38
      },
      {
        gamma: 1
      }
    ]
  },
  {
    featureType: 'poi',
    stylers: [
      {
        hue: '#FFC300'
      },
      {
        saturation: 54.2
      },
      {
        lightness: -14.4
      },
      {
        gamma: 1
      }
    ]
  }
]
