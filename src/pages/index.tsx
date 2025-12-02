import type {GetServerSideProps} from 'next'

export const getServerSideProps: GetServerSideProps = async () => ({
  redirect: {
    destination: '/zh-hans',
    permanent: false,
  },
})

export default function HomeRedirect() {
  return null
}