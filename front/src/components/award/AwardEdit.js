import { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

function AwardEdit({ setIsEdit, list, setList, value }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function submit() {
    console.log(list[value]);
  }

  function cancel() {
    setIsEdit(false);
  }
  return (
    <Form>
      <Form.Group>
        <Form.Label>제목</Form.Label>
        <Form.Control
          type="text"
          placeholder="수상 제목을 입력하세요."
          value={value.title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mt-2">
        <Form.Label>내용</Form.Label>
        <Form.Control
          type="text"
          placeholder="수상 내용을 입력하세요."
          value={value.content}
          onChange={(e) => setContent(e.target.value)}
        />
      </Form.Group>

      <Form.Group as={Col} className="text-center m-3">
        <Row>
          <Col>
            <Button variant="primary" onClick={submit}>
              확인
            </Button>{" "}
            <Button variant="secondary" onClick={cancel}>
              취소
            </Button>
          </Col>
        </Row>
      </Form.Group>
    </Form>
  );
}

export default AwardEdit;
