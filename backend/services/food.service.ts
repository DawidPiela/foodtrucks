import csv from 'csv-parser'
import path from 'path'
import fs from 'fs'

export const getAllFood = async (searchTerm: string) => {
  const results: any[] = []
  const csvFilePath = path.join(__dirname, '../data/Mobile_Food_Facility_Permit.csv')

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))

  // simulate a delay
  const data = await new Promise(resolve => setTimeout(() => resolve(results.filter(item => item.Applicant.toLowerCase().includes(searchTerm.toLowerCase()))), 500))
  return data
}