import { Pane } from 'evergreen-ui'
import Head from 'next/head'
import GroupThumbnail from '../../components/GroupThumbnail'
import useGroups from '../../hooks/useGroups'

export default function Group() {
  const { groups } = useGroups()
  return (
    <>
      <Head>
        <title>MoreGlean</title>
      </Head>

      <Pane display='flex' flexDirection='column' gap={32}>
        {groups.map((group) => (
          <GroupThumbnail key={group.id} group={group} />
        ))}
      </Pane>
    </>
  )
}
