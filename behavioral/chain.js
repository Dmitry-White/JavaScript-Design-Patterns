// --------------------- Class version ---------------------------
class ClassAccount {
  pay(amount) {
    const paymentPossible = this.isPaymentPossible(amount);
    const handlerExists = this.handler;

    if (paymentPossible) {
      console.log(`Class: Paid ${amount} using ${this.name}`);
    } else if (handlerExists) {
      console.log(`Class: Insufficient funds in ${this.name} account.`)
      this.handler.pay(amount);
    } else {
      console.log('Class: Insufficient funds in all accounts.');
    }

  }
  isPaymentPossible(amount) {
    return this.balance >= amount;
  }
  next(handler) {
    this.handler = handler;
  }
}

class ClassVisa extends ClassAccount {
  constructor(balance) {
    super();
    this.name = 'Visa'
    this.balance = balance;
  }
}

class ClassPaypal extends ClassAccount {
  constructor(balance) {
    super();
    this.name = 'Paypal';
    this.balance = balance;
  }
}

class ClassQiwi extends ClassAccount {
  constructor(balance) {
    super();
    this.name = 'Qiwi';
    this.balance = balance;
  }
}

const classVisa = new ClassVisa(100);
const classPaypal = new ClassPaypal(200);
const classQiwi = new ClassQiwi(500);

classVisa.next(classPaypal);
classPaypal.next(classQiwi);

classVisa.pay(200);
// ---------------------------------------------------------------