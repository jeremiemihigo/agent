export const lien = "http://localhost:5000/bboxx/support";
export const lien_image = "http://localhost:5000/bboxx/image";
// export const lien = "https://bboxxbackend-app.onrender.com/bboxx/support";
// export const lien_image = "https://bboxxbackend-app.onrender.com/bboxx/image";
export const dateFrancais = (donner) => {
    let dates = new Date(donner);
    return `${dates.getDate()}/${dates.getMonth() + 1}/${dates.getFullYear()}`;
  };
  export const config = {
    headers: {
      "Content-Type": "Application/json",
      Authorization: "Bearer " + localStorage.getItem("auth"),
    },
  };