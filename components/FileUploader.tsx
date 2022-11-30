import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import React, { useRef } from 'react'
import { ITrack } from '../types/tracks'
import TrackItem from './TrackItem'

interface IFileUploaderProps {
    setFile: Function,
    accept: string,
    children: any
}

const FileUploader:React.FC<IFileUploaderProps> = ({setFile, accept, children}) => {
    const ref=useRef<HTMLInputElement>() as React.MutableRefObject<HTMLInputElement>

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
       e.target.files  && e.target.files.length !== 0 && setFile(e.target.files[0]  )
    }
    return (
        <div onClick={() => ref.current.click()}>
            <input 
                type="file"
                accept={accept}
                style={{display: 'none'}}
                ref={ref}
            />
            {children}
        </div>
    )
}

export default FileUploader