const login = async (email, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/users/signin",
      data: {
        email,
        password
      }
    });

    if (res.data.status === "sucess") {
      console.log("working");

      alert("success", "Logged in successfully!");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (err) {
    console.log(err);
  }
};

const form = document.querySelector(".form").addEventListener("submit", e => {
  e.preventDefault();

  email = document.querySelector("#email").value;
  password = document.querySelector("#password").value;
  login(email, password);
});
