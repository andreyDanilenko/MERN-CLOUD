import React from 'react';
import { useDispatch } from 'react-redux';
import { removeUploaderFile } from '../../../reducers/uploadReducer';
import './uploader.scss';

function UploaderFile({ file }) {
    const dispatch = useDispatch();

    function removeClickHundler(evt) {
        evt.stopPropagation();
        dispatch(removeUploaderFile(file.id))
    }


    return (
        <div className="upload-file">
            <div className="upload-file__header">
                <div className="upload-file__name">{file.name}</div>
                <button className="upload-file__remove" onClick={(evt) => removeClickHundler(evt)}>
                    <svg width="10" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.33149 2.23077H1V4.69231H2.39227M5.33149 2.23077V1H10.6685V2.23077M5.33149 2.23077H10.6685M10.6685 2.23077H15V4.69231H13.6851M2.39227 4.69231V17H13.6851V4.69231M2.39227 4.69231H5.21547M13.6851 4.69231H10.8232M10.8232 4.69231V14.6752M10.8232 4.69231H8.03867M8.03867 4.69231V14.6752M8.03867 4.69231H5.21547M5.21547 4.69231V14.6752" stroke="#566885" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
            </div>
            <div className="upload-file__progress-bar">
                <div className="upload-file__upload-bar" style={{ width: file.progress + '%' }} />
                <div className="upload-file__percent">{file.progress}%</div>
            </div>

        </div>
    )
}

export default UploaderFile
