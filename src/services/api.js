import axios from 'axios'

const api = axios.create({
    baseURL:"https://gvfitness.vercel.app/"
})

export default api