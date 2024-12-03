export function Login(userdata) {
  return new Promise(async (resolve) => {
   console.log('Log in API called')
    const response = await fetch(`http://localhost:8000/auth/login`, {
      method: "POST",
      body: JSON.stringify(userdata),
      headers: { "content-type": "application/json" },
    });

    const data = await response.json();
    resolve({ data });
  });
}
