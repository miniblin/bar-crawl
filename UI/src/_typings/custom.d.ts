declare module 'react-google-maps/lib/components/addons/MarkerWithLabel' {
    import { Component } from 'react'

    export interface MarkerWithLabelOptions extends MarkerWithLabelProps {
        position: any;
    }

    export interface MarkerWithLabelProps extends google.maps.Marker {
        crossImage?: string;
        handCursor?: string;
        labelAnchor?: any;
        labelClass?: string;
        labelContent?: any;
        labelInBackground?: boolean;
        labelStyle?: any;
        labelVisible?: boolean;
        optimized?: boolean;
        raiseOnDrag?: boolean;
    }

    export default class MarkerWithLabel extends Component<any> { }
}

