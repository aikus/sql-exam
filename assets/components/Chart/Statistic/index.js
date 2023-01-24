import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export function Statistic({statistic, text}) {

    const options = {
        plugins: {
            title: {
                display: true,
                text: text,
            },
        },
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        scales: {
            x: { stacked: true },
            y: { stacked: true },
        },
    };

    const colorCollection = [
        'rgb(255, 99, 132)',
        'rgb(75, 192, 192)',
        'rgb(53, 162, 235)',
        'rgb(16,173,58)',
        'rgb(192, 75, 192)',
    ]

    const parseStatistic = (data) => {
        if (undefined === data.labels || data.labels.length === 0) return {labels: [], datasets: [{}]};
        return {
            labels: data.labels.map((label) => label.name),
            datasets: [
                {
                    label: data.course,
                    data: data.labels.map((label) => {
                        return data.result[label.id] ?? 0;
                    }),
                    backgroundColor: colorCollection[getRandomInt(0,4)],
                },
            ],
        };
    }

    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    return <Bar options={options} data={parseStatistic(statistic)} />
}
