const userMock = {
  id: "baabguui",
  email: "vlakd9797@naver.com",
  name: "baabguui",
  description: "hahahahaha",
};

const userMock2 = {
  id: "people",
  email: "people@naver.com",
  name: "people",
  description: "hi",
};

let userlist = [userMock, userMock2];

async function get(endpoint, params = "") {
  console.log(`%cGET 요청 ${"/" + endpoint + "/" + params}`, "color: #a25cd1;");

  if (endpoint === "users") {
    const matchingUser = userlist.find((user) => user.id === params);
    return { data: matchingUser };
  }

  if (endpoint === "userlist") {
    const data = userlist;
    return { data };
  }

  return;
}

async function post(endpoint, data) {
  console.log(
    `%cPOST 요청 ${"/" + endpoint + "/"}, 데이터: ${JSON.stringify(data)}`,
    "color:blue"
  );

  if (endpoint === "user/register") {
    const newUser = { ...data };
    newUser.description = " no description ";
    const random = Math.random();
    newUser.id = `abcde-${random}`;

    userlist.push(newUser);
    return { data: newUser };
  }

  if (endpoint === "user/login") {
    const matchingUser = userlist.find((user) => user.email === data.email);
    matchingUser.token = "temp-token";
    console.dir(matchingUser);
    return { data: matchingUser };
  }

  return;
}

async function put(endpoint, data) {
  console.log(
    `%cPUT 요청 ${"/" + endpoint + "/"}, 데이터: ${JSON.stringify(data)}`,
    "color:green;"
  );

  const urlAndId = endpoint.split("/");
  const userId = urlAndId[1];
  data.id = userId;
  userlist = userlist.filter((user) => user.id !== userId);
  userlist.push(data);

  const response = { data };
  return response;
}

// 아래처럼 export한 후, import * as A 방식으로 가져오면,
// A.get, A.post 로 쓸 수 있음.
export { get, post, put };
