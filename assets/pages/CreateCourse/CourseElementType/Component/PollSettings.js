import React, { useEffect, useState } from 'react';
import {
    Box,
    Checkbox,
    Divider,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    MenuItem,
    Select,
    Typography
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { CourseElementSettingRepository } from "/assets/Repositories/CourseElementSettingRepository";
import InputLabel from "@mui/material/InputLabel";

export const PollSettings = ({courseElement, handleSettingsChange}) => {
    const [pollSettings, setPollSettings] = useState([]);
    const [state, setState] = useState({
        countView: '',
        isVictorine: true,
        randomOrder: false,
    });

    const handleChange = (e) => {
        if ('checkbox' === e.target.type) {
            addSettings({property: e.target.name, value: e.target.checked ? '1' : '0'})
        }
        else {
            addSettings({property: e.target.name, value: e.target.value})
        }
    }

    const addSettings = (setting) => {
        setState(state => ({...state, [setting.property]: setting.value}))
        setPollSettings(pollSettings => {
            const settingIndex = pollSettings.findIndex(item => item.property === setting.property)

            if (-1 === settingIndex) {
                pollSettings.push(setting);
            }
            else {
                pollSettings[settingIndex].value = setting.value;
            }
            return pollSettings;
        });
    }

    useEffect(() => {
        CourseElementSettingRepository.getByCourseElement(courseElement)
            .then(settings => {

                settings.map(setting => {
                    addSettings(setting)
                })

                setState({
                    countView: settings.filter(item => 'countView' === item.property)[0]?.value ?? '',
                    isVictorine: settings.filter(item => 'isVictorine' === item.property)[0]?.value ?? true,
                    isRandomOrder: settings.filter(item => 'isRandomOrder' === item.property)[0]?.value ?? false,
                })
            })
            .catch(error => {
                console.error(error)
            })
        handleSettingsChange(pollSettings)
    }, [])

    useEffect(() => {
        handleSettingsChange(pollSettings)
    }, [pollSettings])

    return <Box>
        <Typography>Настройки</Typography>
        <Divider sx={{ my: 2 }} />
        <FormGroup>
            <FormControl sx={{ my: 1 }}>
                <Typography>Количество вариатов</Typography>
                <Select
                    name={'countView'}
                    value={state?.countView}
                    onChange={handleChange}
                >
                    <MenuItem value=""><em>Не выбрано</em></MenuItem>
                    <MenuItem value={'4'}>Отобразать 4 варианта</MenuItem>
                    <MenuItem value={'6'}>Отобразать 6 вариантов</MenuItem>
                    <MenuItem value={'8'}>Отобразать 8 вариантов</MenuItem>
                </Select>
                <FormHelperText>Количество вариатов которые случайно отобразятся при прохождении курса</FormHelperText>
            </FormControl>
            <FormControl>
                <FormControlLabel
                    control={<Checkbox
                        name={'isVictorine'}
                        checked={'1' === state?.isVictorine}
                        onChange={handleChange}
                    />}
                    label="Доступен только один вариант"
                />
                <FormHelperText>Если отмечено, то при ответе на вопрос пользователь может выбрать только один вариант</FormHelperText>
            </FormControl>
            <FormControl>
                <FormControlLabel
                    control={<Checkbox
                        name={'isRandomOrder'}
                        checked={'1' === state?.isRandomOrder}
                        onChange={handleChange}
                    />}
                    label="Выводить в случайном порядке"
                />
                <FormHelperText>Если отмечено, то варианты в процессе прохождения будут выведены в случайной последовательности</FormHelperText>
            </FormControl>
        </FormGroup>
    </Box>
}