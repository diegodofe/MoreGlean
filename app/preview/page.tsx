import CatThumbnail from '../../components/CatThumbnail'
import { CRASH_DOC_ID } from '../../constants/cats'
import { getCatById } from '../../services/cats'

async function getPreviewCat() {
  const welcomeCat = await getCatById(CRASH_DOC_ID)

  return welcomeCat
}
export default async function Preview() {
  const welcomeCat = await getPreviewCat()

  if (!welcomeCat) return <p>Oops, the cat got away...</p>

  return (
    <div>
      <CatThumbnail cat={welcomeCat} />
    </div>
  )
}
