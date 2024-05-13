import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import ProfileSection from '../Components/ProfileSection';
import { LineChart } from '@mui/x-charts/LineChart';
import './Analytics.css'; // Import CSS file for styling

const Analytics = () => {
    const [userList, setUserList] = useState([]);
    const [countryCounts, setCountryCounts] = useState({});
    const [userAges, setUserAges] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const users = [];
                const counts = {};
                const countData = [];
                const ageData = [];

                for (let i = 0; i < 10; i++) {
                    const response = await fetch('https://randomuser.me/api/');
                    const data = await response.json();
                    const { email, login, phone, location, picture, dob } = data.results[0];
                    const { password } = login;
                    const country = location.country;
                    const profilePicture = picture.large; // or picture.medium, picture.thumbnail based on your preference
                    const age = calculateAge(new Date(dob.date)); // Calculate age based on date of birth

                    users.push({ email, password, phone, location, profilePicture, age });

                    // Count users from each country
                    counts[country] = (counts[country] || 0) + 1;
                    countData.push((counts[country] || 0) + 1); // Add user count to data array
                    ageData.push(age); // Add age to data array
                }

                setUserList(users);
                setCountryCounts(counts);
                setUserAges(ageData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const calculateAge = (dob) => {
        const diff = Date.now() - dob.getTime();
        const ageDate = new Date(diff);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    };

    const profile = {
        name: 'Ashik',
        email: 'ashik@gmail.com',
        profilePicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRvnCAL58JHR2UOR_kIDLd0YICJKqBVMtIjeTfJ6nUk7iZhrVuVGaB90bsmsJ04gRvLAk&usqp=CAU',
    };

    return (
        <>
            <Header />
            <div className="analytics-container">
                <div style={{ marginBottom: "30px", padding:"50px" }}>
                    <ProfileSection {...profile} />
                </div>
                <div className="analytics-table-container p-3">
                    <h3 style={{ textAlign: "center", marginBottom: "20px" }}>Analytics</h3>
                    <table className="analytics-table">
                        <thead>
                            <tr>
                                <th>Index</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th>Phone</th>
                                <th>Location</th>
                                <th>Profile Picture</th>
                                <th>Age</th> {/* New column for age */}
                            </tr>
                        </thead>
                        <tbody>
                            {userList.map((user, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td> {/* Display index */}
                                    <td>{user.email}</td>
                                    <td>{user.password}</td>
                                    <td>{user.phone}</td>
                                    <td>{`${user.location.city}, ${user.location.country}`}</td>
                                    <td><img src={user.profilePicture} alt="Profile" style={{ width: "50px", height: "50px" }} /></td>
                                    <td>{user.age}</td> {/* Display age */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div style={{ marginTop: "80px", marginLeft: "180px", height: "200px" }}>
                <h3 style={{ marginLeft: "50px" }}>Age analytics chart</h3>
                <LineChart
                    xAxis={[{ data: [...Array(10).keys()] }]} // Use index as x-axis data
                    series={[
                       
                        {
                            data: userAges, // Use age data for the line chart
                        },
                    ]}
                    width={500}
                    height={300}
                />
            </div>

            <div className="analytics-table-container">
                <table className="analytics-table" style={{width:"400px", marginLeft:"420px", marginTop:"-200px", marginBottom:"50px"}}>
                    <thead>
                        <tr>
                            <th>Country</th>
                            <th>User Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(countryCounts).map((country, index) => (
                            <tr key={index}>
                                <td>{country}</td>
                                <td>{countryCounts[country]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Analytics;







