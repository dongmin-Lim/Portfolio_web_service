import { Project } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { User } from "../db";

class projectService {
  static async addProject({ title, description, from_date, to_date }) {

    const newProject = { id, title, description, from_date, to_date };

    // db에 저장
    const createdNewProject = await Project.create({ newProject });
    createdNewProject.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewProject;
  }
  
  static async getProjects() {
    const projects = await Project.findAll({ user_id });
    return projects;
  }

  static async setProject({ user_id, toUpdate }) {
    // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
    let project = await Project.findById({ user_id });

    // 업데이트 대상에 name이 있다면, 즉 name 값이 null 이 아니라면 업데이트 진행
    if (toUpdate.title) {
      const fieldToUpdate = "title";
      const newValue = toUpdate.title;
      project = await Project.update({ user_id, fieldToUpdate, newValue });
    }

    if (toUpdate.description) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      project = await Project.update({ user_id, fieldToUpdate, newValue });
    }

    if (toUpdate.from_date) {
        const fieldToUpdate = "from_date";
        const newValue = toUpdate.from_date;
        project = await Project.update({ user_id, fieldToUpdate, newValue });
    }

    if (toUpdate.to_date) {
        const fieldToUpdate = "to_date";
        const newValue = toUpdate.to_date;
        project = await Project.update({ user_id, fieldToUpdate, newValue });
    }

    return project;
  }
}

export { projectService };
