import Layout from '../../components/Layout';
import clienteAxios from '../../config/axios';
import React, { useState } from 'react';
import appContext from '../../context/app/appContext';

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
  const [ havePassword, setHavePassword ] = useState(link.password);
  const [ password, setPassword ] = useState('');

  const checkPassword = async e => {
    e.preventDefault();
    const data = {
      password
    }
    try {
      const result = await clienteAxios.post(`/api/links/${link.link}`, data);
      setHavePassword(result.data.password);
    } catch (error) {
      console.log(error.response.data.msg)
    }
  }

  return(
    <Layout>
      {
        havePassword ? (
          <>
            <p className="text-center">Protected link, please enter password</p>
            <div className="flex justify-center mt-5">
              <div className="w-full max-w-lg">
                <form
                    className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                    onSubmit={ e => checkPassword(e) }
                >
                  <div className="mb-4">
                      <label
                          className="block text-black text-sm font-bold mb-2"
                          htmlFor="password"
                      >Password</label>
                      <input
                          type="password"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="password"
                          placeholder="Password link"
                          value={password}
                          onChange={ e => setPassword(e.target.value) }
                      />
                  </div>
                  <input
                      type="submit"
                      className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold"
                      value="Password validate"
                  />
                </form>
              </div>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-4xl text-center text-gray-700">Download your file:</h1>
            <div className="flex items-center justify-center mt-10">
              <a
                href={`${process.env.backendURL}/api/files/${link.file}`}
                className="bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer">Here</a>
            </div>
          </>
        )
      }
    </Layout>
  );
}
