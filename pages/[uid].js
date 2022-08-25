
function userIdPage(props) {
  return (
    <h1>{props.id}</h1>
  )
}

export default userIdPage;

export async function getServerSideProps(context) {
  const { params } = context;

  const userId = params.uid;

  return {
    props: {
      id: "userid-" + userId
    }
  }

}