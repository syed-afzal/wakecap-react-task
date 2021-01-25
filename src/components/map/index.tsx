import React, {useEffect, useState} from 'react';
import * as locationData from './../../data/countriesList.json';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    map: {
        height: '94%', 
        width: '100%'
    }
}))

var map: any;
var markers = [];
var infowindow: any;
const API_KEY =
  "AIzaSyCaU49TyCMquTLSYekygqEgvoY2_D2Mtks";

declare var google: any

const Map = (props: any) => {

    const [selectedLocation, setSelectedLocation] = useState(null);
    const classes = useStyles();

    useEffect(() => {
        if (props?.location?.locationId) {
            locationData?.locations?.length > 0 && setSelectedLocation(locationData.locations.find(x => x.id === props.location.locationId))
        }
    }, [props.location, locationData]);

    useEffect(() => {
        if (selectedLocation) {
            if (!window.google) {
                const script = document.createElement("script");
                script.type = "text/javascript";
                script.src =
                  `https://maps.googleapis.com/maps/api/js?key=` +
                  API_KEY +
                  `&libraries=places,geometry`;
                script.id = "googleMaps";
                script.async = true;
                script.defer = true;
                document.body.appendChild(script);
                script.addEventListener("load", e => {
                   onScriptLoad();
                });
              } else {
                onScriptLoad();
              }
              var marker = new google.maps.Marker({
                position: { lat: -25.344, lng: 131.036 },
                map: map
              });
        }
    }, [selectedLocation]);

    const onScriptLoad = () => {
        const loc = new google.maps.LatLng(selectedLocation?.position[0], selectedLocation?.position[1]);
        const mapOptions = {
          zoom: 10,
          center: loc,
          scrollwheel: true
        };
        map = new window.google.maps.Map(
          document.getElementById(props.id),
          mapOptions
        );
        props.onMapLoad(map);
        createMarker(selectedLocation?.name, loc);
      }

    const createMarker = (name: string, loc: any) => {
        let marker = new google.maps.Marker({
          map: map,
          position: loc,
          title: name
        });
        markers.push(marker);
    
        infowindow = new google.maps.InfoWindow();
        const tooltip = `${props?.location?.name} Located in ${selectedLocation?.name} `
    
        marker.addListener("click", () => {
          infowindow.setContent(tooltip);
          infowindow.open(map, marker);
        });
      }

    return (
        <div className={classes.map} id={props.id} />
    )
}
export default Map;