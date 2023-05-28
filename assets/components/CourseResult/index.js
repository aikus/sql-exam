import React from 'react';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Button,
  Grid
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate} from "react-router-dom";
import { sanitizer } from "/assets/Service/Sanitizer";
import { BackToMainPageButton } from "/assets/components/Main/Button/BackToMainPageButton";

export const CourseResult = (data) => {
  const isTeacher = data.isTeacher;
  const navigate = useNavigate();
  const header = () => {
    let result = [];
    if (isSetResult()) {
      for (let key in data.personalResult.table[0]) {
        result.push(key)
      }
    }
    return result.length > 0 ? result : ['']
  }

  const isSetResult = () => {
    return data.personalResult.hasOwnProperty('table')
      && data.personalResult.table.length > 0;
  }

  return <>
    <Grid container justifyContent={'space-between'} sx={{mb: 2}}>
      <Grid item xs={12} md={10}>
        <Typography variant={'h1'}>{data.personalResult?.courseName}</Typography>
        <BackToMainPageButton />
      </Grid>
      <Grid item alignSelf={'end'} xs={12} md={2}>
        <Typography variant={'body1'} sx={{textAlign: 'right', py: '6px', px: '8px'}}>
          {data.personalResult?.fio}
        </Typography>
      </Grid>
    </Grid>
    <TableContainer component={Paper}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {
              header().map((column) => {
                return "metaData" !== column
                  ? <TableCell key={column}>
                    <div>{column}</div>
                  </TableCell>
                  : null
              })
            }
            {
              isTeacher
              && <TableCell>Проверить</TableCell>
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {
            isSetResult()
              ? data.personalResult?.table.map((row, i) => (<TableRow key={i}>{
                  Object.keys(row).map((cell, ii) => "metaData" !== cell
                    ? ('Статус' === cell
                        ? <TableCell key={ii}>
                          {
                            null === row[cell]
                              ? <RemoveIcon color={"secondary"}/>
                              : row[cell]
                                ? <CheckIcon color={"success"}/>
                                : <CloseIcon color={"error"}/>
                          }
                        </TableCell>
                        : <TableCell key={ii}>
                          <Typography dangerouslySetInnerHTML={{__html: sanitizer(row[cell] ?? 'Пока нет ответа')}}/>
                        </TableCell>
                    )
                    : ""
                  )
                }
                  {
                    isTeacher
                    && <TableCell>
                      {row.metaData.answerId
                        ? <Button
                          size='medium'
                          variant='outlined'
                          color="secondary"
                          onClick={() => navigate(
                            "/react/my-profile/check-answer?sheet="
                            + row.metaData.sheetId
                            + "&answer="
                            + row.metaData.answerId
                          )}
                        >Проверить</Button>
                        : <></>
                      }
                    </TableCell>
                  }
                </TableRow>
              ))
              : <TableRow>
                <TableCell>В этом курсе не было проверяемых ответов</TableCell>
              </TableRow>
          }
        </TableBody>
      </Table>
    </TableContainer>
  </>
}