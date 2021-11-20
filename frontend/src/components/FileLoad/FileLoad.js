import axios from 'axios';
import React, { useState } from 'react';
import classes from './FileLoad.module.css';
import IconButton from '@mui/material/IconButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Box, LinearProgress, Typography } from '@mui/material';

const FileLoad = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const [drag, setDrag] = useState(false);
  const [processing, setProcessing] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };

  const onImageLoad = async (file) => {
    const formData = new FormData();

    formData.append('File', file);
    setProcessing(true);

    await axios.post(`http://localhost:5000/upload_file`, formData,
      {
        withCredentials: true,
      }, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      }).then((res) => {
      console.log(res);
      setProcessing(false);
    }).catch((err) => {
      console.error(err);
    });
  };

  const dragStartHandler = (e) => {
    e.preventDefault();
    setDrag(true);
  };

  const dragLeaveHandler = (e) => {
    e.preventDefault();
    setDrag(false);
  };

  const onDropHandler = (e) => {
    e.preventDefault();
    onImageLoad(e.dataTransfer.files[0])
      .then(() => { 
        console.log('image loaded'); 
        setProcessing(true); 
      });
    setDrag(false);
  };

  return (
    <div className={classes.container}>
      {drag
      ? (
        <div
          className={classes.dragFrame}
          onDragStart={(e) => dragStartHandler(e)}
          onDragLeave={(e) => dragLeaveHandler(e)}
          onDragOver={(e) => dragStartHandler(e)}
          onDrop={(e) => onDropHandler(e)}
        >
          <p>
            Отпустите,
            <br />
            чтобы загрузить
          </p>
        </div>
      )
      : (
        <div
          className={classes.dragContainer}
          onDragStart={(e) => dragStartHandler(e)}
          onDragLeave={(e) => dragLeaveHandler(e)}
          onDragOver={(e) => dragStartHandler(e)}
        >
          <input
            type="file"
            name="file"
            accept=".csv, .xlsx"
            onChange={(e) => changeHandler(e)}
            style={{
              backgroundColor: 'transparent', width: '100%', height: '100%', position: 'absolute', opacity: '0', zIndex: '1', cursor: 'pointer',
            }}
          />
          {isSelected && selectedFile ? (
            <div style={{
              paddingLeft: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%',
            }}
            >
              {processing ? (
                  <Box style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', width: '100%', marginTop: '25px'}}>
                    <Typography className={classes.resultCheck} variant="h6" component="div" color="secondary">
                      Подождите, идет подбор категории: 
                    </Typography>
                    <br />
                    <LinearProgress color="secondary" />
                  </Box>
                ) : (
                  <div>
                    <div>
                      <p>
                        Название файла:
                        {selectedFile.name}
                      </p>
                      <p>
                        Тип файла:
                        {selectedFile.type}
                      </p>
                      <p>
                        Размер в байтах:
                        {selectedFile.size}
                      </p>
                      <p>
                        Последнее изменение:
                        {selectedFile.lastModifiedDate.toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        onClick={() => onImageLoad(selectedFile)}
                        style={{
                          position: 'absolute', bottom: '0', right: '0', zIndex: '1'
                        }}
                      >
                        <CloudUploadIcon color="secondary" />
                      </IconButton>
                    </div>
                  </div>
                )}
            </div>
          ) : (
            <div style={{
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%'
            }}
            >
              <div className={classes.dragContainer}>
                {processing ? (
                  <Box style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', width: '100%', marginTop: '25px'}}>
                    <Typography className={classes.resultCheck} variant="h6" component="div" color="secondary">
                      Подождите, идет подбор категории: 
                    </Typography>
                    <br />
                    <LinearProgress color="secondary" />
                  </Box>
                ) : <Box style={{ paddingLeft: '15px' }}>Нажмите на область загрузки или перетащите срез базы в эту область</Box>}
                <div style={{
                  position: 'absolute', bottom: '15px', right: '10px', zIndex: '1'
                }}
                >
                  <input accept=".csv, .xlsx" style={{ display: 'none' }} id="icon-button-file" type="file" onChange={(e) => changeHandler(e)} />
                  <label htmlFor="icon-button-file">
                    <IconButton color="secondary" aria-label="upload picture" component="span">
                      <AttachFileIcon />
                    </IconButton>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FileLoad;