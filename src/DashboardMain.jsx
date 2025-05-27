import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
} from 'chart.js';
import { FaRupeeSign, FaShoppingCart, FaBox, FaWallet, FaChartLine } from 'react-icons/fa';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip);

const DashboardMain = () => {
  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Revenue',
        data: [1000, 1200, 1300, 1150, 1400, 1500, 1600, 1700, 1550, 1650, 1750, 1800],
        borderColor: 'blue',
        fill: false,
      },
      {
        label: 'Sales',
        data: [900, 1100, 1150, 1050, 1250, 1350, 1450, 1550, 1400, 1500, 1600, 1700],
        borderColor: 'orange',
        fill: false,
      },
    ],
  };

  return (
    <div className="p-4 flex-grow-1">
      <div className="d-flex justify-content-between mt-4 mb-4">
        <input type="date" className="form-control w-auto" />
        <Button variant="primary">+ Add Product</Button>
      </div>

      <Row className="mb-4">
        <Col md={3}>
          <Card className='mb-2'>
            <Card.Body>
              <Card.Title>
                <FaRupeeSign className="me-2 text-primary" />
                Total Revenue
              </Card.Title>
              <Card.Text>₹75,500 <span className="text-success">+10%</span></Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className='mb-2'>
            <Card.Body>
              <Card.Title>
                <FaShoppingCart className="me-2 text-success" />
                Total Sales
              </Card.Title>
              <Card.Text>31,500 <span className="text-success">+15%</span></Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className='mb-2'>
            <Card.Body>
              <Card.Title>
                <FaBox className="me-2 text-warning" />
                Product SKU
              </Card.Title>
              <Card.Text>247 <span className="text-muted">0%</span></Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className='mb-2'>
            <Card.Body>
              <Card.Title>
                <FaWallet className="me-2 text-danger" />
                Balance
              </Card.Title>
              <Card.Text>₹24,500 <span className="text-danger">-25%</span></Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={6}>
          <Card className='mb-2'>
            <Card.Body>
              <Card.Title>
                <FaChartLine className="me-2 text-info" />
                Sales Progress
              </Card.Title>
              <Card.Text>75.55% <span className="text-success">+10%</span></Card.Text>
              <p>You succeeded to earn ₹240 today, it’s higher than yesterday.</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Statistics</Card.Title>
              <Line data={lineData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardMain;
