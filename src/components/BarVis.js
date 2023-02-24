import { useState, useEffect } from 'react';
import axios from 'axios';
import Highcharts from 'highcharts/highstock';
import Barchart from 'highcharts-react-official'

function BarVis(){
    const [sales, setSales] = useState([])
    const [year, setYear] = useState([])

    const config = {
        credits: {
            enabled: false
        },
        title: {
            text: 'Sales per Country over time',
            align: 'left'
        },

        yAxis: {
            title: {
                text: 'Sales'
            }
        },
    
        xAxis: {
        },
    
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
    
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: year
            }
        },
    
        series: sales,
    
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    }  

    useEffect(async function(){
        var data = await axios.get("http://localhost:8080/sales")
        var formattedSalesData = data.data.map(function(sales){
            return {
                name: sales.country,
                data: sales.data
            }
        })
        setSales(formattedSalesData)
    }, [])   

    return(
        <div>
            <Barchart highcharts={Highcharts} options={config} />
        </div>
    )
}

export default BarVis;