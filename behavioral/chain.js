// --------------------- Class version ---------------------------
class ClassAccount {
  pay(amount) {
    const paymentPossible = this.isPaymentPossible(amount);
    const handlerExists = this.handler;

    if (paymentPossible) {
      console.log(`Class: Paid ${amount} using ${this.name}`);
    } else if (handlerExists) {
      console.log(`Class: Insufficient funds in ${this.name} account.`);
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
    this.name = 'Visa';
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


// --------------------- Object version --------------------------
const accountObj = {
  pay(amount) {
    const paymentPossible = this.isPaymentPossible(amount);
    const handlerExists = this.handler;

    if (paymentPossible) {
      console.log(`Object: Paid ${amount} using ${this.name}`);
    } else if (handlerExists) {
      console.log(`Object: Insufficient funds in ${this.name} account.`);
      this.handler.pay(amount);
    } else {
      console.log('Object: Insufficient funds in all accounts.');
    }
  },
  isPaymentPossible(amount) {
    return this.balance >= amount;
  },
  next(handler) {
    this.handler = handler;
  },
};

function initialize(name, balance) {
  this.name = name;
  this.balance = balance;
}

const visaObj = Object.create(accountObj);
visaObj.init = function init(balance) {
  return initialize.apply(this, ['Visa', balance]);
};

const paypalObj = Object.create(accountObj);
paypalObj.init = function init(balance) {
  return initialize.apply(this, ['Paypal', balance]);
};

const qiwiObj = Object.create(accountObj);
qiwiObj.init = function init(balance) {
  return initialize.apply(this, ['Qiwi', balance]);
};

visaObj.init(100);
paypalObj.init(200);
qiwiObj.init(500);

visaObj.next(paypalObj);
paypalObj.next(qiwiObj);

visaObj.pay(400);

// ---------------------------------------------------------------
