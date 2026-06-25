// Configuration and mathematical logic for the 7 financial calculators

export interface CalculatorInput {
  key: string;
  label: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  type: "currency" | "years" | "percentage" | "amount";
}

export interface CalculatorResult {
  label: string;
  value: number;
  color: string; // Tailwind color class or hex
  isBold?: boolean;
}

export interface CalculatorConfig {
  id: string;
  name: string;
  tabName: string;
  title: string;
  description: string;
  gridDescription: string;
  iconName: string; // Name of Lucide icon to render
  inputs: CalculatorInput[];
  calculate: (inputs: Record<string, number>) => {
    results: CalculatorResult[];
    primaryResult: {
      label: string;
      value: number;
      isCurrency?: boolean;
    };
    chartData: {
      name: string;
      value: number;
      color: string;
    }[];
  };
}

// Indian Number System Formatter
export function formatIndianCurrency(amount: number): string {
  // Round to nearest integer
  const rounded = Math.round(amount);
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  })
    .format(rounded)
    .replace("INR", "₹")
    .trim();
}

export const CALCULATORS: Record<string, CalculatorConfig> = {
  sip: {
    id: "sip",
    name: "SIP Calculator",
    tabName: "SIP Calculator",
    title: "SIP Calculator",
    description: "Estimate your financial goals and plan your investments accurately.",
    gridDescription: "Estimate the future value of your monthly SIP investment.",
    iconName: "TrendingUp",
    inputs: [
      {
        key: "monthlyInvestment",
        label: "Monthly Investment (SIP)",
        min: 500,
        max: 100000,
        step: 500,
        defaultValue: 5000,
        type: "currency",
      },
      {
        key: "duration",
        label: "Investment Duration",
        min: 1,
        max: 40,
        step: 1,
        defaultValue: 15,
        type: "years",
      },
      {
        key: "returnRate",
        label: "Expected Return Rate (p.a)",
        min: 1,
        max: 30,
        step: 0.5,
        defaultValue: 12,
        type: "percentage",
      },
    ],
    calculate: (inputs) => {
      const p = inputs.monthlyInvestment || 5000;
      const t = inputs.duration || 15;
      const r = inputs.returnRate || 12;

      const monthlyRate = r / 12 / 100;
      const months = t * 12;

      // Formula: M = P * [((1 + i)^n - 1) / i] * (1 + i)
      const totalValue =
        p * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
      const investedAmount = p * months;
      const estReturns = Math.max(0, totalValue - investedAmount);

      return {
        results: [
          { label: "Invested Amount", value: investedAmount, color: "#e9c349" },
          { label: "Est. Returns", value: estReturns, color: "#000613" },
        ],
        primaryResult: {
          label: "Total Value",
          value: totalValue,
          isCurrency: true,
        },
        chartData: [
          { name: "Invested Amount", value: investedAmount, color: "#e9c349" },
          { name: "Est. Returns", value: estReturns, color: "#000613" },
        ],
      };
    },
  },

  lumpsum: {
    id: "lumpsum",
    name: "Lumpsum Calculator",
    tabName: "Lumpsum Calculator",
    title: "Lumpsum Calculator",
    description: "Estimate the future value of your one-time investments over time.",
    gridDescription: "Estimate the future value of your one-time investment.",
    iconName: "Briefcase",
    inputs: [
      {
        key: "totalInvestment",
        label: "Total Investment",
        min: 1000,
        max: 10000000,
        step: 1000,
        defaultValue: 25000,
        type: "currency",
      },
      {
        key: "duration",
        label: "Investment Duration",
        min: 1,
        max: 40,
        step: 1,
        defaultValue: 15,
        type: "years",
      },
      {
        key: "returnRate",
        label: "Expected Return Rate (p.a)",
        min: 1,
        max: 30,
        step: 0.5,
        defaultValue: 12,
        type: "percentage",
      },
    ],
    calculate: (inputs) => {
      const p = inputs.totalInvestment || 25000;
      const t = inputs.duration || 15;
      const r = inputs.returnRate || 12;

      const rate = r / 100;
      // Formula: A = P * (1 + r)^t
      const totalValue = p * Math.pow(1 + rate, t);
      const investedAmount = p;
      const estReturns = Math.max(0, totalValue - investedAmount);

      return {
        results: [
          { label: "Invested Amount", value: investedAmount, color: "#e9c349" },
          { label: "Est. Returns", value: estReturns, color: "#000613" },
        ],
        primaryResult: {
          label: "Total Value",
          value: totalValue,
          isCurrency: true,
        },
        chartData: [
          { name: "Invested Amount", value: investedAmount, color: "#e9c349" },
          { name: "Est. Returns", value: estReturns, color: "#000613" },
        ],
      };
    },
  },

  "investment-goal": {
    id: "investment-goal",
    name: "Investment Goal Calculator",
    tabName: "Investment Calculator",
    title: "Investment Goal Calculator",
    description: "Determine how much you need to save monthly to reach your target wealth goal.",
    gridDescription: "Find out the monthly SIP investment needed to reach your wealth goal.",
    iconName: "Target",
    inputs: [
      {
        key: "targetWealth",
        label: "Target Wealth / Goal",
        min: 10000,
        max: 100000000,
        step: 10000,
        defaultValue: 1000000,
        type: "currency",
      },
      {
        key: "duration",
        label: "Investment Duration",
        min: 1,
        max: 40,
        step: 1,
        defaultValue: 10,
        type: "years",
      },
      {
        key: "returnRate",
        label: "Expected Return Rate (p.a)",
        min: 1,
        max: 30,
        step: 0.5,
        defaultValue: 12,
        type: "percentage",
      },
    ],
    calculate: (inputs) => {
      const fv = inputs.targetWealth || 1000000;
      const t = inputs.duration || 10;
      const r = inputs.returnRate || 12;

      const monthlyRate = r / 12 / 100;
      const months = t * 12;

      // Formula: Monthly SIP = FV * i / [((1 + i)^n - 1) * (1 + i)]
      const denominator = ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
      const monthlySIP = fv / denominator;

      const investedAmount = monthlySIP * months;
      const estReturns = Math.max(0, fv - investedAmount);

      return {
        results: [
          { label: "Invested Amount", value: investedAmount, color: "#e9c349" },
          { label: "Est. Returns", value: estReturns, color: "#000613" },
        ],
        primaryResult: {
          label: "Required Monthly SIP",
          value: monthlySIP,
          isCurrency: true,
        },
        chartData: [
          { name: "Invested Amount", value: investedAmount, color: "#e9c349" },
          { name: "Est. Returns", value: estReturns, color: "#000613" },
        ],
      };
    },
  },

  emi: {
    id: "emi",
    name: "EMI Calculator",
    tabName: "EMI Calculator",
    title: "EMI Calculator",
    description: "Calculate your monthly home, car, or personal loan installment.",
    gridDescription: "Calculate your equated monthly installment and total interest payable.",
    iconName: "Calculator",
    inputs: [
      {
        key: "loanAmount",
        label: "Loan Amount",
        min: 10000,
        max: 100000000,
        step: 10000,
        defaultValue: 1000000,
        type: "currency",
      },
      {
        key: "interestRate",
        label: "Interest Rate (p.a)",
        min: 1,
        max: 20,
        step: 0.1,
        defaultValue: 8.5,
        type: "percentage",
      },
      {
        key: "duration",
        label: "Loan Tenure",
        min: 1,
        max: 30,
        step: 1,
        defaultValue: 20,
        type: "years",
      },
    ],
    calculate: (inputs) => {
      const p = inputs.loanAmount || 1000000;
      const r = inputs.interestRate || 8.5;
      const t = inputs.duration || 20;

      const monthlyRate = r / 12 / 100;
      const months = t * 12;

      // Formula: EMI = P * r * (1 + r)^n / ((1 + r)^n - 1)
      const pow = Math.pow(1 + monthlyRate, months);
      const emi = p * monthlyRate * (pow / (pow - 1));

      const totalPayment = emi * months;
      const totalInterest = Math.max(0, totalPayment - p);

      return {
        results: [
          { label: "Principal Amount", value: p, color: "#e9c349" },
          { label: "Interest Payable", value: totalInterest, color: "#000613" },
        ],
        primaryResult: {
          label: "Monthly EMI",
          value: emi,
          isCurrency: true,
        },
        chartData: [
          { name: "Principal Amount", value: p, color: "#e9c349" },
          { name: "Interest Payable", value: totalInterest, color: "#000613" },
        ],
      };
    },
  },

  "mf-returns": {
    id: "mf-returns",
    name: "MF Returns Calculator",
    tabName: "MF Returns Calc",
    title: "MF Returns Calculator",
    description: "Estimate returns on your combined SIP and lumpsum mutual fund investments.",
    gridDescription: "Estimate combined returns of your lumpsum and SIP investments.",
    iconName: "TrendingUp",
    inputs: [
      {
        key: "monthlyInvestment",
        label: "Monthly Investment (SIP)",
        min: 0,
        max: 100000,
        step: 500,
        defaultValue: 5000,
        type: "currency",
      },
      {
        key: "totalInvestment",
        label: "One-time Investment (Lumpsum)",
        min: 0,
        max: 5000000,
        step: 1000,
        defaultValue: 10000,
        type: "currency",
      },
      {
        key: "duration",
        label: "Investment Duration",
        min: 1,
        max: 40,
        step: 1,
        defaultValue: 10,
        type: "years",
      },
      {
        key: "returnRate",
        label: "Expected Return Rate (p.a)",
        min: 1,
        max: 30,
        step: 0.5,
        defaultValue: 12,
        type: "percentage",
      },
    ],
    calculate: (inputs) => {
      const pSip = inputs.monthlyInvestment !== undefined ? inputs.monthlyInvestment : 5000;
      const pLump = inputs.totalInvestment !== undefined ? inputs.totalInvestment : 10000;
      const t = inputs.duration || 10;
      const r = inputs.returnRate || 12;

      const monthlyRate = r / 12 / 100;
      const months = t * 12;

      // SIP Maturity
      const sipValue = pSip > 0 
        ? pSip * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate)
        : 0;

      // Lumpsum Maturity
      const lumpsumValue = pLump > 0
        ? pLump * Math.pow(1 + (r / 100), t)
        : 0;

      const totalValue = sipValue + lumpsumValue;
      const investedAmount = (pSip * months) + pLump;
      const estReturns = Math.max(0, totalValue - investedAmount);

      return {
        results: [
          { label: "Invested Amount", value: investedAmount, color: "#e9c349" },
          { label: "Est. Returns", value: estReturns, color: "#000613" },
        ],
        primaryResult: {
          label: "Total Value",
          value: totalValue,
          isCurrency: true,
        },
        chartData: [
          { name: "Invested Amount", value: investedAmount, color: "#e9c349" },
          { name: "Est. Returns", value: estReturns, color: "#000613" },
        ],
      };
    },
  },

  fd: {
    id: "fd",
    name: "FD Calculator",
    tabName: "FD Calculator",
    title: "FD Calculator",
    description: "Calculate the maturity value and interest earned on your fixed deposit.",
    gridDescription: "Calculate the maturity value of your fixed deposit.",
    iconName: "Landmark",
    inputs: [
      {
        key: "totalDeposit",
        label: "Total Deposit",
        min: 1000,
        max: 10000000,
        step: 1000,
        defaultValue: 100000,
        type: "currency",
      },
      {
        key: "interestRate",
        label: "Rate of Interest (p.a)",
        min: 1,
        max: 15,
        step: 0.1,
        defaultValue: 6.5,
        type: "percentage",
      },
      {
        key: "duration",
        label: "Time Period",
        min: 1,
        max: 25,
        step: 1,
        defaultValue: 5,
        type: "years",
      },
    ],
    calculate: (inputs) => {
      const p = inputs.totalDeposit || 100000;
      const r = inputs.interestRate || 6.5;
      const t = inputs.duration || 5;

      const rate = r / 100;
      const compoundingFrequency = 4; // Quarterly

      // Formula: A = P * (1 + r/4)^(4*t)
      const totalValue = p * Math.pow(1 + rate / compoundingFrequency, compoundingFrequency * t);
      const investedAmount = p;
      const estInterest = Math.max(0, totalValue - investedAmount);

      return {
        results: [
          { label: "Invested Amount", value: investedAmount, color: "#e9c349" },
          { label: "Est. Interest", value: estInterest, color: "#000613" },
        ],
        primaryResult: {
          label: "Total Value",
          value: totalValue,
          isCurrency: true,
        },
        chartData: [
          { name: "Invested Amount", value: investedAmount, color: "#e9c349" },
          { name: "Est. Interest", value: estInterest, color: "#000613" },
        ],
      };
    },
  },

  rd: {
    id: "rd",
    name: "RD Calculator",
    tabName: "RD Calculator",
    title: "RD Calculator",
    description: "Calculate the maturity value and interest earned on your recurring deposit.",
    gridDescription: "Calculate the maturity value of your recurring deposit.",
    iconName: "Clock",
    inputs: [
      {
        key: "monthlyDeposit",
        label: "Monthly Deposit",
        min: 500,
        max: 100000,
        step: 500,
        defaultValue: 5000,
        type: "currency",
      },
      {
        key: "interestRate",
        label: "Rate of Interest (p.a)",
        min: 1,
        max: 15,
        step: 0.1,
        defaultValue: 6.5,
        type: "percentage",
      },
      {
        key: "duration",
        label: "Time Period",
        min: 1,
        max: 10,
        step: 1,
        defaultValue: 5,
        type: "years",
      },
    ],
    calculate: (inputs) => {
      const p = inputs.monthlyDeposit || 5000;
      const r = inputs.interestRate || 6.5;
      const t = inputs.duration || 5;

      const rate = r / 100;
      const months = t * 12;

      // Quarterly compounding for RD:
      // M = Sum for k=1 to n of P * (1 + r/4)^(4 * (n - k + 1) / 12)
      let totalValue = 0;
      for (let k = 1; k <= months; k++) {
        const timeRemainingYears = (months - k + 1) / 12;
        totalValue += p * Math.pow(1 + rate / 4, 4 * timeRemainingYears);
      }

      const investedAmount = p * months;
      const estInterest = Math.max(0, totalValue - investedAmount);

      return {
        results: [
          { label: "Invested Amount", value: investedAmount, color: "#e9c349" },
          { label: "Est. Interest", value: estInterest, color: "#000613" },
        ],
        primaryResult: {
          label: "Total Value",
          value: totalValue,
          isCurrency: true,
        },
        chartData: [
          { name: "Invested Amount", value: investedAmount, color: "#e9c349" },
          { name: "Est. Interest", value: estInterest, color: "#000613" },
        ],
      };
    },
  },
};
