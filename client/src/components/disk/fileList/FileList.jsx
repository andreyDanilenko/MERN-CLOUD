import React from 'react';
import { useSelector } from 'react-redux';
import File from './file/File';
import './fileList.scss';

function FileList() {
    const files = useSelector(state => state.files.files);
 
    return (
        <div className="file-list">
            <div className="file-list__header">
                <div className="file-list__name">Название</div>
                <div className="file-list__date">Дата</div>
                <div className="file-list__size">Размер</div>
            </div>
            {files.map(file => <File key={file._id} file={file} />)}
        </div>
    )
}

export default FileList
