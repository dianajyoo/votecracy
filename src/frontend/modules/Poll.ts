interface Destination {
  address: Address;
  pollingHours: string;
}

interface Address {
  locationName: string;
  line1: string;
  city: string;
  state: string;
  zip: string;
}

export default class Poll {
  origin?: string;
  destination?: Destination;

  constructor(origin?: string, destination?: Destination) {
    this.origin = origin;
    this.destination = destination;
  }

  getError = () => {
    const list = document.createElement('li');

    list.innerHTML = `<p>Sorry, we cannot find information for the address you entered. Try re-entering the address where you are registered to vote.</p>
        <br />
        <p>If it is correct, check back again when it is a little closer to the next election date.</p>`;

    return list;
  };

  render = () => {
    const list = document.createElement('li');
    list.className = 'result';

    const address = this.destination.address;
    const pollingHours = this.destination.pollingHours;
    const origin = encodeURIComponent(this.origin);
    const dest = encodeURIComponent(
      address.line1 +
        ' ' +
        address.city +
        ', ' +
        address.state +
        ' ' +
        address.zip
    );
    const mapURL = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${dest}`;

    list.innerHTML = `<div class="poll-info">
    <h4>${address.locationName}</h4>
    <p>${address.line1}</p>
    <p>${address.city}, ${address.state} ${address.zip}</p>
    <h4>POLLING LOCATION HOURS</h4>
    <p>${pollingHours}</p>
    </div>`;

    list.innerHTML += `<a class="get-directions" rel="noopener" target="_blank" href=${mapURL}>
    <button type="button">Get Directions</button></a>`;

    return list;
  };
}
