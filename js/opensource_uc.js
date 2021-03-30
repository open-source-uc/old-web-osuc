const DAY = 8.64e+7

updateDescription = () => {
  console.log("here")
  document.getElementById("auto-description").innerHTML = localStorage.getItem("orgAutodescription");
}

$(() => {
  const time = parseInt(localStorage.getItem("lastGithubFetch"));
  const description = localStorage.getItem("orgAutodescription");
  const actualTime = new Date().getTime();
  if (!description | !time | time+DAY < actualTime ) {
    fetch('https://api.github.com/orgs/open-source-uc')
      .then(response => response.json())
      .then((data) => {
        localStorage.setItem("orgAutodescription", data['description']);
        localStorage.setItem("lastGithubFetch", new Date().getTime());
        updateDescription();
        console.log("fetch new description");
      })
  } else {
    updateDescription();
    console.log("Using local description");
  }
})