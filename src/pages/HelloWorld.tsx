import * as React from 'react';
import { useEffect, useRef } from 'react';
import { InferGetServerSidePropsType } from 'next';
import { BarController, BarElement, CategoryScale, Chart, Colors, Legend, LinearScale } from 'chart.js';
import { getGenericServerSideProps } from '@/services/session.fetch';


type HelloWorldTemplateProps = {
  name: string
}

export const getServerSideProps = getGenericServerSideProps<HelloWorldTemplateProps>;

// export const getServerSideProps = () => ({ props: { name: 'Dmytro' } });

const data = [
  { year: 2010, count: 10 },
  { year: 2011, count: 20 },
  { year: 2012, count: 15 },
  { year: 2013, count: 25 },
  { year: 2014, count: 22 },
  { year: 2015, count: 30 },
  { year: 2016, count: 28 },
];


export default function HelloWorld(initialProps: InferGetServerSidePropsType<typeof getServerSideProps>) {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart>();

  useEffect(() => {
    if (chartRef.current == null && canvasRef.current != null) {
      Chart.register(
        Colors,
        BarController,
        BarElement,
        CategoryScale,
        LinearScale,
        Legend,
      );
      chartRef.current = new Chart(
        canvasRef.current,
        {
          type: 'bar',
          data: {
            labels: data.map(row => row.year),
            datasets: [
              {
                label: 'Acquisitions by year',
                data: data.map(row => row.count),
              },
            ],
          },
        },
      );
    }
  }, [canvasRef, chartRef]);

  return (
    <div id="root">
      <h1>Hello {initialProps.name}</h1>
      <canvas ref={canvasRef} id="myChart"></canvas>
    </div>
  );
};
