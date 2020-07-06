interface Candidate {
  name: string;
  party: string;
}

export default class Election {
  primaryParty?: string;
  office?: string;
  type?: string;
  numberVotingFor?: string;
  candidates?: [Candidate];

  constructor(
    primaryParty?: string,
    office?: string,
    type?: string,
    numberVotingFor?: string,
    candidates?: [Candidate]
  ) {
    this.primaryParty = primaryParty;
    this.office = office;
    this.type = type;
    this.numberVotingFor = numberVotingFor;
    this.candidates = candidates;
  }

  getCandidates = (candidates: [Candidate]) => {
    let li;
    const ul = document.createElement('ul');

    candidates.forEach((cand, idx) => {
      li = document.createElement('li');
      li.className = 'candidate';
      li.innerText = `${idx + 1}. ${cand.name} (${cand.party})`;

      ul.appendChild(li);
    });

    return ul;
  };

  getError = () => {
    const list = document.createElement('li');

    list.innerHTML = `<p>Sorry, we cannot find information for the address you entered. Try re-entering the address where you are registered to vote.</p>
        <br />
        <p>If it is correct, check back again when it is a little closer to the next election date.</p>`;

    return list;
  };

  render = () => {
    const list = document.createElement('li');
    const candidates = this.getCandidates(this.candidates);

    list.className = 'contest';
    list.innerHTML = `<div class="flex-col space-btwn">
    <div class="info">
    <h3 class="party">${this.primaryParty}</h3>
    <h4>TYPE</h4>
    <p>${this.type}</p>
    <h4>OFFICE</h4>
    <p>${this.office}</p>
    <h4>NUMBER TO VOTE FOR</h4>
    <p>${this.numberVotingFor}</p>
    <h4>CANDIDATES</h4>
    <ul>${candidates.innerHTML}</ul>
    </div>
    </div>`;

    return list;
  };
}
