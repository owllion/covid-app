import instance from './axios'

export const getSummary = () => instance.get('/summary')

export const getCountryStatus = data => instance.get(`/country/${data.country}/status/${data.status}?from=${data.from}T00:00:00Z&to=${data.to}T00:00:00Z`)