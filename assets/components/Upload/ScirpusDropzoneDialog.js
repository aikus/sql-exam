import React, {useState} from "react";
import { DropzoneDialog } from "mui-file-dropzone";
import { Button } from "@mui/material";

export const ScirpusDropzoneDialog = ({repository}) => {

    const [open, setOpen] = useState(false)

    const save = (files) => {
        repository.multiCreate(
            files,
            data => {},
            error => {}
        ).then(r => r);
    }

    return <>
        <Button
            onClick={() => setOpen(true)}
            variant={"outlined"}
            sx={{m: 1}}
        >
            Добавить изображение
        </Button>
        <DropzoneDialog
            open={open}
            onSave={save}
            acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
            filesLimit={5}
            showPreviews={true}
            maxFileSize={41943040}
            onClose={() => setOpen(false)}
            dialogTitle={"Загрузить изображения"}
            cancelButtonText={"Отмена"}
            submitButtonText={"Отправка"}
            dropzoneText={"Перетащите файл сюда или нажмите для выбора файла"}
        />
    </>
}