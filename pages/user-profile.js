// this cannot use static renderring because you only want the specific user to be able to access. 
// hence this needs to be renderred on demand, when the right user is requesting it

function UserProfilePage(props) {
  return (
    <h1>{props.username}</h1>
  )
}

export default UserProfilePage

export async function getServerSideProps(context) {
  const { params, req, res } = context;

  return {
    props: {
      username: "Max"
    }
  }
}
