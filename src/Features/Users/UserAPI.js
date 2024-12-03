export async function AddStudent(userdata) {
  try {
    console.log("Add Student API Called");
    console.log(userdata);

    const response = await fetch(`http://localhost:8000/auth/singup`, {
      method: "POST",
      body: JSON.stringify(userdata),
      headers: { "content-type": "application/json" },
    });

    // Check if the response is OK
    if (!response.ok) {
      throw new Error(`Failed to add student: ${response.statusText}`);
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("Error in AddStudent API:", error);
    throw new Error("Failed to add student");
  }
}

export async function GetAllStudents(userdata) {
  try {
    const response = await fetch(`http://localhost:8000/students/All`, {
      method: "POST",
      body: JSON.stringify(userdata),
      headers: { "content-type": "application/json" },
    });

    // Check if the response is OK
    if (!response.ok) {
      throw new Error(`Failed to fetch students: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);
    return { data };
  } catch (error) {
    console.error("Error in GetAllStudents API:", error);
    throw new Error("Failed to fetch students");
  }
}
