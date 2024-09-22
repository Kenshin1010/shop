import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Container,
  Box,
  Select,
  MenuItem,
  Typography,
  Drawer,
  Alert,
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
import { fetchChartData } from '../services';
import logo from '../assets/images/static/logo.png';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

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
  const navigate = useNavigate();
  const { logout } = useAuth(); // Get logout function from useAuth
  const [logoutMessage, setLogoutMessage] = useState<string | null>(null);

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

  useEffect(() => {
    fetchData();
  }, [days, merchant, metric]);

  const handleLogout = () => {
    logout(); // Call logout function
    setLogoutMessage('Successfully logged out!');
    navigate('/login'); // Redirect to login
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

  return (
    <>
      {logoutMessage && (
        <Alert severity="success" sx={{ width: '100%', marginBottom: 2 }}>
          {logoutMessage}
        </Alert>
      )}
      <Container
        sx={{
          bgcolor: 'rgba(217, 217, 217, 0.3)',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <AppBar position="static">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Button onClick={() => setMenuVisible(true)}>
              <MenuIcon fontSize="large" sx={{ color: 'white' }} />
            </Button>
            <Button onClick={() => navigate('/')}>
              <img src={logo} alt="Logo" style={{ maxHeight: '50px' }} />
            </Button>
            <Button onClick={() => setSettingVisible(true)}>
              <SettingsIcon fontSize="large" sx={{ color: 'white' }} />
            </Button>
          </Toolbar>
        </AppBar>

        {/* Drawers for Menu and Settings */}
        <Drawer
          anchor="left"
          open={menuVisible}
          onClose={() => setMenuVisible(false)}
        >
          <Box
            sx={{
              width: 250,
              padding: 2,
              bgcolor: '#1976d2',
              color: 'white',
            }}
          >
            <ul>
              <li>
                <a
                  href="#"
                  className="menu-setting-a"
                  style={{ color: 'white' }}
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="menu-setting-a"
                  style={{ color: 'white' }}
                >
                  Report
                </a>
              </li>
            </ul>
          </Box>
        </Drawer>

        <Drawer
          anchor="right"
          open={settingVisible}
          onClose={() => setSettingVisible(false)}
        >
          <Box
            sx={{
              width: 250,
              padding: 2,
              bgcolor: '#1976d2',
              color: 'white',
            }}
          >
            <ul>
              <li>
                <a
                  href="#"
                  className="menu-setting-a"
                  style={{ color: 'white' }}
                >
                  Profile
                </a>
              </li>
              <li>
                <Button
                  onClick={handleLogout} // Use handleLogout function
                  className="menu-setting-a"
                  style={{
                    color: 'white',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Logout
                </Button>
              </li>
            </ul>
          </Box>
        </Drawer>

        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 600, padding: 2 }}>
            {/* Sales Summary */}
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                bgcolor: '#979696',
                boxShadow: 2,
                padding: 1,
                marginBottom: 2,
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
            <Box sx={{ marginTop: '20px' }}>
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
                <Select
                  value={metric}
                  onChange={(e) => setMetric(e.target.value)}
                >
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

            {/* Total Fund and Listing Info Section */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                width: '90%',
                mt: 2,
              }}
            >
              <Box
                sx={{
                  bgcolor: 'white',
                  borderRadius: 1,
                  padding: 2,
                  boxShadow: 2,
                }}
              >
                <Typography color="black">
                  Total Fund: £{data.TotalFund}
                </Typography>
                <Typography color="black">
                  Total Profit: £{data.TotalProfit}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    bgcolor: 'white',
                    borderRadius: 1,
                    padding: 2,
                    width: '48%',
                  }}
                >
                  <Typography>Listing: {data.Listing}</Typography>
                </Box>
                <Box
                  sx={{
                    bgcolor: 'white',
                    borderRadius: 1,
                    padding: 2,
                    width: '48%',
                  }}
                >
                  <Typography>Product: {data.Product}</Typography>
                </Box>
              </Box>
            </Box>

            {/* Action Buttons */}
            <Box
              sx={{
                marginTop: '20px',
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
        </Box>
      </Container>
    </>
  );
};

export default Dashboard;
