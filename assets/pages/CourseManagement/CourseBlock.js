import React, { useState } from 'react';
import * as C from './styles'
import { Menu, MenuItem, Accordion, AccordionSummary, AccordionDetails, Dialog } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Button} from "../../components/Button";
import { H4, TextL } from '../../components/Typography'
import {useNavigate} from "react-router-dom";
import {LoaderInBLock} from "../../components/Loader/LoaderInBLock";
import {HttpRequest} from "../../Service/HttpRequest";
import {Loader} from "../../components/Loader";
import { hostName } from '../../config'
import {DialogWinDelete} from "../../components/DialogWinDelete";

export const CourseBlock = ({items, getNewCourseList, updateCourseList}) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false)
  const [delCourseInf, setDelCourseInf] = useState({
    id: '',
    isOpen: false
  })

  const editCourse = (courseId) => {
    navigate(`/react/my-profile/create-course?course=${courseId}`)
  }

  const deleteCourse = () => {
    setLoader(true)

    const handleSuccess = () => {
      getNewCourseList()
      setLoader(false)
      updateCourseList()
    }

    const handleError = () => {
      setLoader(false)
    }

    HttpRequest.delete(`${hostName}/api-platform/courses/${delCourseInf.id}`,(data) => handleSuccess(data), (error) => handleError())

    handleClose()
  }

  const handleClose = () => {
    setDelCourseInf({id: '', isOpen: false})
  }

  return (
    <>
      {!items.length &&
        <C.LoadingBlock>
          <LoaderInBLock show={true}/>
        </C.LoadingBlock>
      }
      <C.AccordionBlock>
        {items.map((item, i) => {
          return (
            <Accordion key={i}>
              <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
              >
                <C.Title><TextL>{item.name}</TextL></C.Title>
              </AccordionSummary>
              <AccordionDetails>
                <C.Description>
                  <TextL>{item.description}</TextL>
                  <C.ButtonWrapper>
                    <Button
                      size={'S'}
                      onClick={() => editCourse(item.id)}
                    >Редактирование</Button>
                    <Button
                      size={'S'}
                      view={'outlined'}
                      onClick={() => setDelCourseInf({id: item.id, isOpen: true})}
                    >Удалить</Button>
                  </C.ButtonWrapper>
                </C.Description>
              </AccordionDetails>
            </Accordion>
          )
        })}
      </C.AccordionBlock>

      <DialogWinDelete
        isOpen={delCourseInf.isOpen}
        handleDelete={deleteCourse}
        handleClose={handleClose}
        whatToDelete={'курс'}
      />

      <Loader show={loader}/>
    </>
  )
}

