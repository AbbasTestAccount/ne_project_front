const baseUrl = "http://localhost:3000";

export function loginRequest(username, password, role) {
  return fetch(baseUrl + `/${role}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })
    .then((result) => result.json())
    .then((result) => {
      console.log(result);
      if (result.token) {
        localStorage.setItem("token", result.token);
      }
      return result;
    });
}

export function createMember(
  username,
  password,
  fullName,
  email,
  monthlyCost,
  isActive
) {
  const bearerToken = localStorage.getItem("token");

  const member = {
    username: username,
    member_password: password,
    full_name: fullName,
    email: email,
    monthly_cost: monthlyCost,
    fitness_goal: "",
    is_active: isActive,
  };
  return fetch(baseUrl + `/admin/member`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(member),
  })
    .then((result) => result.json())
    .then((result) => {
      console.log(result);
      return result;
    });
}

export function createTrainer(
  username,
  password,
  fullName,
  email
) {
  const bearerToken = localStorage.getItem("token");

  const trainer = {
    username: username,
    trainer_password: password,
    full_name: fullName,
    email: email
  };
  return fetch(baseUrl + `/admin/trainer`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(trainer),
  })
    .then((result) => result.json())
    .then((result) => {
      console.log(result);
      return result;
    });
}

export function updateMember(
  memberId,
  username,
  password,
  fullName,
  email,
  fitnessGoal,
  monthlyCost,
  isActive
) {
  const bearerToken = localStorage.getItem("token");

  const member = {
    member_id: memberId,
    username: username,
    member_password: password,
    full_name: fullName,
    email: email,
    monthly_cost: monthlyCost,
    fitness_goal: fitnessGoal,
    is_active: isActive,
  };
  return fetch(baseUrl + `/admin/member`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(member),
  })
    .then((result) => result.json())
    .then((result) => {
      console.log(result);
      return result;
    });
}


export function updateTrainer(
  trainerId,
  username,
  password,
  fullName,
  email
) {
  const bearerToken = localStorage.getItem("token");

  const trainer = {
    trainer_id: trainerId,
    username: username,
    trainer_password: password,
    full_name: fullName,
    email: email
  };

  console.log("aslhGHJDG : "+ trainer);
  return fetch(baseUrl + `/admin/trainer`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(trainer),
  })
    .then((result) => result.json())
    .then((result) => {
      console.log(result);
      return result;
    });
}


export function deleteMember(
  memberId,
  username,
  password,
  fullName,
  email,
  monthlyCost,
  isActive
) {
  const bearerToken = localStorage.getItem("token");

  const member = {
    member_id: memberId,
    username: username,
    member_password: password,
    full_name: fullName,
    email: email,
    monthly_cost: monthlyCost,
    fitness_goal: "",
    is_active: isActive,
  };
  return fetch(baseUrl + `/admin/member`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(member),
  })
    .then((result) => result.json())
    .then((result) => {
      console.log(result);
      return result;
    });
}


export function deleteTrainer(
  trainerId,
  username,
  password,
  fullName,
  email
) {
  const bearerToken = localStorage.getItem("token");

  const trainer = {
    trainer_id: trainerId,
    username: username,
    trainer_password: password,
    full_name: fullName,
    email: email
  };

  return fetch(baseUrl + `/admin/trainer`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(trainer),
  })
    .then((result) => result.json())
    .then((result) => {
      console.log(result);
      return result;
    });
}