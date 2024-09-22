import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  Box,
  Select,
  MenuItem,
  Typography,
} from '@mui/material';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { fetchChartData } from '../services'; // Importing fetch logic

// Register the necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard: React.FC = () => {
  const [chartData, setChartData] = useState([]);
  const [days, setDays] = useState('30');
  const [merchant, setMerchant] = useState('all');
  const [metric, setMetric] = useState('Total Amount');
  const [menuVisible, setMenuVisible] = useState(false);
  const [settingVisible, setSettingVisible] = useState(false);
  const [data, setData] = useState({
    TotalFund: 0,
    TotalProfit: 0,
    Listing: 0,
    Product: 0,
    TotalSale: 0,
  });

  // Fetch chart data from the server
  const fetchData = async () => {
    const json = await fetchChartData(days, merchant, metric);
    setChartData(json.data);
  };

  // Prepare chart data for Chart.js
  const getChartData = () => {
    return {
      labels: chartData.map((d: any) => d.date), // X-axis labels
      datasets: [
        {
          label: metric,
          data: chartData.map((d: any) => d.value), // Y-axis data
          backgroundColor: 'rgba(255, 159, 64, 0.6)',
          borderColor: 'rgba(255, 159, 64, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'KLI Commercial LTD',
      },
    },
  };

  const chartDataset = {
    labels: chartData.map((d: any) => d.date),
    datasets: [
      {
        label: 'Sales',
        data: chartData.map((d: any) => d.value),
        backgroundColor: 'orange',
      },
    ],
  };

  useEffect(() => {
    fetchData();
  }, [days, merchant, metric]);

  return (
    <Container
      sx={{
        bgcolor: 'rgba(217, 217, 217, 0.3)',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{ position: 'relative', width: '100%', maxWidth: 600, padding: 2 }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ padding: '0 10px' }}
        >
          <Button onClick={() => setMenuVisible(!menuVisible)}>
            <img src="Menu.png" alt="Menu" />
          </Button>
          <img
            src="logo.png"
            alt="Logo"
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          />
          <Button onClick={() => setSettingVisible(!settingVisible)}>
            <img src="Settings.png" alt="Settings" />
          </Button>
        </Box>

        {/* Menu and Settings */}
        {menuVisible && (
          <Box
            sx={{
              position: 'absolute',
              zIndex: 1000,
              background: 'rgba(217, 217, 217,1)',
              boxShadow: 2,
              top: '8%',
              left: 0,
              width: '70%',
            }}
          >
            <ul>
              <li>
                <a href="#" className="menu-setting-a">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="menu-setting-a">
                  Report
                </a>
              </li>
            </ul>
          </Box>
        )}
        {settingVisible && (
          <Box
            sx={{
              position: 'absolute',
              zIndex: 9999,
              background: 'rgba(217, 217, 217,1)',
              boxShadow: 2,
              top: '8%',
              right: 0,
              width: '70%',
            }}
          >
            <ul>
              <li>
                <a href="#" className="menu-setting-a">
                  Profile
                </a>
              </li>
              <li>
                <a href="/logout" className="menu-setting-a">
                  Logout
                </a>
              </li>
            </ul>
          </Box>
        )}

        {/* Sales Summary */}
        <Box
          sx={{
            position: 'absolute',
            top: '8%',
            width: '100%',
            bgcolor: '#979696',
            boxShadow: 2,
            padding: 1,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box
              sx={{
                width: '48%',
                bgcolor: 'white',
                borderRadius: 1,
                padding: 1,
                textAlign: 'center',
              }}
            >
              <Typography>{data.TotalFund} GBP</Typography>
            </Box>
            <Box
              sx={{
                width: '48%',
                bgcolor: 'white',
                borderRadius: 1,
                padding: 1,
                textAlign: 'center',
              }}
            >
              <Typography>{data.TotalSale} Sales</Typography>
            </Box>
          </Box>
        </Box>

        {/* Total Sales Box */}
        <Box
          sx={{
            position: 'absolute',
            top: '17%',
            width: '100%',
            fontSize: 'larger',
          }}
        >
          {/* Chart.js Bar Chart */}
          <Bar options={chartOptions} data={chartDataset} />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: 2,
            }}
          >
            <Select value={days} onChange={(e) => setDays(e.target.value)}>
              <MenuItem value="7">Last 7 days</MenuItem>
              <MenuItem value="30">Last 30 days</MenuItem>
            </Select>
            <Select value={metric} onChange={(e) => setMetric(e.target.value)}>
              <MenuItem value="Total Amount">Total Amount</MenuItem>
              <MenuItem value="Total Sale">Total Sale</MenuItem>
            </Select>
            <Select
              value={merchant}
              onChange={(e) => setMerchant(e.target.value)}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="contact">Amazon 1</MenuItem>
              <MenuItem value="fusion">Amazon 2</MenuItem>
              <MenuItem value="ebay">Ebay</MenuItem>
            </Select>
          </Box>
        </Box>

        {/* Total Fund Box */}
        <Box
          sx={{
            position: 'absolute',
            top: '56%',
            width: '90%',
            bgcolor: 'white',
            borderRadius: 1,
            padding: 2,
            boxShadow: 2,
          }}
        >
          <Typography color="black">Total Fund: £{data.TotalFund}</Typography>
          <Typography color="black">
            Total Profit: £{data.TotalProfit}
          </Typography>
        </Box>

        {/* Listing Info */}
        <Box
          sx={{
            position: 'absolute',
            top: '68%',
            width: '90%',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{ bgcolor: 'white', borderRadius: 1, padding: 2, width: '48%' }}
          >
            <Typography>Listing: {data.Listing}</Typography>
          </Box>
          <Box
            sx={{ bgcolor: 'white', borderRadius: 1, padding: 2, width: '48%' }}
          >
            <Typography>Product: {data.Product}</Typography>
          </Box>
        </Box>

        {/* Action Buttons */}
        <Box
          sx={{
            position: 'absolute',
            top: '76%',
            width: '90%',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Button href="https://pos.gbglobal.trade" variant="outlined">
            Purchase
          </Button>
          <Button href="https://pos.gbglobal.trade" variant="outlined">
            Inventory
          </Button>
          <Button href="https://pos.gbglobal.trade" variant="outlined">
            Listing
          </Button>
          <Button href="https://pos.gbglobal.trade" variant="outlined">
            Statistical
          </Button>
          <Button href="https://pos.gbglobal.trade" variant="outlined">
            Ship
          </Button>
          <Button href="https://pos.gbglobal.trade" variant="outlined">
            Report
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Dashboard;
