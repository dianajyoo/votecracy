export default class Candidate {
  name?: string;

  constructor(name?: string) {
    this.name = name;
  }

  getError = () => {
    const list = document.createElement('li');
    list.innerHTML = `<p>Sorry, we cannot find list of candidates at this time. Try again when it is a little closer to the next election date.</p>`;

    return list;
  };

  render = () => {
    const list = document.createElement('li');
    const btn = document.createElement('button');

    list.className = 'result';
    btn.type = 'button';
    btn.className = 'choice';
    btn.innerText = `${this.name}`;

    list.appendChild(btn);

    return list;
  };
}
