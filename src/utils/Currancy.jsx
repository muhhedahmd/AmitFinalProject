
  // Function to format currency
  export const formatCurrency = (amount) => {
    // Assuming amount is in USD, you can adjust accordingly
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    const formattedValue = formatter.format(Math.floor(amount));
    // Removing currency symbol
    return formattedValue.replace(/^(\D+)/, '');

  };


