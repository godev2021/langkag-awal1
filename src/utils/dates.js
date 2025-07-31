export const formatIndoDateRange = (start, end) => {
    const options = { day: 'numeric', month: 'long' };
    const startDate = new Date(start);
    const endDate = new Date(end);
    const sameYear = startDate.getFullYear() === endDate.getFullYear();
    const locale = 'id-ID';
  
    const startStr = startDate.toLocaleDateString(locale, {
      ...options,
      year: sameYear ? undefined : 'numeric',
    });
  
    const endStr = endDate.toLocaleDateString(locale, {
      ...options,
      year: 'numeric',
    });
  
    return `${startStr} - ${endStr}`;
  }