export function formatCurrency(amount: number): string {

    const formattedNumber =
        new Intl.NumberFormat("en-AU", {
            style: "currency",
            currency: "AUD",
            currencyDisplay: "narrowSymbol",
            minimumFractionDigits: 0,
        }).format(amount);

    const suffix = amount > 0 ? " CR" : amount < 0 ? " DR" : "";
    return `${formattedNumber}${suffix}`;


}
