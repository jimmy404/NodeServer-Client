import Axios from 'axios';
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import clienteAxios from '../config/axios';

const Dropzone = () => {

  const onDrop = useCallback( async (acceptedFiles) => {
    console.log(acceptedFiles);

    const formData = new FormData();
    formData.append('file', acceptedFiles[0])

    const result = await clienteAxios.post('/api/files', formData);
    console.log(result)
  }, []);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({onDrop});

  const files = acceptedFiles.map( file => (
    <li key={file.lastModified} className="bg-white flex-1 p-3 mb-4 shadow-lg rounded">
      <p className="font-bold text-xl">{file.path}</p>
      <p className="text-sm text-gray-500">{ (file.size / Math.pow(1024, 2)).toFixed(2) } Mb</p>
    </li>
  ));

  return(
    <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 px-4">
      <ul>
        {files}
      </ul>
      <div {...getRootProps({ className: 'dropzone w-full py-32' })}>
        <input className="h-100" {...getInputProps()} />
          {
            isDragActive ? <p className="text-2xl text-center text-gray-600">Drop the file</p> :
            <div className="text-center">
              <p className="text-2xl text-center text-gray-600">Select a file or drop it here</p>
              <button
                className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800"
                type="button"
              >Select files to upload</button>
            </div>
          }
      </div>
    </div>
  );
}

export default Dropzone;
