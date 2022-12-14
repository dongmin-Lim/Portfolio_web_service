import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import EduUpdate from "./EduUpdate";
import * as Api from "../../api";

/**  학력정보 한단위로 나타냄 */
function EduList({
  edu,
  setEducations,
  educations,
  isEditable,
  portfolioOwnerId,
}) {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      {isEditing ? (
        <EduUpdate
          key={edu.id}
          setIsEditing={setIsEditing}
          setEducations={setEducations}
          educations={educations}
          portfolioOwnerId={portfolioOwnerId}
          edu={edu}
        />
      ) : (
        <EduCard
          key={edu.id}
          edu={edu}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
          setEducations={setEducations}
          educations={educations}
          portfolioOwnerId={portfolioOwnerId}
          isEditing={isEditing}
        />
      )}
    </>
  );
}
/** 유저 학력정보 리스트 출력*/
function EduCard({
  setIsEditing,
  isEditable,
  edu,
  setEducations,
  educations,
  isEditing,
  portfolioOwnerId,
}) {
  const deleteHandler = async (school, id) => {
    const ans = window.confirm(`[${school}] 학력을 지우시겠습니까?`);
    if (ans) {
      const res = await Api.delete(`educations/${edu.id}`);
      if (res.status === 204) {
        const tempEducations = [...educations].filter((v) => v.id !== id);
        setEducations(tempEducations);
      }
    } else {
      setIsEditing(false);
    }
  };
  useEffect(() => {
    Api.get(`users/${portfolioOwnerId}/educations`).then((res) =>
      setEducations(res.data)
    );
  }, [portfolioOwnerId]);
  return (
    <>
      <Row>
        <Col sm={8}>
          <h5>{edu.school}</h5>
          <p>
            {edu.major}, {edu.position}
          </p>
        </Col>
        <Col md="auto"></Col>
        <Col className="mb-3 text-end">
          {isEditable && (
            <div>
              <Button
                onClick={() => setIsEditing(!isEditing)}
                className="ms-2 mb-3"
                variant="outline-warning"
              >
                수정
              </Button>
              <Button
                className="ms-2 mb-3"
                variant="outline-danger"
                onClick={() => {
                  deleteHandler(edu.school, edu.id);
                  //setIsEditing(!isEditing);
                }}
              >
                삭제
              </Button>
            </div>
          )}
        </Col>
      </Row>
    </>
  );
}

export default EduList;
