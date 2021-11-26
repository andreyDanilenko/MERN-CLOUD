import axios from "axios";
import { addFile, setFiles, deleteFileAction } from '../reducers/fileReducer'
import { addUploaderFile, changeUploaderFile, showUploader } from "../reducers/uploadReducer";

export function getFiles(dirId, sort) {
    console.log(sort);
    return async dispatch => {
        try {
            let url = `http://localhost:5000/api/files`
            if (dirId) {
                console.log(sort);
                url = `http://localhost:5000/api/files?parent=${dirId}`
            }
            if (sort) {
                console.log(sort);
                url = `http://localhost:5000/api/files?sort=${sort}`
            }
            if (dirId && sort) {
                console.log(sort);
                url = `http://localhost:5000/api/files?parent=${dirId}&sort=${sort}`
            }
            const response = await axios.get(url, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })

            dispatch(setFiles(response.data));
        } catch (e) {
            alert(e.response.data.message);
        }
    }
}

export function createDir(dirId, name) {
    return async dispatch => {
        try {
            const response = await axios.post('http://localhost:5000/api/files/', {
                name,
                parent: dirId,
                type: 'dir'
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            dispatch(addFile(response.data));
        } catch (e) {
            alert(e?.response?.data?.message);
        }
    }
}


export function uploadFile(file, dirId) {
    return async dispatch => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            if (dirId) {
                formData.append('parent', dirId);
            }

            const uploadFile = { name: file.name, progress: 0, id: Date.now() };
            dispatch(showUploader());
            dispatch(addUploaderFile(uploadFile));

            const response = await axios.post('http://localhost:5000/api/files/upload', formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                onUploadProgress: progressEvent => {
                    const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');

                    if (totalLength) {
                        uploadFile.progress = Math.round((progressEvent.loaded * 100) / totalLength)
                        dispatch(changeUploaderFile(uploadFile))
                    }
                }
            });
            dispatch(addFile(response.data));
        } catch (e) {
            alert(e.response.data.message);
        }
    }
};

export async function downloadFile(file) {
    const response = await fetch(`http://localhost:5000/api/files/download?id=${file._id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    if (response.status === 200) {
        const blob = await response.blob()
        const downloadUrl = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = file.name
        document.body.appendChild(link)
        link.click()
        link.remove()
    }
};


export function deleteFile(file) {
    console.log(file);
    return async dispatch => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/files?id=${file._id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(deleteFileAction(file._id));
            alert(response.data.message);

        } catch (e) {
            alert(e.response.data.message);
        }
    }
};
