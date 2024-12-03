export async function AddVideos(userdata) {
   try {
      console.log(userdata);

      // Make sure the FormData object is used if sending file data

      // Sending the POST request with the form data
      const response = await fetch(`http://localhost:8000/class/add-class`, {
         method: 'POST',
         body: userdata,  // sending the FormData object
      });

      // Check if response is OK
      if (!response.ok) {
         throw new Error(`Error: ${response.statusText}`);
      }

      // Parse the response data
      const data = await response.json();
      return { data };
   } catch (error) {
      // Handle and log any errors
      console.error("Error in AddVideos API:", error);
      throw new Error('Failed to add video'); // or return a custom error message
   }
}
