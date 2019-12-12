// ----------------------- Subject / Publisher ------------------------
const News = {
  observers: [],
  subscribe(subscriber) {
    this.observers.push(subscriber);
  },
  unsubscribe(subscriber) {
    const index = this.observers.indexOf(subscriber);
    this.observers.splice(index, index);
  },
  notify(data) {
    this.observers.forEach((subscriber) => subscriber.receive(data));
  },
};
// -------------------------------------------------------------------

// --------------------- Observer / Subscriber -----------------------
const NewsOutlet = {
  init(name) {
    this.name = name;
    this.news = '';
  },
  receive(data) {
    this.news = data;
    this.reportNews();
  },
  reportNews() {
    console.log(`${this.name}: ${this.news}`);
  },
};
// -------------------------------------------------------------------

const news = Object.create(News);
const NYTimes = Object.create(NewsOutlet);
const Guardian = Object.create(NewsOutlet);

NYTimes.init('New York Times');
Guardian.init('Guardian');

news.subscribe(NYTimes);
news.subscribe(Guardian);

news.notify('Aussies are on fire!');
