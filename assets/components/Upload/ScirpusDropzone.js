import React, { useEffect, useState } from "react";
import { DropzoneArea } from "mui-file-dropzone";
import { Box } from "@material-ui/core";

export const ScirpusDropzone = ({messageId, setMessageId, repository}) => {

    const [files, setFiles] = useState(null);

    const handleFile = (files) => {
        setFiles(files)
    }

    const save = (files) => {
        repository.multiCreate(
            messageId,
            files,
            data => {
                setMessageId(null);
            },
            error => {
                setMessageId(null);
            }
        ).then(r => r);
    }

    useEffect(() => {
        if (messageId > 0) {
            save(files)
        }
    }, [messageId])

    return <Box sx={{p: 1}}>
        <DropzoneArea
            onChange={handleFile}
            acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
            filesLimit={5}
            maxFileSize={41943040}
            dropzoneText={"Перетащите сюда скриншот или нажмите для выбора"}
        />
    </Box>
}
