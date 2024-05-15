"use client"

import {FC, useState} from 'react';

import "@uploadthing/react/styles.css"
import {Button, GetProp, Upload, UploadFile, UploadProps} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import Image from "next/image";
import {axiosClassic} from "@/api/axios";
import {errorCatch} from "@/api/api.helper";
import {Bounce, toast} from "react-toastify";
import {AxiosResponse} from "axios";

interface IFileUploadProps {
  onChange: (url?: string) => void
  value: string
  endpoint: "messageFile" | "serverImage"
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const FileUpload: FC<IFileUploadProps> = ({endpoint, value, onChange}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  // const {uploadFile} = useFileQuery(endpoint)
  // const {mutate} = uploadFile

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true)
  };

  const handleChange: UploadProps['onChange'] = ({fileList: newFileList}) => {
    setFileList(newFileList);
  }

  const onSend = async () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('file', file.originFileObj as File);
    });

    try {
      const response: AxiosResponse<{ url: string }> = await axiosClassic.post(
        `/files?folder=${endpoint}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      onChange(response.data.url);
    } catch (error) {
      const message = errorCatch(error)
      toast(message, {
        type: "error", autoClose: 2000, position: "bottom-center", transition: Bounce, hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    }
  }

  const uploadButton = (
    <button style={{border: 0, background: 'none'}} type="button">
      <PlusOutlined/>
      <div style={{marginTop: 8}}>Upload</div>
    </button>
  );
  return (
    <>
      <Upload
        listType="picture-circle"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        maxCount={1}
      >
        {fileList.length > 0 ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{display: 'none'}}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
          alt={""}
        />
      )}

      <Button onClick={onSend}> Submit</Button>
    </>
  );
};