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
