


export const register = (data) => {
    return fetch("http://localhost:3001/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            alert(errorData.message)
          });
        }
        alert("Registrazione avvenuta con successo!")
        return response.json();
      })
      .catch((error) => {
        console.error("Errore durante la registrazione:", error.message);
        throw error;
      });
  };