import React, { useState, useContext } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import { modeContext } from "../../App";

import UserImageForm from "./UserImageForm";

function UserEditForm({ user, setIsEditing, setUser }) {
  const mode = useContext(modeContext);

  //useState로 name 상태를 생성함.
  const [name, setName] = useState(user.name);
  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState(user.email);
  //useState로 description 상태를 생성함.
  const [description, setDescription] = useState(user.description);

  const [imagePath, setImagePath] = useState(user.imagePath);

  //user 프로필 이미지가 저장되는 경로
  const handleSubmit = async (e) => {
    e.preventDefault();
    let res;
    if (imagePath === "") {
      res = await Api.put(`users/${user.id}`, {
        name,
        email,
        description,
        imagePath: "default.png",
      });
    } else {
      res = await Api.put(`users/${user.id}`, {
        name,
        email,
        description,
        imagePath,
      });
    }

    // 유저 정보는 response의 data임.
    const updatedUser = res.data;
    // 해당 유저 정보로 user을 세팅함.
    setUser({ ...updatedUser });

    // isEditing을 false로 세팅함.
    setIsEditing(false);
  };

  return (
    <Card
      className="mb-2"
      bg={mode.toLowerCase()}
      text={mode.toLowerCase() === "light" ? "dark" : "white"}
    >
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="useEditName" className="mb-3">
            <Form.Control
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          {/* <Form.Group controlId="userEditEmail" className="mb-3">
            <Form.Control
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group> */}

          <Form.Group controlId="userEditDescription">
            <Form.Control
              type="text"
              placeholder="정보, 인사말"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <UserImageForm
            user={user}
            imagePath={imagePath}
            setImagePath={setImagePath}
            setUser={(v) => {
              setUser(v);
            }}
          />

          <Form.Group as={Row} className="mt-3 text-center">
            <Col sm={{ span: 20 }}>
              <Button variant="primary" type="submit" className="me-3">
                확인
              </Button>
              <Button variant="secondary" onClick={() => setIsEditing(false)}>
                취소
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default UserEditForm;
