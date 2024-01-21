import * as React from 'react';
import { useEffect, useRef } from 'react';
import { NextPage } from 'next';
import Chart from 'chart.js/auto';
import { getInitialPropsFromRequestBody } from '@/utilities/NextJsUtilities';


type HelloWorldTemplateProps = {
  name: string
}


const HelloWorld: NextPage<HelloWorldTemplateProps> = props => {

  const initialProps = props as HelloWorldTemplateProps;
  const chartRef = useRef<Chart>();

  useEffect(() => {
    if (chartRef.current == undefined) {
      const ctx = document.getElementById('myChart') as HTMLCanvasElement;
      chartRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1,
          }],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, []);

  return (
    <div id='root'>
      <h1>Hello {initialProps.name}</h1>
      <canvas id='myChart'></canvas>
    </div>
  );
};

HelloWorld.getInitialProps = getInitialPropsFromRequestBody;
export default HelloWorld;
