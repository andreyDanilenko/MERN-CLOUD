import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFiles, uploadFile } from '../../actions/file'
import FileList from './fileList/FileList';
import './disk.scss'
import Popup from './Popup';
import { setPopupDisplay, setCurrentDir, addFile } from '../../reducers/fileReducer';

function Disk() {
    const dispatch = useDispatch();
    const currentDir = useSelector(state => state.files.currentDir);
    const dirStack = useSelector(state => state.files.dirStack);

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

    return (
        <div className="disk">
            <div className="disk__btns">
                <button className='disk__back' onClick={() => backClickHundler()}>Назад</button>
                <button className='disk__create' onClick={() => showPopupHundler()}>Создать папку</button>
                <div className="disk__upload">
                    <label htmlFor="disk__upload-input" className="disk__upload-label">Загрузить файл</label>
                    <input multiple={true} onChange={(evt) => fileUploadHundler(evt)} type="file" id="disk__upload-input" className="disk__upload-input" />
                </div>
            </div>

            <FileList />
            <Popup />
        </div>
    )
}

export default Disk
