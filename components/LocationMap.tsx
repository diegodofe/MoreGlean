import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api'
import { GeoPoint } from 'firebase/firestore'
import { useMemo } from 'react'

export default function LocationMap({ location }: { location: GeoPoint }) {
  const center = useMemo(
    () => ({ lat: location.latitude, lng: location.longitude }),
    [location.latitude, location.longitude]
  )

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBXHLftgJOGUktfa09s3ykfxF17jqB9uEM',
  })

  if (!isLoaded) return <div>Loading...</div>

  return (
    <GoogleMap zoom={13} center={center} mapContainerClassName='map-container'>
      <MarkerF position={center} />
    </GoogleMap>
  )
}
