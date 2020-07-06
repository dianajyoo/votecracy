export default class Complete {
  name?: string;

  constructor(name?: string) {
    this.name = name;
  }

  render = () => {
    const div = document.createElement('div');

    div.className = 'complete-wrapper';
    div.innerHTML = `<div id="circle">
    <div id="success-check" class="checkmark draw"></div>
    </div>`;
    div.innerHTML += `<p class="name">You voted for ${this.name}.</p>`;

    return div;
  };
}
