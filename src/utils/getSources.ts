import axios from 'axios'

const { API } = process.env

export const getSources = async () => {
  const res = await axios({
    method: 'GET',
    url: `${API}/news-sources`,
    params: {
      lang: 'ru'
    }
  })

  return res.data.data
}