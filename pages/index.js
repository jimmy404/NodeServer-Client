import React, { useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import authContext from '../context/auth/authContext';
import Link from 'next/link';

const Index = () => {

  const AuthContext = useContext(authContext);
  const { authenticatedUser } = AuthContext;

  useEffect(() => {
    authenticatedUser();
  }, []);

  return(
    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
        <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
          <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
            <p>Dropzone here</p>
          </div>
          <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
            <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">Share files easily and privately</h2>
            <p className="text-lg leading-loose">
              <span className="text-red-500 font-bold">ReactNodeSend </span>Allows you to share files with end-to-end encryption and a file that is deleted after it is downloaded. You can keep what you share private and make sure your stuff doesn't stay online forever.
            </p>
            <Link href="/createaccount">
              <a className="text-red-500 font-bold text-lg hover:text-red-700">Create an account for more benefits.</a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Index;
