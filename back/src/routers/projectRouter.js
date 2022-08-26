import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { projectService } from "../services/projectService";

const projectRouter = Router();

projectRouter.post("/project/create", login_required, async function (req, res, next) {
  try {
    // if (is.emptyObject(req.body)) {
    //   throw new Error(
    //     "headers의 Content-Type을 application/json으로 설정해주세요"
    //   );
    // }

    // req (request) 에서 데이터 가져오기
    const title = 'req.body.name';
    const description = 'req.body.description';
    const from_date = "2022-08-22";
    const to_date = "2022-08-23";

    // 위 데이터를 유저 db에 추가하기
    const newProject = await projectService.addProject({
      title,
      description,
      from_date,
      to_date,
    });

    if (newProject.errorMessage) {
      throw new Error(newProject.errorMessage);
    }

    res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
});

projectRouter.get(
  "/projectlist/:id",

  async function (req, res, next) {
    try {
      // 전체 프로젝트 목록을 얻음
      const user_id = req.params.id
      const projects = await projectService.getProjects({ user_id });
      res.status(200).send(projects);
    } catch (error) {
      next(error);
    }
  }
);

// projectRouter.get(
//   "/project/current",
//   login_required,
//   async function (req, res, next) {
//     try {
//       // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
//       const user_id = req.currentProjectId;
//       const currentProjectInfo = await projectService.getProjectInfo({
//         user_id,
//       });

//       if (currentProjectInfo.errorMessage) {
//         throw new Error(currentProjectInfo.errorMessage);
//       }

//       res.status(200).send(currentProjectInfo);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

projectRouter.put(
  "/projects/:id",
//   login_required,
  async function (req, res, next) {
    try {
      // URI로부터 사용자 id를 추출함.
      const user_id = req.params.id;
      // body data 로부터 업데이트할 사용자 정보를 추출함.
      const title = req.body.title ?? null;
      const description = req.body.description ?? null;
      const from_date = req.body.from_date ?? null;
      const to_date = req.body.to_date ?? null;

      const toUpdate = { title, description, from_date, to_date };

      // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      const updatedProject = await projectService.setProject({ user_id, toUpdate });

      if (updatedProject.errorMessage) {
        throw new Error(updatedProject.errorMessage);
      }

      res.status(200).json(updatedProject);
    } catch (error) {
      next(error);
    }
  }
);

// projectRouter.get(
//   "/projects/:id",
//   login_required,
//   async function (req, res, next) {
//     try {
//       const user_id = req.params.id;
//       const currentProjectInfo = await projectService.getProjectInfo({ user_id });

//       if (currentProjectInfo.errorMessage) {
//         throw new Error(currentProjectInfo.errorMessage);
//       }

//       res.status(200).send(currentProjectInfo);
//     } catch (error) {
//       next(error);
//     }
//   }
// );



export { projectRouter };
