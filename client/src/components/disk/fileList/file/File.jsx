import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './file.scss';
import dirLogo from '../../../../assets/img/folder.svg';
import fileLogo from '../../../../assets/img/file.svg';
import { pushToStack, setCurrentDir } from '../../../../reducers/fileReducer';
import { deleteFile, downloadFile } from '../../../../actions/file';
import { sizeFormat } from '../../../../utils/utils';

function File({ file }) {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)

    function openDirHundler(file) {
        if (file.type === 'dir') {
            dispatch(pushToStack(currentDir));
            dispatch(setCurrentDir(file._id));
        }
    };

    function downloadClickHundler(evt) {
        evt.stopPropagation();
        downloadFile(file);
    };


    function deleteClickHundler(evt) {
        evt.stopPropagation();
        dispatch(deleteFile(file));
    };

    return (
        <div className="file" onClick={() => openDirHundler(file)}>
            <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className="file__img" />
            <div className="file__name">{file.name}</div>
            <div className="file__date">{file.date.slice(0, 10)}</div>
            <div className="file__size">{sizeFormat(file.size)}</div>
            {file.type !== 'dir' && <button onClick={(evt) => downloadClickHundler(evt)} className="file__btn file__download">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.0625 19.3129H15.0363V12.6875C15.0363 12.5672 14.9378 12.4688 14.8175 12.4688H13.1769C13.0566 12.4688 12.9582 12.5672 12.9582 12.6875V19.3129H10.9375C10.7543 19.3129 10.6531 19.5234 10.7652 19.6656L13.8277 23.5402C13.8482 23.5664 13.8743 23.5875 13.9041 23.6021C13.934 23.6166 13.9668 23.6242 14 23.6242C14.0332 23.6242 14.0659 23.6166 14.0958 23.6021C14.1256 23.5875 14.1518 23.5664 14.1722 23.5402L17.2347 19.6656C17.3468 19.5234 17.2457 19.3129 17.0625 19.3129Z" fill="#566885" />
                    <path d="M22.1867 10.027C20.9344 6.72383 17.7434 4.375 14.0055 4.375C10.2676 4.375 7.07656 6.72109 5.82422 10.0242C3.48086 10.6395 1.75 12.775 1.75 15.3125C1.75 18.334 4.19727 20.7812 7.21602 20.7812H8.3125C8.43281 20.7812 8.53125 20.6828 8.53125 20.5625V18.9219C8.53125 18.8016 8.43281 18.7031 8.3125 18.7031H7.21602C6.29453 18.7031 5.42773 18.3367 4.78242 17.6723C4.13984 17.0105 3.79805 16.1191 3.82812 15.1949C3.85273 14.473 4.09883 13.7949 4.54453 13.2234C5.00117 12.641 5.64102 12.2172 6.35195 12.0285L7.38828 11.7578L7.76836 10.757C8.00352 10.1336 8.33164 9.55117 8.74453 9.02344C9.15215 8.50037 9.63499 8.04057 10.1773 7.65898C11.3012 6.86875 12.6246 6.45039 14.0055 6.45039C15.3863 6.45039 16.7098 6.86875 17.8336 7.65898C18.3777 8.0418 18.859 8.50117 19.2664 9.02344C19.6793 9.55117 20.0074 10.1363 20.2426 10.757L20.6199 11.7551L21.6535 12.0285C23.1355 12.4277 24.1719 13.7758 24.1719 15.3125C24.1719 16.2176 23.8191 17.0707 23.1793 17.7105C22.8655 18.0262 22.4922 18.2764 22.0811 18.4468C21.6699 18.6172 21.229 18.7043 20.784 18.7031H19.6875C19.5672 18.7031 19.4688 18.8016 19.4688 18.9219V20.5625C19.4688 20.6828 19.5672 20.7812 19.6875 20.7812H20.784C23.8027 20.7812 26.25 18.334 26.25 15.3125C26.25 12.7777 24.5246 10.6449 22.1867 10.027Z" fill="#566885" />
                </svg>
            </button>}
            <button onClick={(evt) => deleteClickHundler(evt)} className="file__btn file__delete">
                <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.33149 2.23077H1V4.69231H2.39227M5.33149 2.23077V1H10.6685V2.23077M5.33149 2.23077H10.6685M10.6685 2.23077H15V4.69231H13.6851M2.39227 4.69231V17H13.6851V4.69231M2.39227 4.69231H5.21547M13.6851 4.69231H10.8232M10.8232 4.69231V14.6752M10.8232 4.69231H8.03867M8.03867 4.69231V14.6752M8.03867 4.69231H5.21547M5.21547 4.69231V14.6752" stroke="#566885" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </button>

        </div>
    )
}

export default File
