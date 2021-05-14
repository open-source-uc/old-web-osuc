


let dataUrl = './assets/data/members-manifest.json';
const teamID = '#team-list'

$(() => {
  fetch(dataUrl)
    .then(response => response.json())
    .then(membersJson => {
      membersJson.sort((member1, member2) => {
        if(member1['display-name'] < member2['display-name']) { return -1; }
        if(member1['display-name'] > member2['display-name']) { return  1; }
        return 0;
      });
      membersJson.forEach(member => {
        let altText = member['alt-text'];
        let displayName = member['display-name'];
        let githubUser = member['github-user'];
        let figureTemplate = `<figure class="projects-picture profile-inline">
	<a href="https://github.com/${githubUser}" target="_blank"><img class="github-profile center-profile" src="https://github.com/${githubUser}.png" alt="${altText}"></a>
	<figcaption>${displayName}</figcaption>
</figure>`;
        $(teamID).append(figureTemplate);
      });
    });
  })