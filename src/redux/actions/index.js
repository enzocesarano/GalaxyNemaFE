
export const LOGIN = "LOGIN"
export const SET_REGISTRAZIONE_ERRORS = "SET_REGISTRAZIONE_ERRORS"
export const FILMS = "FILMS"

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
          throw errorData;
        });
      }

      return response.json();
    })
    .catch((error) => {
      console.error("Errore durante la registrazione:", error.message);
      throw error;
    });
};


  export const login = (data) => {
    return fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(errorData.message);
          });
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.token) {
          localStorage.setItem("token", data.token);
        } else {
          alert("Token non trovato nella risposta.");
          throw new Error("Token non trovato nella risposta.");
        }
      })
      .catch((error) => {
        console.error("Errore durante il login:", error.message);
        throw error;
      });
  };
  
  export const meLogin = () => {
    return (dispatch) => {
      fetch("http://localhost:3001/me", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}` ,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Errore nel recupero dei dati dell'utente");
          }
        })
        .then((data) => {
          console.log("Dati ricevuti dall'API:", data); 
          dispatch({
            type: LOGIN,
            payload: data,
          });
        })
        .catch((err) => {
          console.log("Errore nel recupero dei dati dell'utente:", err);
        });
    };
  };
  

  export const filmsArray = () => {
    return (dispatch) => {
      fetch("http://localhost:3001/films", {
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Errore nel recupero dei dati");
          }
        })
        .then((data) => {
          console.log("Dati ricevuti dall'API:", data); 
          dispatch({
            type: FILMS,
            payload: data,
          });
        })
        .catch((err) => {
          console.log("Errore nel recupero dei dati:", err);
        });
    };
  };