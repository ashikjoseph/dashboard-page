import React, { useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Gauge, PieChart } from '@mui/x-charts';
import Header from '../Components/Header';
import ProfileSection from '../Components/ProfileSection';
import { BarChart } from '@mui/x-charts/BarChart';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './dashboard.css';

const xLabels = [
  'Minimum Temp',
  'Temperature',
  'Maximum Temp'
];

const profile = {
  name: 'Ashik',
  email: 'ashik@gmail.com',
  profilePicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRvnCAL58JHR2UOR_kIDLd0YICJKqBVMtIjeTfJ6nUk7iZhrVuVGaB90bsmsJ04gRvLAk&usqp=CAU',
};

function Dashboard() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather?q=KOCHI&appid=765ff776dcf8ae3003357c179b5af735&units=metric');
        setWeatherData(response.data.main);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();
  }, []);

  const data = [
    { id: 0, value: weatherData?.temp_min || 0, label: 'Minimum Temp' },
    { id: 1, value: weatherData?.temp || 0, label: 'Temperature' },
    { id: 2, value: weatherData?.temp_max || 0, label: 'Maximum Temp' },
  ];

  return (
    <Container fluid>
      <Row>
        {/* Sidebar */}
        <Col md={3} className="sidebar" style={{height:"100%"}}>
          <div className="logo">
            <img src="https://i.pinimg.com/736x/14/ee/5c/14ee5c829bfbaa0b963d1ac799bb9964.jpg" alt="Company Logo" />
          </div>
          <div>
            <ProfileSection {...profile} />
          </div>
          <ul className="nav-links">
            <li><Link to="/analytics" style={{ textDecoration: "none", color: "black" }}><i className="fas fa-chart-line"></i> Analytics</Link></li>
            <li><Link to="/performance" style={{ textDecoration: "none", color: "black" }}><i className="fas fa-tachometer-alt"></i> Performance</Link></li>
            <li><Link to="/settings" style={{ textDecoration: "none", color: "black" }}><i className="fas fa-cog"></i> Settings</Link></li>
          </ul>
          <div className="logout-button" style={{marginTop:"120px"}}>
            <Link to="/" style={{ textDecoration: "none", color: "black"}}><button><i className="fas fa-sign-out-alt"></i> Logout</button></Link>
          </div>
        </Col>

        {/* Main Content */}
        <Col md={9} className="main-content">
          <Header />
          <Row>
            {/* DateCalendar */}
            <Col md={6}>
              <div className="chart-wrapper mt-4">
                <div className="chart-container">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar />
                  </LocalizationProvider>
                </div>
              </div>
            </Col>

            {/* PieChart */}
            <Col md={6}>
              <div className="chart-wrapper mt-4">
                <div className="chart-container pie-chart" style={{ backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "10px" }}>
                  <PieChart
                    series={[
                      {
                        data,
                        highlightScope: { faded: 'global', highlighted: 'item' },
                        faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                      },
                    ]}
                    width={500}
                    height={200}
                  />
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            {/* Gauge */}
            <Col md={6}>
              <div className="chart-wrapper mt-4">
                <div className="chart-container">
                  {weatherData && (
                    <>
                      <h3>Current Temperature</h3>
                      <Gauge width={200} height={200} value={weatherData.temp} />
                    </>
                  )}
                </div>
              </div>
            </Col>

            {/* BarChart */}
            <Col md={6}>
              <div className="chart-wrapper mt-4">
                <div className="chart-container">
                  {weatherData && (
                    <BarChart
                      width={500}
                      height={300}
                      series={[
                        { data: [weatherData.temp_min, weatherData.temp, weatherData.temp_max], label: 'Temperature', id: 'tempId' },
                      ]}
                      xAxis={[{ data: xLabels, scaleType: 'band' }]}
                    />
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
