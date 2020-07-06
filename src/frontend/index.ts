import 'dotenv/config';
import Representative from './modules/Representative';
import Poll from './modules/Poll';
import Election from './modules/Election';
import Candidate from './modules/Candidate';
import Complete from './modules/Complete';
import * as Adapter from './modules/Adapter';

const input = <HTMLInputElement>document.getElementById('address');
const section = input ? input.parentElement.parentElement : null;
const officials = <HTMLUListElement>document.getElementById('officials');
const polls = <HTMLUListElement>document.getElementById('poll-locations');
const elections = <HTMLUListElement>(
  document.getElementById('upcoming-elections')
);
const candidates = <HTMLUListElement>document.getElementById('candidates');
const emptyState = <HTMLSpanElement>document.getElementById('empty-state');
const partySelect = <HTMLHtmlElement>document.getElementById('party-select');
const search = <HTMLHtmlElement>document.getElementById('for-vote');
const header = <HTMLHeadingElement>document.getElementById('cast-vote');
const subheader = <HTMLHeadingElement>document.getElementById('i-vote-for');
const completeVote = <HTMLHtmlElement>document.getElementById('complete-vote');

let party: string | undefined;

const setCookie = (address: string) => {
  const MS_IN_HOUR = 3600 * 1000;
  const now = new Date();
  let time = now.getTime();
  time += MS_IN_HOUR;
  now.setTime(time);

  document.cookie = 'address=' + address + '; expires=' + now.toUTCString();
};

const getCookie = (key: string) => {
  const name = key + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};

const showError = (
  list: HTMLUListElement,
  child: Representative | Poll | Election | Candidate
) => {
  list.innerHTML = '';
  list.appendChild(child.getError());
};

const getOfficials = async (address: string) => {
  let official: Representative;
  let office = 'N/A';

  officials.innerHTML = '';

  try {
    const resp = await Adapter.getOfficials(address);

    if (resp.data && resp.data.result) {
      let twitter: { type: string; id: string };
      const allOfficials = resp.data.result.officials;
      const offices = resp.data.result.offices;

      allOfficials.forEach((off: any, idx: number) => {
        if (off.channels && off.channels.length > 0) {
          twitter = off.channels.filter(
            (channel: { type: string; id: string }) =>
              channel.type.toLowerCase() === 'twitter'
          )[0] || { type: '', id: 'N/A' };
        } else {
          twitter = { type: '', id: 'N/A' };
        }

        if (offices[idx]) office = offices[idx].name;

        official = new Representative(
          off.name,
          office,
          off.party,
          off.photoUrl,
          twitter.id,
          off.phones[0]
        );

        officials.appendChild(official.render());
      });
    }
  } catch (err) {
    console.log('Cannot get officials search results', err);
    official = new Representative();
    showError(officials, official);
  }
};

const getPollLocations = async (address: string) => {
  let poll;

  emptyState.innerText = '';
  polls.innerHTML = '';

  try {
    const resp = await Adapter.getVoterInfo(address);

    if (resp.data && resp.data.result) {
      const pollingLocations = resp.data.result.pollingLocations;

      pollingLocations.forEach((loc: any) => {
        poll = new Poll(address, {
          address: loc.address,
          pollingHours: loc.pollingHours,
        });

        polls.appendChild(poll.render());
      });
    }
  } catch (err) {
    console.log('Cannot get poll search results', err);
    poll = new Poll();
    showError(polls, poll);
  }
};

const getElections = async (address: string) => {
  let election;

  elections.innerHTML = '';

  try {
    const resp = await Adapter.getVoterInfo(address);

    if (resp.data && resp.data.result) {
      const contests = resp.data.result.contests;

      contests.forEach((contest: any) => {
        election = new Election(
          contest.primaryParty,
          contest.office,
          contest.type,
          contest.numberVotingFor,
          contest.candidates
        );

        elections.appendChild(election.render());
      });
    }
  } catch (err) {
    console.log('Cannot get election search results', err);
    election = new Election();
    showError(elections, election);
  }
};

const createCandidateList = (
  candidate: Candidate | undefined,
  allCandidates: []
) => {
  allCandidates.forEach((cand: { name: string; party: string }) => {
    candidate = new Candidate(cand.name);
    candidates.appendChild(candidate.render());
  });
};

const getCandidatesByAddress = async (address: string) => {
  let candidate;

  try {
    const resp = await Adapter.getVoterInfo(address);

    if (resp.data && resp.data.result) {
      let allCandidates: [] = [];
      const contests = resp.data.result.contests;

      subheader.style.display = 'block';

      contests.forEach((contest: any) => {
        if (
          party &&
          party.toLowerCase() === contest.primaryParty.toLowerCase()
        ) {
          allCandidates = contest.candidates;
        }
      });

      candidates.innerHTML = '';

      createCandidateList(candidate, allCandidates);
    }
  } catch (err) {
    console.log('Cannot get candidate search results', err);
    candidate = new Candidate();
    showError(candidates, candidate);
  }
};

const getCandidates = async (e: Event, address: string) => {
  let candidate;

  party = (<HTMLButtonElement>e.target).id;
  partySelect.style.display = 'none';
  search.style.display = 'block';
  header.style.display = 'block';
  subheader.style.display = 'block';

  try {
    const resp = await Adapter.getVoterInfo(address);

    if (resp.data && resp.data.result) {
      let allCandidates: [] = [];
      const contests = resp.data.result.contests;

      contests.forEach((contest: any) => {
        if (
          (<HTMLButtonElement>e.target).id.toLowerCase() ===
          contest.primaryParty.toLowerCase()
        ) {
          allCandidates = contest.candidates;
        }
      });

      candidates.innerHTML = '';

      createCandidateList(candidate, allCandidates);
    }
  } catch (err) {
    console.log('Cannot get candidate search results', err);
    candidate = new Candidate();
    showError(candidates, candidate);
  }
};

const getVote = async (e: Event) => {
  const candidate = (<HTMLButtonElement>e.target).innerText;
  const complete = new Complete(candidate);

  candidates.innerHTML = '';
  header.innerHTML = '';
  subheader.innerHTML = '';
  search.innerHTML = '';

  search.style.display = 'none';
  completeVote.style.display = 'block';
  completeVote.appendChild(complete.render());

  const successCheck = <HTMLDivElement>document.getElementById('success-check');
  successCheck.style.display = 'block';
};

const handleSubmit = (e: Event) => {
  const address = input.value;
  setCookie(address);

  if (section.className.indexOf('for-officials') > -1) getOfficials(address);
  if (section.className.indexOf('for-poll') > -1) getPollLocations(address);
  if (section.className.indexOf('for-elections') > -1) getElections(address);
  if (section.id === 'for-vote') getCandidatesByAddress(address);

  e.preventDefault();
};

const handleClick = (e: Event) => {
  const address = input.value;

  if ((<HTMLButtonElement>e.target).className.indexOf('option vote') > -1)
    getCandidates(e, address);
  if ((<HTMLButtonElement>e.target).className === 'choice') getVote(e);
};

document.addEventListener('DOMContentLoaded', () => {
  if (input) input.value = getCookie('address');

  document.addEventListener('submit', (e: Event) => handleSubmit(e));
  document.addEventListener('click', (e: Event) => handleClick(e));
});
