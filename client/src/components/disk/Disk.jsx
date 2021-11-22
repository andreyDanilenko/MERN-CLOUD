import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFiles, uploadFile } from '../../actions/file'
import FileList from './fileList/FileList';
import './disk.scss'
import Popup from './Popup';
import { setPopupDisplay, setCurrentDir } from '../../reducers/fileReducer';
import Uploader from './uploader/Uploader';

function Disk() {
    const dispatch = useDispatch();
    const currentDir = useSelector(state => state.files.currentDir);
    const dirStack = useSelector(state => state.files.dirStack);
    const [dragEnter, setDragEnter] = useState(false);


    useEffect(() => {
        dispatch(getFiles(currentDir));
    }, [currentDir]);

    function showPopupHundler() {
        dispatch(setPopupDisplay('flex'));
    };

    function backClickHundler() {
        const backDirId = dirStack.pop();
        dispatch(setCurrentDir(backDirId));
    };

    function fileUploadHundler(evt) {
        const files = [...evt.target.files];
        files.forEach(file => dispatch(uploadFile(file, currentDir)));
    };

    function dragEnterHundler(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        setDragEnter(true);
    };

    function dragLeaveHundler(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        setDragEnter(false);
    };

    function onDropHundler(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        const files = [...evt.dataTransfer.files];
        files.forEach(file => dispatch(uploadFile(file, currentDir)));
        setDragEnter(false)
    };

    return (!dragEnter ?
        <div className="disk" onDragEnter={dragEnterHundler} onDragLeave={dragLeaveHundler} onDragOver={dragEnterHundler}>
            <div className="disk__btns">
                <div className="disk__add">
                    <button className='disk__btn disk__back' onClick={() => backClickHundler()}>
                        <svg width="26" height="15" viewBox="0 0 26 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 1L1 5L7 9" stroke="#566885" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 5H18.905C22.2837 5 25 8.46852 25 12.5938V14" stroke="#566885" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <button className='disk__btn disk__create' onClick={() => showPopupHundler()}>Создать новую папку</button>
                </div>
                <div className="disk__upload">
                    <label htmlFor="disk__upload-input" className="disk__upload-label">Загрузить файл</label>
                    <input multiple={true} onChange={(evt) => fileUploadHundler(evt)} type="file" id="disk__upload-input" className="disk__upload-input" />
                </div>
            </div>
            <FileList />
            <Popup />
            <Uploader />
        </div>
        :
        <div className="drag-area" onDrop={onDropHundler} onDragEnter={dragEnterHundler} onDragLeave={dragLeaveHundler} onDragOver={dragEnterHundler}>
            Перетащите файлы сюда
        </div>
    )
}

export default Disk
