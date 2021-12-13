import React, { useState } from "react";
import { Divider, Card, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Form() {
  const url = "'http://localhost:5000/'";
  const history = useNavigate();
  const [success, setSuccess] = useState(null);

  const usePost = (e) => {
    e.preventDefault();
    const data = {
      name: e.target.elements.name.value,
      age: parseInt(e.target.elements.age.value),
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
      mobile: parseInt(e.target.elements.mobile.value),
      dob: e.target.elements.dob.value,
    };

    axios
      .post(url, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.data.responseStatus === 500) {
          setSuccess(false);
          throw new Error(res.status);
        }
        setSuccess(true);
        // console.log({success:true,dataSent:res});
        history("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Card
        hoverable
        style={{ height: "80vh", margin: "50px", backgroundColor: "lavender" }}
      >
        <Divider orientation="left">Enter Your Details</Divider>
        <form onSubmit={usePost}>
          <Row justify="center" className="input-boxes">
            <Col span={4}>
              <label className="input-label">Full Name</label>
            </Col>
            <Col span={6}>
              <input
                className="input-data-box"
                type="text"
                name="name"
                placeholder="Enter your name"
              />
            </Col>
          </Row>
          <Row justify="center" className="input-boxes">
            <Col span={4}>
              <label className="input-label">Age</label>
            </Col>
            <Col span={6}>
              <input className="input-data-box" type="number" name="age" />
            </Col>
          </Row>
          <Row justify="center" className="input-boxes">
            <Col span={4}>
              <label className="input-label">E-mail</label>
            </Col>
            <Col span={6}>
              <input className="input-data-box" type="email" name="email" />
            </Col>
          </Row>
          <Row justify="center" className="input-boxes">
            <Col span={4}>
              <label className="input-label">Password</label>
            </Col>
            <Col span={6}>
              <input
                className="input-data-box"
                type="password"
                name="password"
              />
            </Col>
          </Row>
          <Row justify="center" className="input-boxes">
            <Col span={4}>
              <label className="input-label">Phone Number</label>
            </Col>
            <Col span={6}>
              <input className="input-data-box" type="number" name="mobile" />
            </Col>
          </Row>
          <Row justify="center" className="input-boxes">
            <Col span={4}>
              <label className="input-label">Date Of Birth</label>
            </Col>
            <Col span={6}>
              <input className="input-data-box" type="string" name="dob" />
            </Col>
          </Row>
          <Row justify="center" className="input-boxes">
            <Col span={2}>
              <button type="submit" className="input-button">
                Submit
              </button>
            </Col>
          </Row>
        </form>
        {success === true && (
          <Row justify="center">
            <Col span={2}>
              <p className="success">Success</p>
            </Col>
          </Row>
        )}
        {success === false && (
          <Row justify="center">
            <Col span={6}>
              <p className="failed">Failed to send data</p>
            </Col>
          </Row>
        )}
      </Card>
    </>
  );
}

export default Form;
