const Shipping = {
  company: '',
  VAT: 0.1,
  setStrategy(company) {
    this.company = company;
  },

  calculate(goods) {
    return this.company.calculate(goods, this.VAT);
  },
};

const UPS = {
  calculate(goods, tax) {
    const pricePerKG = 45.95;
    const gross = goods.weight * pricePerKG;
    const total = gross + gross * tax;
    return `$${Math.round(total)}`;
  },
};

const DHL = {
  calculate(goods, tax) {
    const pricePerKG = 39.40;
    const gross = goods.weight * pricePerKG;
    const total = gross + gross * tax;
    return `$${Math.round(total)}`;
  },
};

const Fedex = {
  calculate(goods, tax) {
    const pricePerKG = 43.20;
    const gross = goods.weight * pricePerKG;
    const total = gross + gross * tax;
    return `$${Math.round(total)}`;
  },
};

const goods = {
  from: 'Alabama',
  to: 'Georgia',
  weight: 1.56,
};

const shipping = Object.create(Shipping);

shipping.setStrategy(UPS);
console.log('Shipping with UPS: ', shipping.calculate(goods));

shipping.setStrategy(DHL);
console.log('Shipping with DHL: ', shipping.calculate(goods));

shipping.setStrategy(Fedex);
console.log('Shipping with Fedex: ', shipping.calculate(goods));
