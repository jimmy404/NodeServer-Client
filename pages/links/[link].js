import Layout from '../../components/Layout';
import clienteAxios from '../../config/axios';

export async function getServerSideProps({params}) {
  const { link } = params;
  const result = await clienteAxios.get(`/api/links/${link}`);
  return {
    props: {
      link: result.data
    }
  }
}

export async function getServerSidePaths() {
  const links = await clienteAxios.get('/api/links');

  return {
    path: links.data.links.map( link => ({
      params: { link: link.url}
    })),
    fallback: false
  }
}

export default ({link}) => {
  console.log(link)
  return(
    <Layout>
      <h1>From [link].js</h1>
    </Layout>
  );
}
