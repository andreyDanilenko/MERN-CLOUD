import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideUploader } from '../../../reducers/uploadReducer';
import './uploader.scss';
import UploaderFile from './UploaderFile';


function Uploader() {
    const files = useSelector(state => state.upload.files);
    const isVisible = useSelector(state => state.upload.isVisible);
    const dispatch = useDispatch()

    console.log(files);

    function closeClickHunndler(evt) {
        evt.stopPropagation();
        dispatch(hideUploader())
    };


    return (isVisible &&
        <div className="uploader">
            <div className="uploader__header">
                <h2 className="uploader__title">Загрузка</h2>
                <button className="uploader__close" onClick={(evt) => closeClickHunndler(evt)}></button>
            </div>
            {files.map(file => <UploaderFile key={file.id} file={file} />)}
        </div>
    )
}

export default Uploader
