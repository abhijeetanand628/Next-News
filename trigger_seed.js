const url = "http://localhost:3000/api/seed";

console.log("Triggering seed at:", url);

fetch(url)
  .then(res => {
      console.log("Status:", res.status);
      return res.text();
  })
  .then(text => console.log("Response:", text))
  .catch(err => console.error("Error:", err));
