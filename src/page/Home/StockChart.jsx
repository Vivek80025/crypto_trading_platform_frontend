import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { getMarketChart } from "@/State/Coin/CoinSlice";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";

const timeSeries = [
  {
    keyword: "DIGITAL_CURRENCY_DAILY",
    key: "Time Series (Daily)",
    lable: "1 Day",
    value: 1,
  },
  {
    keyword: "DIGITAL_CURRENCY_WEEKLY",
    key: "Weekly Time Series",
    lable: "1 Week",
    value: 7,
  },
  {
    keyword: "DIGITAL_CURRENCY_MONTHLY",
    key: "Monthly Time Series",
    lable: "1 Month",
    value: 30,
  },
  {
    keyword: "DIGITAL_CURRENCY_YEARLY",
    key: "Yearly Time Series",
    lable: "1 Year",
    value: 365,
  },
];

function StockChart({ coinId }) {
  const [activeLable, setActiveLable] = useState(timeSeries[0]);
  const dispatch = useDispatch();
  const coin = useSelector((store) => store.coin);

  const series = [
    {
      data: coin.marketChart.data,
    },
  ];

  const options = {
    chart: {
      id: "area-datetime",
      type: "area",
      height: 350,
      zoom: {
        autoScaleYaxis: true,
      },
    },
    grid: {
      show: true,
      borderColor: "#d1d5db",
      strokeDashArray: 4,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    annotations: {
      yaxis: [
        {
          y: 30,
          borderColor: "#999",
          label: {
            show: true,
            style: {
              color: "#fff",
              background: "#00E396",
            },
          },
        },
      ],
      xaxis: [
        {
          borderColor: "#999",
          yAxisIndex: 0,
          label: {
            show: true,
            text: "Rally",
            style: {
              color: "#fff",
              background: "#775DD0",
            },
          },
        },
      ],
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
      style: "hollow",
    },
    xaxis: {
      type: "datetime",
      tickAmount: 6,
      tooltip: {
        enabled: false,
      },
    },
    tooltip: {
      enabled: true,
      style: {
        fontSize: "12px",
      },
      x: {
        show: true,
        format: "dd MMM yyyy, hh:mm TT",
      },
      y: {
        title: {
          formatter: () => "Price: ",
        },
        formatter: (val) => {
          return (
            "$" +
            val.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })
          );
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },
  };

  const handleActiveLable = (value) => {
    setActiveLable(value);
  };

  useEffect(() => {
    if (coinId) {
      dispatch(getMarketChart({ coinId, days: activeLable.value }));
    }
  }, [coinId, activeLable.value]);

  console.log(
    "from store in chart comp=-=-=-=-=-=-=-=-=-=-=-",
    coin.marketChart.data
  );
  return (
    <div className="w-full">
      <div className="flex gap-4 overflow-x-auto whitespace-nowrap mb-1">
        {timeSeries.map((item) => (
          <Button
            key={item.keyword}
            onClick={() => handleActiveLable(item)}
            variant={activeLable.lable === item.lable ? "default" : "outline"}
            className="shrink-0"
          >
            {item.lable}
          </Button>
        ))}
      </div>

      {coin.marketChart?.loading ? (
        <div className="h-[calc(100vh-390px)] md:h-[calc(100vh-330px)] lg:h-[calc(100vh-270px)] flex items-center justify-center">
          <Spinner className="size-8 sm:size-10" />
        </div>
      ) : (
        <div
          id="chart-timeline"
          className="h-[calc(100vh-390px)] md:h-[calc(100vh-330px)] lg:h-[calc(100vh-270px)]"
        >
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height="100%"
          />
        </div>
      )}
    </div>
  );
}

export default StockChart;
