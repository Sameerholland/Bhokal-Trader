import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { useDispatch } from "react-redux";
import { GetAllStudentASync } from "../Features/Users/UserSlice";
import { GetAllCourseAsync } from "../Features/Course/CourseSlice";

const DashboardOverview = () => {
  const [dashboardData, setDashboardData] = useState({
    totalCourses: 0,
    totalVideos: 0,
    totalUsers: 0,
  });
  const [loading, setLoading] = useState(true);

  const data = [
    { name: "Courses", value: dashboardData.totalCourses },
    { name: "Videos", value: dashboardData.totalVideos },
    { name: "Users", value: dashboardData.totalUsers },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch dashboard data from the API
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/dashboard`, {method:'GET'});
        const data = await response.json();
        console.log(data)

        setDashboardData({
          totalCourses: data.course.length,
          totalVideos: data.video.length,
          totalUsers: data.user.length,
        });
        setLoading(false); // Once data is loaded, stop loading
      } catch (error) {
        console.error("Error fetching dashboard data", error);
        setLoading(false);
      }
    };

    fetchDashboardData(); // Call the function
   
  }, []);

  useEffect(() => {
    dispatch(GetAllStudentASync({}));
    dispatch(GetAllCourseAsync()); // Assuming you want to load all students
  }, [dispatch]);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", padding: "20px" }}>
        <Typography variant="h6">Loading Dashboard...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: "20px", marginLeft: { sm: "250px" } }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Dashboard Overview
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              background: "linear-gradient(to right, #f12711, #f5af19)",
              color: "#fff",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              "&:hover": { transform: "scale(1.05)", transition: "0.3s ease" },
            }}
          >
            <CardContent>
              <Typography variant="h5">Total Courses</Typography>
              <Typography variant="h2" sx={{ mt: 2 }}>
                {dashboardData.totalCourses}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              background: "linear-gradient(to right, #36d1dc, #5b86e5)",
              color: "#fff",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              "&:hover": { transform: "scale(1.05)", transition: "0.3s ease" },
            }}
          >
            <CardContent>
              <Typography variant="h5">Total Videos</Typography>
              <Typography variant="h2" sx={{ mt: 2 }}>
                {dashboardData.totalVideos}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              background: "linear-gradient(to right, #00b09b, #96c93d)",
              color: "#fff",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              "&:hover": { transform: "scale(1.05)", transition: "0.3s ease" },
            }}
          >
            <CardContent>
              <Typography variant="h5">Total Users</Typography>
              <Typography variant="h2" sx={{ mt: 2 }}>
                {dashboardData.totalUsers}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Platform Distribution
        </Typography>
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </Box>
    </Box>
  );
};

export default DashboardOverview;
