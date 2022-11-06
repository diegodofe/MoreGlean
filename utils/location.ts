import { GeoPoint } from 'firebase/firestore'

/*
 * Returns the distance between two GeoPoints in km
 * https://www.geeksforgeeks.org/program-distance-two-points-earth/#:~:text=For%20this%20divide%20the%20values,is%20the%20radius%20of%20Earth
 */
export default async function calculateDistance(p1: GeoPoint, p2: GeoPoint) {
  const lon1 = (p1.longitude * Math.PI) / 180
  const lon2 = (p2.longitude * Math.PI) / 180
  const lat1 = (p1.latitude * Math.PI) / 180
  const lat2 = (p2.latitude * Math.PI) / 180

  const dlon = lon2 - lon1
  const dlat = lat2 - lat1
  const a =
    Math.sin(dlat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) ** 2

  const d = 2 * Math.asin(Math.sqrt(a)) * 6371

  return Math.round(d)
}
