const VITE_API_KEY = import.meta.env.VITE_API_KEY;

export async function submit(fullName: string, email: string) {
  try {
    const response = await fetch(
      `https://submitform-ebc8a7hygyfkfgc8.swedencentral-01.azurewebsites.net/api/SubmitForm?code=${VITE_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, email }),
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}
