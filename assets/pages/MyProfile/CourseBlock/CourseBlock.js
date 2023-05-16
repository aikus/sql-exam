import React, {useEffect, useState} from 'react';
import * as C from './styles'
import {
    Tabs,
    Tab,
    Box,
    Skeleton,
    Grid,
    Card,
    CardActionArea,
    CardContent,
    Typography,
    Button,
    ButtonGroup
} from "@mui/material";
import { H2, TextL, H5 } from '../../../components/Typography'
import {useNavigate} from "react-router-dom";
import CourseRepository from "../CourseRepository";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {sanitizer} from "../../../Service/Sanitizer";

export const CourseBlock = ({title}) => {
    const navigate = useNavigate()
    const [tabChosen, setTabChosen] = useState(0);
    const [newCourses, setNewCourses] = useState(null);
    const [restartable, setRestartable] = useState(null);
    const [inProgress, setInProgress] = useState(null);
    const [completedCourses, setCompletedCourses] = useState(null);

    useEffect(() => {
        CourseRepository.getRestartable().then(setRestartable);
        CourseRepository.getNewCourses().then(setNewCourses);
        CourseRepository.getStartedCourses().then(setInProgress);
        CourseRepository.getCompletedCourses().then(setCompletedCourses);
    }, []);

    const goToPractice = id => {
        localStorage.setItem('courseId', id);
        navigate(`/react/my-profile/practice?course=${id}`)
    }

    const goToCourseResult = id => {
        navigate(`/react/my-profile/course-result?course=${id}`)
    }

    const handleTabChange = (event, newValue) => {
        setTabChosen(newValue);
    };

    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
            style={{width: '100%'}}
          >
              {value === index && (
                <Box>
                    <div>{children}</div>
                </Box>
              )}
          </div>
        );
    }

    function a11yProps(index) {
        return {
            id: `vertical-tab-${index}`,
            'aria-controls': `vertical-tabpanel-${index}`,
        };
    }

    function TileBlock({value, startCourseBtn, viewResultBtn}) {
        return (
          <C.Wrapper>
              {value === null &&
                <Skeleton variant="rectangular" animation="wave" height={140} sx={{borderRadius: '4px', maxWidth: '250px', width: '100%'}}/>
              }
              {value !== null && !value.length &&
                <C.NoContent>
                    <TextL>Выбранные курсы отсутствуют</TextL>
                </C.NoContent>
              }
              {value !== null && Boolean(value.length) &&
                <Grid container spacing={2} columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                    {value.map((itemVal, i) => {
                        return (
                          <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                              <Card>
                                  <CardContent sx={{
                                      '&:last-child': {
                                          pb: { xs: 1, sm: 2 }
                                      },
                                      p: { xs: 1, sm: 2 }
                                  }}>
                                      <Typography gutterBottom variant="h5" component="div">
                                          {itemVal.name}
                                      </Typography>
                                      <Typography variant="body2" color="text.secondary" dangerouslySetInnerHTML={{__html: sanitizer(itemVal.description)}} />
                                      <Box sx={{
                                          display: 'flex',
                                          flexDirection: 'column',
                                          pt: 2,
                                          gap: '8px',
                                      }}>
                                          {startCourseBtn &&
                                            <Button
                                              size='S' variant={'outlined'} onClick={() => goToPractice(itemVal.id)} color="secondary">
                                                Начать прохождение
                                            </Button>
                                          }
                                          {viewResultBtn &&
                                            <Button size='S' variant={'outlined'} onClick={() => goToCourseResult(itemVal.id)} color="secondary">
                                                Посмотреть результаты
                                            </Button>
                                          }
                                      </Box>
                                  </CardContent>
                              </Card>
                          </Grid>
                        )
                    })}
                </Grid>
              }
          </C.Wrapper>
        );
    }

    return (
    <>
        <C.HeaderBlock>
            <H2>{title}</H2>
        </C.HeaderBlock>
        <C.Base>
            <Tabs
              orientation="vertical"
              value={tabChosen}
              onChange={handleTabChange}
              sx={{ borderRight: 1, borderColor: 'divider', flexShrink: 0 }}
            >
                <Tab label="Новый" {...a11yProps(0)}/>
                <Tab label="Можно пройти снова" {...a11yProps(1)}/>
                <Tab label="В процессе" {...a11yProps(2)}/>
                <Tab label="Завершённые" {...a11yProps(3)}/>
            </Tabs>
            <TabPanel value={tabChosen} index={0}>
                <TileBlock
                  value={newCourses}
                  startCourseBtn
                />
            </TabPanel>
            <TabPanel value={tabChosen} index={1}>
                <TileBlock
                  value={restartable}
                  startCourseBtn
                  viewResultBtn
                />
            </TabPanel>
            <TabPanel value={tabChosen} index={2}>
                <TileBlock
                  value={inProgress}
                  startCourseBtn
                />
            </TabPanel>
            <TabPanel value={tabChosen} index={3}>
                <TileBlock
                  value={completedCourses}
                  viewResultBtn
                />
            </TabPanel>
        </C.Base>
    </>
    )
}

