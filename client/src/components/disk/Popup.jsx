import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createDir } from '../../actions/file';
import { addFile, setPopupDisplay } from '../../reducers/fileReducer';

import './disk.scss'

function Popup() {
    const dispatch = useDispatch();
    const [dirName, setDirName] = useState('');
    const popupDisplay = useSelector(state => state.files.popupDisplay);
    const currentDir = useSelector(state => state.files.currentDir);

    function closePopupHundler() {
        setDirName('')
        dispatch(setPopupDisplay('none'))
    };

    function creacteDirHundler() {
        setDirName('')
        dispatch(createDir(currentDir, dirName));
        dispatch(setPopupDisplay('none'));
    };

    return (
        <div className='popup' onClick={() => closePopupHundler()} style={{ display: popupDisplay }}>
            <div className="popup__content" onClick={event => event.stopPropagation()}>
                <div className="popup__header">
                    <h2 className="popup__title">Создать новую папку</h2>
                    <button className="popup__close" onClick={() => closePopupHundler()}></button>
                </div>
                <input type="text" placeholder="Введите название папки..." value={dirName} onChange={evt => setDirName(evt.target.value)} />
                <button className="popup__create" onClick={() => creacteDirHundler()}>Создать</button>
            </div>
        </div >
    )
}

export default Popup
