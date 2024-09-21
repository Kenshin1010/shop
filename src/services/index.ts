import httpRequest from '../utils/httpRequest';

export const fetchChartData = async (
  days: string,
  merchant: string,
  metric: string
) => {
  const response = await fetch(
    `/get_chart_data?days=${days}&merchant=${merchant}&metric=${metric}`
  );
  const data = await response.json();
  return data;
};
