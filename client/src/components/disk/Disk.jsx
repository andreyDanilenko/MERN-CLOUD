import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFiles } from '../../actions/file'
import FileList from './fileList/FileList';
import './disk.scss'
import Popup from './Popup';
import { popFromStack, pushToStack, setPopupDisplay, setCurrentDir } from '../../reducers/fileReducer';

function Disk() {
    const dispatch = useDispatch();
    const currentDir = useSelector(state => state.files.currentDir);
    const dirStack = useSelector(state => state.files.dirStack);
    
    useEffect(() => {
        dispatch(getFiles(currentDir))
    }, [currentDir]);

    function showPopupHundler() {
        dispatch(setPopupDisplay('flex'))
    };

    function backClickHundler() {
        const backDirId = dirStack.pop();
        dispatch(setCurrentDir(backDirId))
    };

    return (
        <div className="disk">
            <div className="disk__btns">
                <button className='disk__back' onClick={() => backClickHundler()}>Назад</button>
                <button className='disk__create' onClick={() => showPopupHundler()}>Создать папку</button>
            </div>
            <FileList />
            <Popup />
        </div>
    )
}

export default Disk
