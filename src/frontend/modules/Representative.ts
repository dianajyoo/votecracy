export default class Representative {
  name?: string;
  title?: string;
  party?: string;
  photo?: string;
  twitter?: string;
  phone?: string;

  constructor(
    name?: string,
    title?: string,
    party?: string,
    photo?: string,
    twitter?: string,
    phone?: string
  ) {
    this.name = name;
    this.title = title;
    this.party = party;
    this.photo = photo;
    this.twitter = twitter;
    this.phone = phone;
  }

  getPhoto = () => {
    if (!this.photo) {
      return 'public/images/placeholder.svg';
    }

    return this.photo;
  };

  getTwitterURL = () => {
    return `https://twitter.com/${this.twitter}`;
  };

  getError = () => {
    const list = document.createElement('li');

    list.innerHTML = `<p>Sorry, we cannot find information for the address you entered. 
    Please try again later.</p>`;

    return list;
  };

  render = () => {
    const list = document.createElement('li');
    const src = this.getTwitterURL();

    list.className = 'official';
    list.innerHTML = `<div class="flex-row space-btwn">
    <div class="photo" style='background: url(${this.getPhoto()}) no-repeat center; background-size: cover'></div> 
    <div class="info">
    <h4 class="name">${this.name.toUpperCase()}</h4>
    <p>${this.title}</p>
    <p>${this.party}</p>
    <div class="contact">
    <p class="flex-row align-cen">
    <i class="fab fa-twitter"></i>
    <a href=${src}>@${this.twitter}</a>
    </p>
    <p>
    <i class="fas fa-phone"></i>
    ${this.phone}
    </p>
    </div>
    </div>
    </div>`;

    return list;
  };
}
